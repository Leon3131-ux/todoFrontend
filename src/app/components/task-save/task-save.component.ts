import {
  Component,
  EventEmitter, HostListener,
  Input,
  OnChanges, OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {TaskDto} from '../../classes/task-dto';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskError} from '../../classes/task-error';
import {TaskService} from '../../services/task.service';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.component.html',
  styleUrls: ['./task-save.component.scss']
})
export class TaskSaveComponent implements OnChanges, OnInit {
  constructor(private taskService: TaskService) {
  }

  @Input()currentEntry: TaskDto;
  saveTaskFormErrors: TaskError[] = [];
  @Output()savedTask = new EventEmitter();
  @Output()clearSelectedEntry = new EventEmitter();
  @Output()deleteTask = new EventEmitter();
  @ViewChild('saveTaskModal', {static: false}) saveTaskModal: ModalDirective;
  saveTaskForm = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    title: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    date: new FormControl('', [
      Validators.required
    ]),
    done: new FormControl(false)
  });
  innerWidth: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.currentEntry.isFirstChange()) {
      if (this.currentEntry && changes.currentEntry) {
        this.saveTaskForm.patchValue(this.currentEntry);
        this.showModal();
      } else if (!this.currentEntry && changes.currentEntry) {
        this.hideModal();
      }
    }
  }
  ngOnInit(): void {
    this.innerWidth = window.screen.width;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }
  clearSelection() {
    this.clearSelectedEntry.emit();
  }
  deleteEntry() {
    this.deleteTask.emit(this.currentEntry);
  }
  resetForm() {
    this.saveTaskForm.reset({
      title: '',
      description: '',
      date: '',
      done: false
    });
    this.saveTaskFormErrors = [];
    this.clearSelection();
  }
  submitTask() {
    if (this.saveTaskForm.valid) {
      this.saveTaskFormErrors = [];
      const taskDto = new TaskDto(this.saveTaskForm.getRawValue());
      taskDto.deleted = false;
      if (this.currentEntry.id == null) {
        const data = this.taskService.createTask(taskDto);
        this.handleTaskReturn(data);
      } else {
        const data = this.taskService.updateTask(taskDto);
        this.handleTaskReturn(data);
      }
    } else {
      this.saveTaskForm.markAllAsTouched();
    }
  }

  handleTaskReturn(response: Observable<TaskDto>) {
    response.subscribe(data => {
        const taskDtoToEmit = new TaskDto(data);
        this.savedTask.emit(taskDtoToEmit);
      },
      (error => {
        this.saveTaskForm.markAsPristine();
        error.error.validationErrors.forEach(validationError => {
          this.saveTaskFormErrors.push(new TaskError(validationError));
        });
      }));
  }

  resetFormToLastState() {
    this.saveTaskForm.patchValue(this.currentEntry);
  }
  showModal(): void {
    this.saveTaskModal.show();
  }

  hideModal(): void {
    this.saveTaskModal.hide();
  }
  hasError(field: string) {
    const formField = this.saveTaskForm.get(field);
    const isDirtyOrTouched = formField.touched || formField.dirty;
    if (formField.invalid && isDirtyOrTouched) {
      return true;
    }
    if (this.saveTaskFormErrors) {
      for (const taskError of this.saveTaskFormErrors) {
        if (taskError.getField() === field && formField.pristine) {
          return true;
        }
      }
    }
    return false;
  }
  getErrors(field: string) {
    const formField = this.saveTaskForm.get(field);
    const errorMessages = [];
    if (formField.errors) {
      for (const errorsKey in formField.errors) {
        if (formField.invalid) {
          errorMessages.push('errors.task.' + field + '.' + errorsKey);
        }
      }
    }
    if (this.saveTaskFormErrors) {
      for (const taskError of this.saveTaskFormErrors) {
        if (taskError.getField() === field && formField.pristine && errorMessages.indexOf(taskError.message) === -1) {
          errorMessages.push(taskError.message);
        }
      }
    }
    return errorMessages;
  }
}
