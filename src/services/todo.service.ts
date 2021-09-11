import { Injectable } from "@angular/core";
import { Storage } from '@capacitor/storage';
import { Task, TaskStatus } from '../models/task';
import { sleep } from "src/util/time";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private tasks: Task[];
  
  constructor() {
    
  }

  async getAllTasks(): Promise<Task[]> {
    if (this.tasks) {
      return this.tasks;
    }
    await sleep(3000);
    const { value } = await Storage.get({ key: 'todo' });
    if (!value) {
      this.tasks = [];
      return [];
    }

    const allTasks: Task[] = JSON.parse(value);
    this.tasks = allTasks.filter(e => e.status !== TaskStatus.Archived);

    return this.tasks;
  }
  
  async getTask(id: number): Promise<Task> {
    return this.tasks.find(e => e.id === id);
  }
  
  async addTask(task: Task): Promise<Task[]> {
    await sleep(5000);

    this.tasks.push(task);
    await Storage.set({
      key: 'todo',
      value: JSON.stringify(this.tasks)
    });

    return this.tasks;
  }

  async checkTaskDone(id: number): Promise<Task[]> {
    const index = this.tasks.findIndex(e => e.id === id);
    if (index === -1) { return; }

    await sleep(4000);

    var task = this.tasks[index];
    task.status = TaskStatus.Done;
    this.tasks[index] = task;

    await Storage.set({
      key: 'todo',
      value: JSON.stringify(this.tasks)
    });

    return this.tasks;
  }

  async archiveTask(id: number): Promise<Task[]> {
    const index = this.tasks.findIndex(e => e.id === id);
    if (index === -1) { return; }

    await sleep(3500);

    this.tasks.splice(index, 1);

    await Storage.set({
      key: 'todo',
      value: JSON.stringify(this.tasks)
    });

    return this.tasks;
  }
}
