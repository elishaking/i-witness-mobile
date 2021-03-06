import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';

import { HomePage } from '../home/home';

import { getURL } from '../../models/models';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  email: string = 'king.elisha';
  password: string = 'test12345';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignInPage');
  }

  signIn(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let timeout = setTimeout(()=>{
      loading.dismiss();
    }, 10000);

    this.http.post(
      getURL() + 'api/witness/login/',
      {
        account: {
          auth_field: this.email,
          password: this.password
        }
      }
    ).subscribe(
      (witness) => {
        let witnessData = witness.json();
        this.navCtrl.push(
          HomePage, 
          {
            'witness': witnessData
          }
        );
      },
      (error) => {
        // console.log('subscribe error');
        // console.log(error);
      },
      () =>{
        loading.dismiss();
        clearTimeout(timeout);
      }
    );
  }
}
