import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { AccountSettingsPage } from '../pages/account-settings/account-settings';
import { AddReportFilePage } from '../pages/add-report-file/add-report-file';
import { SubmitReportPage } from '../pages/submit-report/submit-report';
import { CompletePage } from '../pages/complete/complete';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LandingPage,
    SignInPage,
    SignUpPage,
    AccountSettingsPage,
    AddReportFilePage,
    SubmitReportPage,
    CompletePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandingPage,
    SignInPage,
    SignUpPage,
    AccountSettingsPage,
    AddReportFilePage,
    SubmitReportPage,
    CompletePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
