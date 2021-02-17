import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RucheComponent } from './ruche/ruche.component';
import { BenchmarkComponent } from './benchmark/benchmark.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { UniversalAppInterceptor } from './interceptors/universal-app.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; 
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule} from '@angular/material/slider'
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSnackBarModule,MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatSidenavModule, } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon'
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'
import { DatePipe } from '@angular/common';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import {AuthService} from './services/auth.service'
import {JWTTokenService} from './services/jwttoken.service'
import {LocalStorageService} from './services/local-storage.service'
import {ProcessHTTPMsgService} from './services/process-httpmsg.service'
import {RucheService} from './services/ruche.service'
import {UserService} from './services/user.service'
import {baseURL} from './shared/baseurl'
import { from } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RucheComponent,
    BenchmarkComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    FlexLayoutModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatIconModule,
    NgxChartsModule,
    ChartsModule,
    WavesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UniversalAppInterceptor, multi: true },
    AuthService,
    JWTTokenService,
    LocalStorageService,
    ProcessHTTPMsgService,
    RucheService,
    UserService,
    DatePipe,
    { provide: 'BaseURL', useValue: baseURL},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
