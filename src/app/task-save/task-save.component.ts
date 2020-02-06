import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {TaskDto} from '../classes/task-dto';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../services/task.service';
import {TaskAjaxResponse} from '../classes/task-ajax-response';
import {ModalDirective} from 'ngx-bootstrap';
import {TaskError} from '../classes/task-error';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.component.html',
  styleUrls: ['./task-save.component.scss']
})
export class TaskSaveComponent implements OnChanges {

  @Input() currentEntry: TaskDto;
  @Output() savedTask = new EventEmitter<TaskDto>();
  @Output() formReset = new EventEmitter();
  @Output() deletedTask = new EventEmitter();
  @ViewChild('saveTaskModal', { static: false }) childModal: ModalDirective;
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
  constructor(private taskService: TaskService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentEntry.currentValue) {
      this.updateForm(this.currentEntry);
    }
  }
  updateForm(taskDto: TaskDto) {
    this.saveTaskForm.patchValue(taskDto);
  }
  submitTaskDto() {
    this.taskService.saveTask(this.saveTaskForm.getRawValue()).subscribe(data => {
      this.taskAjaxResponse = data;
      if (this.taskAjaxResponse.failed === false) {
        this.savedTask.emit(this.taskAjaxResponse.taskDto);
        this.resetForm();
        this.hideChildModal();
      }
    });
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
  }
  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  getErrors(fieldName: string): TaskError[] {
    if (this.taskAjaxResponse === undefined) {
      return [];
    } else {
      return this.taskAjaxResponse.errors.filter(error => error.field === fieldName);
    }
  }
  getTrue() {
    return true;
  }
}
