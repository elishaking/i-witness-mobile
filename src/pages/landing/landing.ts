import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';
import { SubmitReportPage } from '../submit-report/submit-report';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LandingPage');
  }

  createReport(){
    this.navCtrl.push(SubmitReportPage);
  }

  signIn(){
    this.navCtrl.push(SignInPage);
  }

  signUp(){
    this.navCtrl.push(SignUpPage);
  }

}
