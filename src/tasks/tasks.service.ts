import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { CreateTaskDto } from './DTO/create-task.dto';
import { UpdateTaskDto } from './DTO/update-task.dto';
import { PatchTaskDto } from './DTO/patch-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: 1, date: '2024-05-21', description: 'Task 1', done: false },
    { id: 2, date: '2024-05-22', description: 'Task 2', done: false },
    { id: 3, date: '2024-05-23', description: 'Task 3', done: false },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.tasks.length + 1,
      date: createTaskDto.date,
      description: createTaskDto.description,
      done: createTaskDto.done,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number, updateTaskDto: UpdateTaskDto): Task {
    console.log(`Updating task with id ${id}`);
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      console.log(`Task with id ${id} not found`);
      return null;
    }
    console.log(`Task found: `, task);
    Object.assign(task, updateTaskDto);
    console.log(`Task updated: `, task);
    return task;
  }

  patchTask(id: number, patchTaskDto: PatchTaskDto): Task {
    console.log(`Patching task with id ${id}`);
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      console.log(`Task with id ${id} not found`);
      return null;
    }
    if (patchTaskDto.date !== undefined) {
      task.date = patchTaskDto.date;
    }
    if (patchTaskDto.description !== undefined) {
      task.description = patchTaskDto.description;
    }
    if (patchTaskDto.done !== undefined) {
      task.done = patchTaskDto.done;
    }
    console.log(`Task patched: `, task);
    return task;
  }

  deleteTask(id: number): boolean {
    console.log(`Deleting task with id ${id}`);
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      console.log(`Task with id ${id} not found`);
      return false;
    }
    console.log(`Task found: `, this.tasks[index]);
    this.tasks.splice(index, 1);
    console.log(`Task with id ${id} deleted`);
    return true;
  }
}
