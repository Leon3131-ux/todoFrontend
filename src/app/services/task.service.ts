import { Injectable } from '@angular/core';
import { TaskDto } from '../classes/task-dto';
import { Observable } from 'rxjs';
import {ApiService} from './api-service.service';
import {TaskSaveErrorHandler} from '../errorHandlers/task-save-error-handler';

@Injectable()
export class TaskService {

  constructor(private apiService: ApiService, private taskSaveErrorHandler: TaskSaveErrorHandler) {
  }
  public findAll(): Observable<TaskDto[]> {
    return this.apiService.getAll('/getTasks');
  }
  public createTask(taskDto: TaskDto): Observable<TaskDto> {
    return this.apiService.postSingle('/saveTask', taskDto, this.taskSaveErrorHandler);
  }
  public updateTask(taskDto: TaskDto): Observable<TaskDto> {
    return this.apiService.postSingle('/saveTask', taskDto, this.taskSaveErrorHandler);
  }
  public deleteTask(taskId: number): Observable<TaskDto> {
    return this.apiService.deleteSingle('/deleteTask/' + taskId);
  }

}
