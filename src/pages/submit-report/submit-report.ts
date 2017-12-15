import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddReportFilePage } from '../add-report-file/add-report-file';

@Component({
  selector: 'page-submit-report',
  templateUrl: 'submit-report.html',
})
export class SubmitReportPage {

  nFiles = 0;
  name = "Sign In";
  signedIn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SubmitReportPage');
  }

  addNewFile(){
    this.navCtrl.push(AddReportFilePage);
  }

  submitAsUser(){

  }

  submitAsUnknown(){

  }

}
