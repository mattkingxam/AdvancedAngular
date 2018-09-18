import { Injectable } from '@angular/core';
import { GitCodeSearch } from './git-code-search';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GitCodeSearchService {

  constructor(private http: HttpClient) { }
  codeSearch: Function = (query: string): Observable<GitCodeSearch> => {
    return this.http.get<GitCodeSearch>('https://api.github.com/search/code?q=' + query)
  }

}
