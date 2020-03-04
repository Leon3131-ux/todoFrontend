import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { TaskDto } from '../classes/task-dto';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {
  private readonly getTasksUrl: string = 'http://localhost:8080/landingPage/getTasks';
  private readonly saveTasksUrl: string = 'http://localhost:8080/landingPage/saveTask';
  private readonly deleteTasksUrl: string = 'http://localhost:8080/landingPage/deleteTask';

  constructor(private http: HttpClient) {
  }
  public findAll(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.getTasksUrl);
  }
  public saveTask(taskDto: TaskDto): Observable<TaskDto> {
    return this.http.post<TaskDto>(this.saveTasksUrl, taskDto);
  }
  public deleteTask(taskId: number): Observable<TaskDto> {
    const taskIdString = taskId.toString();
    const params = new HttpParams().append('taskId', taskIdString);
    return this.http.delete<TaskDto>(this.deleteTasksUrl, {params});
  }

}
