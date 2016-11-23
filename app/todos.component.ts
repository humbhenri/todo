import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Todo }                from './todo';
import { TodoService }         from './todo.service';

@Component({
  moduleId: module.id,
  selector: 'my-todos',
  templateUrl: 'todos.component.html',
  styleUrls: [ 'todos.component.css' ]
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  selectedTodo: Todo;

  constructor(
    private todoService: TodoService,
    private router: Router) { }

  getTodos(): void {
    this.todoService
        .getTodos()
        .then(todos => this.todos = todos);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.todoService.create(name)
      .then(todo => {
        this.todos.push(todo);
        this.selectedTodo = null;
      });
  }

  delete(todo: Todo): void {
    this.todoService
        .delete(todo.id)
        .then(() => {
          this.todos = this.todos.filter(h => h !== todo);
          if (this.selectedTodo === todo) { this.selectedTodo = null; }
        });
  }

  ngOnInit(): void {
    this.getTodos();
  }

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedTodo.key]);
  }
}
