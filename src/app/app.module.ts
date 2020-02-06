import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MultiResultComponent } from './search-result/multi-result/multi-result.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';
import { TaskSaveComponent } from './task-save/task-save.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { Routes } from '@angular/router';
import { AngularFontAwesomeModule} from 'angular-font-awesome';

const appRoutes: Routes = [
  { path: 'allTasks', component: AppComponent},
  { path: 'finishedTasks', component: AppComponent},
  { path: 'unfinishedTasks', component: AppComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MultiResultComponent,
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
    ModalModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
