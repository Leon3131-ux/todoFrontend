import {Component, EventEmitter, Input, Output} from '@angular/core';
import { TaskDto } from '../classes/task-dto';
import {TaskFilters} from '../enums/task-filters.enum';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent {

  @Output()selectedEntry = new EventEmitter();
  @Input()tasks: TaskDto[];
  @Input()currentEntry: TaskDto;
  @Output()updateTable = new EventEmitter();
  @Output()deleteEntry = new EventEmitter();
  @Output()restoreEntry = new EventEmitter();
  @Input()taskFilter: any;
  TaskFilters = TaskFilters;
  isDisplayTask(taskDto: TaskDto) {
    if (taskDto.done === false && taskDto.deleted === false && this.taskFilter === TaskFilters.UNFINISHED) {
      return true;
    }
    if (taskDto.done === true && taskDto.deleted === false && this.taskFilter === TaskFilters.FINISHED) {
      return true;
    }
    if (taskDto.deleted === true && this.taskFilter === TaskFilters.DELETED) {
      return true;
    }
    if (taskDto.deleted === false && this.taskFilter === TaskFilters.ALL) {
      return true;
    }
    return false;
  }

}
