import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { TodoSearchService } from './todo-search.service';
import { Todo } from './todo';

@Component({
  moduleId: module.id,
  selector: 'todo-search',
  templateUrl: 'todo-search.component.html',
  styleUrls: [ 'todo-search.component.css' ],
  providers: [TodoSearchService]
})
export class TodoSearchComponent implements OnInit {
  todos: Observable<Todo[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private todoSearchService: TodoSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.todos = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.todoSearchService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Todo[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Todo[]>([]);
      });
  }

  gotoDetail(todo: Todo): void {
    let link = ['/detail', todo.key];
    this.router.navigate(link);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/