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
  currentEntry: TaskDto;
  tasks: TaskDto[];
  @Input() savedTask: TaskDto;
  taskFilter: any;

  ngOnInit(): void {
    this.taskService.findAll().subscribe(data => {
      this.tasks = this.parseTasks(data);
      this.taskFilter = JSON.parse(localStorage.getItem('taskFilter'));
      this.translate.setDefaultLang('de');
    });
  }
  onSelectedEntry(selectedEntry: TaskDto) {
    this.currentEntry = selectedEntry;
  }
  createNewTask() {
    this.currentEntry = new TaskDto();
  }
  onSaveTask(task: TaskDto) {
    this.tasks.push(task);
    this.currentEntry = null;
  }
  onDeleteTask(taskToDelete: TaskDto) {
    const index = this.tasks.indexOf(taskToDelete);
    this.tasks.splice(index, 1);
    this.taskService.deleteTask(taskToDelete.id).subscribe();
  }
  onTableUpdate(value: any) {
    localStorage.setItem('taskFilter', JSON.stringify(value));
    this.taskFilter = value;
  }
  parseTasks(data: any[]) {
    const tasksToBeReturned: TaskDto[] = [];
    data.forEach(value => {
      tasksToBeReturned.push(new TaskDto(value));
    });
    return tasksToBeReturned;
  }
}
