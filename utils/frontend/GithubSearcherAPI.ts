import { SearchQueryPayload } from "../../shared/search/searchSlice";


export class GithubSearcherAPI {
    search = async (query: SearchQueryPayload) => {
      let init: RequestInit = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(query),
      };
      const response = await fetch('/api/search', init);
      if (response.status === 200) {
        return await response.json();
      } else {
        let error = "";
        try {
          const body = await response.json();
          error = body.detail;
        } catch (e) {
          error = `Oops! something went wrong (error_code: ${response.status})`;
        }
        throw new Error(error);
      }
    }
}