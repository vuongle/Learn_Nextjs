export interface GreetingService {
  greet(name: string): string;
}

export interface TodoService {
  addTodo(title: string): void;
  getTodos(): string[];
  deleteTodo(id: number): void;
  updateTodo(id: number, title: string): void;
  getTodo(id: number): string;
}
