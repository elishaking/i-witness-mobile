import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';




@Component({
  selector: 'page-report-templates',
  templateUrl: 'report-templates.html',
})
export class ReportTemplatesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportTemplatesPage');
  }

}
