export class ToastMessage {
  id: number;
  message: string;
  type: string;
  aliveFor: number;
  timeout: any;
  constructor(id, message, type, aliveFor?) {
    this.id = id;
    this.message = message;
    this.type = type;
    if (aliveFor === undefined) {
      this.aliveFor = 3000;
    } else {
      this.aliveFor = aliveFor;
    }
  }
}
