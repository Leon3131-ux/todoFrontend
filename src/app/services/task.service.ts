import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { TaskDto } from '../classes/task-dto';
import { Observable } from 'rxjs';
import {TaskAjaxResponse} from '../classes/task-ajax-response';

@Injectable()
export class TaskService {
  private readonly getTasksUrl: string;
  private readonly saveTasksUrl: string;
  private readonly deleteTasksUrl: string;

  constructor(private http: HttpClient) {
    this.getTasksUrl = 'http://localhost:8080/landingPage/getTasks';
    this.saveTasksUrl = 'http://localhost:8080/landingPage/saveTask';
    this.deleteTasksUrl = 'http://localhost:8080/landingPage/deleteTask';
  }
  public findAll(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.getTasksUrl);
  }
  public saveTask(taskDto: TaskDto): Observable<TaskAjaxResponse> {
    return this.http.post<TaskAjaxResponse>(this.saveTasksUrl, taskDto);
  }
  public deleteTask(taskId: number): Observable<any> {
    const taskIdString = taskId.toString();
    const params = new HttpParams().append('taskId', taskIdString);
    return this.http.delete<boolean>(this.deleteTasksUrl, {params});
  }

}
