import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';
import { TaskSaveComponent } from './components/task-save/task-save.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {ToastModule} from './components/toast/toast.module';
import {LanguageSelectorComponent} from './components/language-selector/language-selector.component';
import {DefaultErrorHandler} from './errorHandlers/default-error-handler';
import {ValidationErrorHandler} from './errorHandlers/validation-error-handler';
import {InternalServerErrorHandler} from './errorHandlers/internal-server-error-handler';
import {TaskSaveErrorHandler} from './errorHandlers/task-save-error-handler';
import {AuthorizationErrorHandler} from './errorHandlers/authorization-error-handler';
import {LoginComponent} from './components/login/login.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {RouterModule, Routes} from '@angular/router';
import {PermissionGuard} from './guards/permission.guard';
import {httpInterceptProviders} from './httpInterceptors/HttpInteceptProviders';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TooltipConfig, TooltipModule} from 'ngx-bootstrap/tooltip';
import {PopoverConfig, PopoverModule} from 'ngx-bootstrap/popover';
import {AuthenticationErrorHandler} from './errorHandlers/authentication-error-handler';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [PermissionGuard], data: {requiredRole: 'TaskUser'}},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TaskTableComponent,
    TaskSaveComponent,
    LanguageSelectorComponent,
    LoginComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    ModalModule.forRoot(),
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(
      appRoutes
    ),
    BsDatepickerModule,
    ToastModule,
    TooltipModule,
    PopoverModule,
  ],
  providers: [
    TaskService,
    TooltipConfig,
    PopoverConfig,
    DefaultErrorHandler,
    AuthorizationErrorHandler,
    AuthenticationErrorHandler,
    ValidationErrorHandler,
    InternalServerErrorHandler,
    TaskSaveErrorHandler,
    httpInterceptProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
