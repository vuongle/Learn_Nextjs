export interface TodoRepository {
  create(title: string): void;
  update(id: number, title: string): void;
  delete(id: number): void;
  getAll(): string[];
  getById(id: number): string;
}
