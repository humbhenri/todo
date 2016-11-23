import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { TodosComponent }      from './todos.component';
import { TodoDetailComponent }  from './todo-detail.component';
import { TodoService }          from './todo.service';
import { TodoSearchComponent }  from './todo-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    TodoDetailComponent,
    TodosComponent,
    TodoSearchComponent
  ],
  providers: [ TodoService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
