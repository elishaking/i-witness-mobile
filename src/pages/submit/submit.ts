import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-submit',
  templateUrl: 'submit.html',
})
export class SubmitPage {
    title:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = navParams.get('title');
    // console.log(this.title);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitPage');
  }

}
