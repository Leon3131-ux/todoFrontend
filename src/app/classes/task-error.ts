export class TaskError {
  message: string;

  getField() {
    return this.message.split('.')[2];
  }

  constructor(message: string) {
    this.message = message;
  }
}
