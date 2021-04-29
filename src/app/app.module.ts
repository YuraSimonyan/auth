import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shell/header/header.component';
import {MainComponent} from './shell/main/main.component';
import {MaterialModule} from './shared/material/material.module';
import {AuthComponent} from './shell/main/auth/auth.component';
import {UserState} from './shared/store/user.state';
import {environment} from '../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([UserState]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
