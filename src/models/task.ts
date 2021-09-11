export enum TaskStatus {
  InProgress = 1,
  Done,
  Archived,
}

export interface Task {
  id: number;
  content: string;
  status: TaskStatus;
  createdAt: number;
  color: string;
}