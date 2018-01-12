import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  email: string = 'test101';
  password: string = 'test12345';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignInPage');
  }

  signIn(){
    this.http.post(
      'http://192.168.43.46:8000/api/witness/login/',
      {
        account: {
          auth_field: this.email,
          password: this.password
        }
      }
    ).subscribe((res) => {
      let account = res.json()['account'];
      this.navCtrl.setRoot(HomePage, {
        'token': account['token'],
        'id': account['id']
      });
    });
  }
}
