import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Todo } from './todo';

@Injectable()
export class TodoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private todosUrl = 'localhost:5000/todo';  // URL to web api

  constructor(private http: Http) { }

  getTodos(): Promise<Todo[]> {
    return this.http.get(this.todosUrl)
               .toPromise()
               .then(response => response.json().data as Todo[])
               .catch(this.handleError);
  }

  getTodo(key: string): Promise<Todo> {
    return this.getTodos()
               .then(todos => todos.find(todo => todo.key === key));
  }

  delete(key: string): Promise<void> {
    const url = `${this.todosUrl}/${key}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Todo> {
    return this.http
      .post(this.todosUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(todo: Todo): Promise<Todo> {
    const url = `${this.todosUrl}/${todo.key}`;
    return this.http
      .put(url, JSON.stringify(todo), {headers: this.headers})
      .toPromise()
      .then(() => todo)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
