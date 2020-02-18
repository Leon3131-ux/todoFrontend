import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TaskDto } from '../classes/task-dto';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent{

  @Output()selectedEntry = new EventEmitter();
  @Input()tasks: TaskDto[];
  @Input()currentEntry: TaskDto;
  @Output()updateTable = new EventEmitter();
  @Output()deleteEntry = new EventEmitter();
  @Input()taskFilter: any;

}
