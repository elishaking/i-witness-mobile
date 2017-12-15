import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SubmitReportPage } from '../submit-report/submit-report';

@Component({
  selector: 'page-add-report-file',
  templateUrl: 'add-report-file.html',
})
export class AddReportFilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddReportFilePage');
  }

  takePicture(){

  }

  recordVideo(){

  }

  recordAudio(){

  }

  skip(){
    this.navCtrl.push(SubmitReportPage);
  }

}
