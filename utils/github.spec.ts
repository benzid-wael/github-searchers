import { FakeGithubClient, GithubClientFactory } from "./github";


describe('GithubClientFactory return GithubClient instance', () => {
   it('return FakeGithubClient when env var USE_FAKE_CLIENT is enabled', () => {
       // given
       process.env.USE_FAKE_CLIENT = '1';
       // when
       const actual = GithubClientFactory.client;
       // then
       expect(actual).toBeInstanceOf(FakeGithubClient);
   })
});


test('findUsers parses properly Github search result', async () => {
    // given
    const testee = new FakeGithubClient();
    // when
    const result = await testee.findUsers("typescript");
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
    const result = await testee.findRepositories("typescript");
    // then
    expect(result.items.length).toBeTruthy();
    expect(result.items[0].name).toBeTruthy();
    expect(result.items[0].author.avatarUrl).toBeTruthy();
    expect(result.items[0].repositoryUrl).toBeTruthy();
});