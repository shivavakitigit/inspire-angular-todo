import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Update the template URL

  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  todos: any[] = [];
  newTodoTitle: string = '';
  filter: string = 'all';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe(data => {
        const userTodos = data.filter(todo => todo.userId === 1);
        this.todos = userTodos;
      });
  }

  handleAddNewTodo() {
    const newTodo = {
      title: this.newTodoTitle,
      completed: false
    };

    this.todos = [...this.todos, newTodo];
    this.newTodoTitle = '';
  }

  handleDeleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.todos = [...this.todos];
  }

  handleCompleteTodo(index: number) {
    this.todos[index].completed = true;
    this.todos = [...this.todos];
  }

  handleFilter(selectedFilter: string) {
    this.filter = selectedFilter;
  }

  getFilteredTodos() {
    if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else {
      return this.todos;
    }
  }
}