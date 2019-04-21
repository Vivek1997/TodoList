import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOption = {
  headers : new HttpHeaders({
    'Content-type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string="https://jsonplaceholder.typicode.com/todos";
  todosLimit:string = "?_limit=5"
  constructor(private http:HttpClient) { }

  getTodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  toggleCompleted(todo:Todo):Observable<any>{
    const url:string=`${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOption);
  }

  deleteTodo(todo:Todo):Observable<Todo>{
    const url:string=`${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url,httpOption);
  }

  addTodo(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this.todosUrl ,todo,httpOption);
  }
}