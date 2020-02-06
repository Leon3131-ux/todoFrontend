import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TaskDto} from './classes/task-dto';
import {TaskService} from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  constructor(private taskService: TaskService) { }
  title = 'angProject';
  currentEntry: TaskDto = null;
  currentEntryId: number = null;
  tasks: TaskDto[];
  @Input() savedTask: TaskDto;
  taskFilter: any;

  ngOnInit(): void {
    const taskFilter = JSON.parse(localStorage.getItem('taskFilter'));
    this.taskService.find(taskFilter).subscribe(data => {
      this.tasks = data;
    });
    this.taskFilter = taskFilter;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.savedTask.currentValue) {
      console.log(this.savedTask);
    }
  }
  onSelectedEntry(selectedEntry: TaskDto) {
    this.currentEntry = selectedEntry;
    this.currentEntryId = selectedEntry.id;
  }
  onSavedTask(savedTask: TaskDto) {
    if (this.currentEntry === null) {
      this.tasks.push(savedTask);
    } else {
      this.currentEntry = Object.assign(this.currentEntry, savedTask);
    }
  }
  onFormReset() {
    this.resetValues();
  }
  onDeleteTask() {
    const index = this.tasks.indexOf(this.currentEntry);
    this.tasks.splice(index, 1);
    this.resetValues();
  }
  resetValues() {
    this.currentEntry = null;
    this.currentEntryId = null;
  }
  onFetchTasks(value: any) {
    this.taskService.find(value).subscribe(data => {
      this.tasks = data;
      localStorage.setItem('taskFilter', JSON.stringify(value));
      this.taskFilter = value;
    });
  }
}
