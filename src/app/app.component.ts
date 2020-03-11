import {Component, Input, OnInit} from '@angular/core';
import {TaskDto} from './classes/task-dto';
import {TaskService} from './services/task.service';
import {TranslateService} from '@ngx-translate/core';
import {ToastService} from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private taskService: TaskService, private translate: TranslateService, private toastService: ToastService) { }
  currentEntry: TaskDto;
  tasks: TaskDto[];
  @Input() savedTask: TaskDto;
  taskFilter: any;

  ngOnInit(): void {
    this.taskService.findAll().subscribe(data => {
      this.tasks = this.parseTasks(data);
      this.taskFilter = JSON.parse(localStorage.getItem('taskFilter'));
      this.translate.setDefaultLang('en');
      if (localStorage.getItem('lang')) {
        this.translate.use(localStorage.getItem('lang'));
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    });
  }
  onSelectedEntry(selectedEntry: TaskDto) {
    this.currentEntry = selectedEntry;
  }
  createNewTask() {
    this.currentEntry = new TaskDto();
  }
  onSaveTask(task: TaskDto) {
    if (this.currentEntry.id === task.id) {
      this.currentEntry = Object.assign(this.currentEntry, task);
    } else {
      this.tasks.push(task);
    }
    this.currentEntry = null;
  }
  onDeleteTask(taskDto: TaskDto) {
    this.taskService.deleteTask(taskDto.id).subscribe(data => {
      if (!data) {
        const index = this.tasks.indexOf(taskDto);
        this.tasks.splice(index, 1);
      } else {
        if (taskDto === this.currentEntry) {
          this.currentEntry = null;
        }
        taskDto = Object.assign(taskDto, data);
      }
      this.toastService.addMessage('general.messages.success', 'success');
    },
      (error => {
        this.toastService.addMessage(error.error, 'danger');
    }));
  }
  onClearSelectedEntry() {
    this.currentEntry = null;
  }
  onRestoreEntry(taskDto: TaskDto) {
    taskDto.deleted = false;
    this.taskService.saveTask(taskDto).subscribe(() => {
        this.toastService.addMessage('general.messages.success', 'success');
    },
      (error => {
        this.toastService.addMessage(error.error, 'danger');
      }));
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
