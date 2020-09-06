import { Client } from '../../utils/testing/client';
import handler from '../../pages/api/search';


describe('/api/search', () => {
    test('respond 200 to valid search request', async () => {
        // given
        const client = await Client(handler);
        const payload = { searchText: 'typescript', searchType: 'repository' };
        // when / then
        client.post('/api/search')
            .send(payload)
            .expect(200);
    })

    test('respond 412 when search text is too short', async () => {
        // given
        const client = await Client(handler);
        const payload = { searchText: 'ts', searchType: 'repository' };
        // when / then
        await client.post('/api/search')
            .send(payload)
            .expect(412);
    })

    test('respond 405 when for blacklisted HTTP methods', async () => {
        // given
        const client = await Client(handler);
        const payload = { searchText: 'ts', searchType: 'repository' };
        // when / then
        await client.get('/api/search')
            .expect(405);
    })

    test('respond 400 when for ivalid payload', async () => {
        // given
        const client = await Client(handler);
        const payload = {};
        // when / then
        await client.post('/api/search')
            .send(payload)
            .expect(400);
    })
})