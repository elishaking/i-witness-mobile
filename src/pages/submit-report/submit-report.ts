import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller'

import { AddReportFilePage } from '../add-report-file/add-report-file';
import { CompletePage } from '../complete/complete';

@Component({
  selector: 'page-submit-report',
  templateUrl: 'submit-report.html',
})
export class SubmitReportPage {

  nFiles = 0;
  name = "Sign In";
  signedIn = false;
  title:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public actionsheetctrl: ActionSheetController) {
    this.title = navParams.get('title');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SubmitReportPage');
  }

  // addNewFile(){
  //   this.navCtrl.push(AddReportFilePage);
  // }

  submitAsUser(){
    this.navCtrl.push(CompletePage);
  }

  submitAsUnknown(){
    this.navCtrl.push(CompletePage);
  }

  addMedia() {
    let actionSheet = this.actionsheetctrl.create({
      title: 'Media',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Take picture',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            console.log('Camera Open');
          }
        },
        {
          text: 'Record audio',
          icon: !this.platform.is('ios') ? 'mic' : null,
          handler: () => {
            console.log('audio recorder open');
          }
        },
        {
          text: 'Record video',
          icon: !this.platform.is('ios') ? 'videocam' : null,
          handler: () => {
            console.log('camera app')
          }
        }
      ]
    })
    actionSheet.present();
  }
}
