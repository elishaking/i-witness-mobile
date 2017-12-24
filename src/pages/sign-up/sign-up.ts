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
    this.user.gender = 'M';
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignUpPage');
  }

  signUp(){
    // console.log(this.user.getUserObject());
    this.http.post(
      // 'https://iwitnez.herokuapp.com/api/witness/create/',
      'http://localhost:8000/api/witness/create/',
      this.user.getUserObject(),
      // {
      //   headers: headers
      // }
    ).subscribe((res)=>{
      console.log("user created");
      // this.navCtrl.push(HomePage);
    }, (error) => {
      console.log(error);
      console.log("user not created");
    });
    // this.http.get(
    //   // 'https://iwitnez.herokuapp.com/api/witness/'
    //   'http://localhost:8000/api/witness/'
    // ).subscribe(()=>{
    //   console.log("gotten");
    // });
    // this.navCtrl.push(HomePage);
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
        username: this.generateText(),
        email: this.email,
        password: this.generateText(),
        phoneNumber: this.phoneNumber,
        gender: this.gender
      }
    }
  }

  generateText(){
    let txt = "test";
    for(let i = 0; i < 5; i++){
      txt += String(Math.floor(Math.random() * 10));
    }
    return txt;
  }
}
