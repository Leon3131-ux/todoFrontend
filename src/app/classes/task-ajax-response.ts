import {TaskDto} from './task-dto';
import {TaskError} from './task-error';

export class TaskAjaxResponse {
  failed: boolean;
  taskDto: TaskDto;
  errors: TaskError[];

}
