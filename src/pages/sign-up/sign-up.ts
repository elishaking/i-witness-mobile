import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.user = new User();
    this.user.gender = 'male';
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignUpPage');
  }

  signUp(){
    // console.log(this.user.getUserObject());
    // this.http.post(
    //   'https://iwitnez.herokuapp.com/api/witness/create/',
    //   this.user.getUserObject()
    // ).subscribe((res)=>{
    //   console.log("user created");
    //   // this.navCtrl.push(HomePage);
    // }, (error) => {
    //   console.log(error);
    //   console.log("user not created");
    // });
    // this.http.get('https://iwitnez.herokuapp.com/api/witness/?format=json').subscribe(()=>{
    //   console.log("gotten");
    // });
    this.navCtrl.push(HomePage);
  }

}

class User{
  // firstName: string;
  // lastName: string;
  // username: string;
  // email: string;
  // password: string;
  // phoneNumber: string;
  // gender: string;
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public username: string = '',
    public email: string = '',
    public password: string = '',
    public phoneNumber: string = '',
    public gender: string = ''){

  }

  getUserObject(){
    return { 
      account: {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        gender: this.gender
      }
    }
  }
}
