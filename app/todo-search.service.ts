import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Todo }           from './todo';

@Injectable()
export class TodoSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Todo[]> {
    return this.http
               .get(`app/todos/?name=${term}`)
               .map((r: Response) => r.json().data as Todo[]);
  }
}