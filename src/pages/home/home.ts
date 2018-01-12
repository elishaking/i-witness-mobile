import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { User } from '../sign-up/sign-up';
import { ReportTemplatesPage } from '../report-templates/report-templates';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // firstName = "King";
  // lastName = "Elisha";
  // phoneNumber = "+2348119230123";
  witness: Witness;

  constructor(public navCtrl: NavController, private navParams: NavParams, private http: Http) {
    
  }

  ionViewDidLoad(){
    // this.loginToken = this.navParams.get('token');
    // let headers = new Headers();
    // headers.append('Authorization', 'JWT ' + this.loginToken);
    // this.http.get(
    //   'http://192.168.43.46:8000/api/witness/' + this.navParams.get('id'),
    //   { headers: headers }
    // ).subscribe((res) => {
    //   this.witness = res.json();
    //   console.log(this.witness);
    // });
  }

  addReport(){
    this.navCtrl.push(ReportTemplatesPage, {
      witness: this.navParams.get('witness')
    })
  }

}

// class Witness{

//   constructor(public account = new User(), public report = []){

//   }
// }

export interface Witness{
  id,
  account: {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    gender: string,
    phone_number: null,
    image: string,
    witness: number,
    officer: number
  },
  reports
}
