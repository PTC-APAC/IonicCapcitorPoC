import { Component, OnInit } from '@angular/core';
import { Task, TaskStatus } from 'src/models/task';
import { TodoService } from 'src/services/todo.service';
import { randomColor } from 'src/util/color';

@Component({        // Angular App
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {     // Controller
  isLoaded: boolean;
  tasks: Task[];
  newTask: string;
  isAdding: boolean;
  isProcessingTasks: number[]

  constructor(private todoService: TodoService) {
    this.isLoaded = false;
    this.isAdding = false;
  }

  async loadTasks(): Promise<any> {
    this.tasks = await this.todoService.getAllTasks();
    this.isLoaded = true;
    this.isProcessingTasks = [];

    for (const task of this.tasks) {
      console.log('TASK =', task.content, ' >> COLOR =', task.color);
    }
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  itemIsInProcessing(id: number): boolean {
    return this.isProcessingTasks.includes(id);
  }

  async checkDone(task: Task): Promise<void> {
    this.isProcessingTasks.push(task.id);
    this.tasks = await this.todoService.checkTaskDone(task.id);
    const index = this.isProcessingTasks.indexOf(task.id);
    this.isProcessingTasks.splice(index, 1);
  }

  async archive(task: Task): Promise<void> {
    this.isProcessingTasks.push(task.id);
    this.tasks = await this.todoService.archiveTask(task.id);
    const index = this.isProcessingTasks.indexOf(task.id);
    this.isProcessingTasks.splice(index, 1);
  }

  async addNew(): Promise<void> {
    const now = Date.now();
    const taskId = Math.floor(now / 1000);
    const task = {
      id: taskId,
      content: this.newTask,
      status: TaskStatus.InProgress,
      createdAt: now,
      color: randomColor()
    } as Task;

    this.isAdding = true;
    this.tasks = await this.todoService.addTask(task);
    this.isAdding = false;
    this.newTask = '';
  }
}
