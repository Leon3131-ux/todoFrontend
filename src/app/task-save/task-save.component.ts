import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {TaskDto} from '../classes/task-dto';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../services/task.service';
import {TaskAjaxResponse} from '../classes/task-ajax-response';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.component.html',
  styleUrls: ['./task-save.component.scss']
})
export class TaskSaveComponent implements OnChanges, OnInit {

  @Input() currentEntry: TaskDto;
  @Output() savedTask = new EventEmitter<TaskDto>();
  @Output() formReset = new EventEmitter();
  @Output() deletedTask = new EventEmitter();
  @ViewChild('saveTaskModal', {static: false}) childModal: ModalDirective;
  taskAjaxResponse: TaskAjaxResponse;
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

  constructor(private taskService: TaskService) {
  }
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentEntry.currentValue) {
      this.updateForm(this.currentEntry);
    }
  }

  updateForm(taskDto: TaskDto) {
    this.saveTaskForm.patchValue(taskDto);
  }

  submitTaskDto() {
    if (this.saveTaskForm.valid) {
      this.taskService.saveTask(this.saveTaskForm.getRawValue()).subscribe(data => {
        this.taskAjaxResponse = data;
        if (this.taskAjaxResponse.failed === false) {
          this.savedTask.emit(this.taskAjaxResponse.taskDto);
          this.resetForm();
          this.hideChildModal();
        } else {
          this.saveTaskForm.markAsPristine();
        }
      });
    }
  }

  showNewTask() {
    this.resetForm();
    this.showChildModal();
  }

  deleteTask() {
    this.taskService.deleteTask(this.currentEntry.id).subscribe(() => {
      this.deletedTask.emit();
    });
  }

  resetForm() {
    this.saveTaskForm.reset({
      title: '',
      description: '',
      date: '',
      done: false
    });
    this.formReset.emit();
    this.taskAjaxResponse = undefined;
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  hasError(field: string) {
    const formField = this.saveTaskForm.get(field);
    const isDirtyOrTouched = formField.touched || formField.dirty;
    if (formField.invalid && isDirtyOrTouched) {
      return true;
    }
    if (this.taskAjaxResponse) {
      for (const taskError of this.taskAjaxResponse.errors) {
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
    if (this.taskAjaxResponse) {
      for (const taskError of this.taskAjaxResponse.errors) {
        if (taskError.field === field && formField.pristine) {
          errorMessages.push(taskError.message);
        }
      }
    }
    return errorMessages;
  }
}
