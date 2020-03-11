import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MultiResultComponent } from './search-result/multi-result/multi-result.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';
import { TaskSaveComponent } from './task-save/task-save.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {BsDatepickerModule, PopoverConfig, PopoverModule, TooltipConfig, TooltipModule} from 'ngx-bootstrap';
import { ToastModule } from './toast/toast.module';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiResultComponent,
    TaskTableComponent,
    TaskSaveComponent,
    LanguageSelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    AngularFontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BsDatepickerModule,
    ToastModule,
    TooltipModule,
    PopoverModule,
  ],
  providers: [
    TaskService,
    TooltipConfig,
    PopoverConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
