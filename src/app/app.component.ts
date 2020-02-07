import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TaskDto} from './classes/task-dto';
import {TaskService} from './services/task.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private taskService: TaskService, private translate: TranslateService) { }
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
    this.translate.setDefaultLang(navigator.language);
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
    localStorage.setItem('taskFilter', JSON.stringify(value));
    this.taskFilter = value;
  }
}
