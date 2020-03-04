export class ToastMessage {
  id: number;
  message: string;
  type: string;
  constructor(id, message, type) {
    this.id = id;
    this.message = message;
    this.type = type;
  }
}
