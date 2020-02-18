import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {TaskDto} from '../classes/task-dto';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';
import {TaskError} from '../classes/task-error';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.component.html',
  styleUrls: ['./task-save.component.scss']
})
export class TaskSaveComponent implements OnChanges {
  constructor(private taskService: TaskService) {
  }

  @Input()currentEntry: TaskDto;
  @Input()saveTaskFormErrors: TaskError[];
  @Output()savedTask = new EventEmitter();
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

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.currentEntry.isFirstChange()) {
      if (this.currentEntry && changes.currentEntry) {
        this.saveTaskForm.patchValue(this.currentEntry);
        this.showModal();
      } else if (!this.currentEntry && changes.currentEntry) {
        this.hideModal();
      }
    }
    if (this.saveTaskFormErrors && changes.saveTaskFormErrors) {
      this.saveTaskForm.markAsPristine();
    }
  }
  resetForm() {
    this.saveTaskForm.reset({
      title: '',
      description: '',
      date: '',
      done: false
    });
  }
  submitTask() {
    if (this.saveTaskForm.valid) {
      this.taskService.saveTask(this.saveTaskForm.getRawValue()).subscribe(data => {
        this.savedTask.emit(data);
      },
        (error => {
          this.saveTaskFormErrors = error.error;
        }));
    }
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
        if (taskError.field === field && formField.pristine) {
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
          errorMessages.push(errorsKey);
        }
      }
    }
    if (this.saveTaskFormErrors) {
      for (const taskError of this.saveTaskFormErrors) {
        if (taskError.field === field && formField.pristine) {
          errorMessages.push(taskError.message);
        }
      }
    }
    return errorMessages;
  }
}
