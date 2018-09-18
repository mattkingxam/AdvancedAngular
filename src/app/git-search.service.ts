import { Injectable, Inject } from '@angular/core';
import { GitSearch } from './git-search';
import { GitUsers } from './git-users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class GitSearchService {
    cachedSearches: string;
    search: Observable<GitSearch>;
    cachedUsers: string;
    users: Observable<GitUsers>;
    constructor(private http: HttpClient) {
    }

    gitSearch: Function = (query: string): Observable<GitSearch> => {
        if (!this.search) {
            this.search = this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query)
                .publishReplay(1)
                .refCount();
            this.cachedSearches = query;
        }
        else if (this.cachedSearches !== query) {
            this.search = null;
            this.gitSearch(query);
        }
        return this.search;
    }
    gitUsers: Function = (query: string): Observable<GitUsers> => {
        if (!this.users) {
            this.users = this.http.get<GitUsers>('https://api.github.com/search/users?q=' + query)
                .publishReplay(1)
                .refCount();
            this.cachedUsers = query;
        }
        else if (this.cachedUsers !== query) {
            this.users = null;
            this.gitUsers(query);
        }

        return this.users;
    }
}