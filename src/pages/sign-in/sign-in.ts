import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  email: string = 'a1554374';
  password: string = 'a3276508';

  loginToken: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignInPage');
  }

  signIn(){
    // let headers = new Headers();
    // let token = '';
    // headers.append('Authorization', 'JWT ' + token);
    this.http.post(
      'http://localhost:8000/api/witness/login/',
      {
        account: {
          auth_field: this.email,
          password: this.password
        }
      }
    ).subscribe((res) => {
      this.loginToken = res.json()['account']['token'];
      this.navCtrl.setRoot(HomePage, {
        'token': this.loginToken
      });
    })
  }
}
