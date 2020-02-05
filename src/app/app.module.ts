import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MultiResultComponent } from './search-result/multi-result/multi-result.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';
import { TaskSaveComponent } from './task-save/task-save.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MultiResultComponent,
    NavbarComponent,
    TaskTableComponent,
    TaskSaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
