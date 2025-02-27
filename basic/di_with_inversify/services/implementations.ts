import { injectable } from "inversify";
import { GreetingService, TodoService } from "./interfaces";

@injectable()
export class GreetingServiceImpl implements GreetingService {
  greet(name: string): string {
    return `Hello, ${name}!`;
  }
}

@injectable()
export class TodoServiceImpl implements TodoService {
  todos: string[] = [];

  addTodo(title: string): void {
    this.todos.push(title);
  }

  getTodos(): string[] {
    return this.todos;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((_, index) => index !== id);
  }

  updateTodo(id: number, title: string): void {
    this.todos[id] = title;
  }

  getTodo(id: number): string {
    return this.todos[id];
  }
}
