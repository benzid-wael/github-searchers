import fetch from 'jest-fetch-mock';

import { FakeGithubClient, GithubClient, GithubClientFactory } from './github';
import { mockUserSearchResult } from '../testing';
import { RateLimitReached } from '../errors';

describe('GithubClientFactory', () => {
    it('should return FakeGithubClient when useFakeClient is true', () => {
        // when
        const actual = GithubClientFactory.getClient(true);
        // then
        expect(actual).toBeInstanceOf(FakeGithubClient);
    });

    it('should return FakeGithubClient when useFakeClient is false', () => {
        // when
        const actual = GithubClientFactory.getClient(false);
        // then
        expect(actual).toBeInstanceOf(GithubClient);
    });
});

test('findUsers parses properly Github search result', async () => {
    // given
    const testee = new FakeGithubClient();
    // when
    const result = await testee.findUsers('typescript  ');
    // then
    expect(result.items.length).toBeTruthy();
    expect(result.items[0].name).toBeTruthy();
    expect(result.items[0].avatarUrl).toBeTruthy();
    expect(result.items[0].url).toBeTruthy();
});

test('findRepositories parses properly Github search result', async () => {
    // given
    const testee = new FakeGithubClient();
    // when
    const result = await testee.findRepositories('typescript  ');
    // then
    expect(result.items.length).toBeTruthy();
    expect(result.items[0].name).toBeTruthy();
    expect(result.items[0].author.avatarUrl).toBeTruthy();
    expect(result.items[0].repositoryUrl).toBeTruthy();
});

describe('GithubClient', () => {
    it('extractPageInfo should extract pagination detail from response', () => {
        // given
        const links = [
            '<https://api.github.com/search/users?page=2>; rel="next"',
            '<https://api.github.com/search/users?page=9>; rel="last"',
        ].join(', ');
        const expected = { next: 2, last: 9 };
        const testee = new GithubClient();
        // when
        const actual = testee.extractPageInfo(links);
        // then
        expect(actual).toEqual(expected);
    });

    it.each`
        type              | text    | page | expected
        ${'users'}        | ${'js'} | ${1} | ${'https://api.github.com/search/users?q=js&page=1&per_page=25'}
        ${'repositories'} | ${'js'} | ${1} | ${'https://api.github.com/search/repositories?q=js&page=1&per_page=25'}
    `(
        'should hit $expected when called with type: $type, text: $text and page: $page',
        async ({ type, text, page, expected }) => {
            // given
            const body = mockUserSearchResult();
            const expectedArgs = {
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
            };
            fetch.mockResponse(JSON.stringify(body), { status: 200 });
            const testee = new GithubClient();
            // when
            await testee.fetchFromGithub(type, text, page);
            // then
            expect(fetch).toBeCalledWith(expected, expectedArgs);
        },
    );

    it('fetchFromGithub throw RateLimitReached when rate limit reached', async () => {
        // given
        fetch.mockResponse('', { status: 403 });
        const testee = new GithubClient();
        // when / then
        await expect(testee.fetchFromGithub('users', 'js', 1)).rejects.toThrow(RateLimitReached);
    });
});
