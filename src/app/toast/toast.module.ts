import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastComponent} from './toast.component';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [ToastComponent],
  entryComponents: [ToastComponent],
  exports: [
    ToastComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ]
})
export class ToastModule { }
