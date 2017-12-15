import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddReportFilePage } from '../add-report-file/add-report-file';

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
    this.navCtrl.push(AddReportFilePage);
  }

}
