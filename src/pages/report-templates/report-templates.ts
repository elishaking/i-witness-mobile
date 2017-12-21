import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SubmitPage } from '../submit/submit'

@Component({
  selector: 'page-report-templates',
  templateUrl: 'report-templates.html',
})
export class ReportTemplatesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  openSubmitReportPage(title:string){
    this.navCtrl.push(SubmitPage, {title: title})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportTemplatesPage');
  }

}
