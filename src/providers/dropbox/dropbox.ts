import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

/*
  Generated class for the DropboxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DropboxProvider {

  accessToken: any;
  folderHistory: any = [];
 
  constructor(public http: Http) {
 
  }
 
  setAccessToken(token) {
    this.accessToken = token;
  }
 
  getUserInfo(){
 
  }
 
  getFolders(path?){
 
  }
 
  goBackFolder(){
 
  }

}
