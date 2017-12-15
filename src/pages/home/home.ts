import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  firstName = "King";
  lastName = "Elisha";
  phoneNumber = "+2348119230123";

  constructor(public navCtrl: NavController) {

  }

}
