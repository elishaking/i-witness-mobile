import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-account-settings',
  templateUrl: 'account-settings.html',
})
export class AccountSettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AccountSettingsPage');
  }

}
