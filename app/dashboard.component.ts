import { Component, OnInit } from '@angular/core';

import { Todo }        from './todo';
import { TodoService } from './todo.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos()
      .then(todos => this.todos = todos);
  }
}