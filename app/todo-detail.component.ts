import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Todo }        from './todo';
import { TodoService } from './todo.service';

@Component({
  moduleId: module.id,
  selector: 'my-todo-detail',
  templateUrl: 'todo-detail.component.html',
  styleUrls: [ 'todo-detail.component.css' ]
})
export class TodoDetailComponent implements OnInit {
  todo: Todo;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.todoService.getTodo(params['key']))
      .subscribe(todo => this.todo = todo);
  }

  save(): void {
    this.todoService.update(this.todo)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}