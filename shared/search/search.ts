import { SearchResult } from '../../utils/github';
import User from '../user/user';
import Repository from '../repository/repository';


export type SearchStatus = "initial" | "loading" | "loaded" | "failed";


export default interface Search {
    searchType: string;
    searchText: string;
    state: SearchStatus;
    searchResult: SearchResult<User> | SearchResult<Repository> | null;
    error: string|null;
}
