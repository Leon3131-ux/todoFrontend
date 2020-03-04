export class TaskDto {
  id: number = null;
  title = '';
  description = '';
  done = false;
  date: Date = new Date();
  expired = false;
  deleted = false;
  constructor(object?: any) {
    if (!object) { return; }
    this.id =  object.id;
    this.title = object.title;
    this.description = object.description;
    this.done = object.done;
    this.date = new Date(object.date);
    this.expired = object.expired;
    this.deleted = object.deleted;
  }
}
