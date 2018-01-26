import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { User } from '../sign-up/sign-up';
import { ReportTemplatesPage } from '../report-templates/report-templates';

import { FileChooser } from '@ionic-native/file-chooser';
import {
  MediaCapture, MediaFile, CaptureError,
  CaptureImageOptions, CaptureVideoOptions, CaptureAudioOptions
} from '@ionic-native/media-capture';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File as IonicFile } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

import { Witness } from '../../models/models';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // firstName = "King";
  // lastName = "Elisha";
  // phoneNumber = "+2348119230123";
  witness: Witness;

  constructor(public navCtrl: NavController, private navParams: NavParams, private http: Http,
    private fileChooser: FileChooser, public actionsheetctrl: ActionSheetController,
    private mediaCapture: MediaCapture, private file: IonicFile, private filepath: FilePath) {
    this.witness = this.navParams.get('witness');
    console.log(this.witness);
    // 'http://192.168.43.46:8000/api/witness/1?format=json'
    this.http.get('http://192.168.43.46:8000/api/witness/' + this.witness.account.owner_id + '?format=json')
      .subscribe(
        (res) => {
          this.witness = res.json();
          console.log(this.witness);
        }
      );
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
      witness: this.witness
    });
  }

  updateAvatar(){
    // /*
    let actionSheet = this.actionsheetctrl.create({
      title: 'Complete with',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Camera',
          // icon: !this.platform.is('ios') ? 'camera' : null,
          icon: 'camera',
          handler: () => {
            let options: CaptureImageOptions = { limit: 1 };
            this.mediaCapture.captureImage(options).then(
              (data: MediaFile[]) => {
                this.displayAvatar(data[0].fullPath);
              },
              (err: CaptureError) => console.error(err)
            );
          }
        },
        {
          text: 'Select Photo',
          // icon: !this.platform.is('ios') ? 'camera' : null,
          icon: 'camera',
          handler: () => {
            this.fileChooser.open().then(
              (uri) => {
                this.filepath.resolveNativePath(uri).then((path) => {
                  console.log(path);
                  let directoryEntry;
                  let directoryPath = path.substr(0, path.lastIndexOf('/') + 1),
                  filename = path.substr(path.lastIndexOf('/') + 1) ;
                  this.file.resolveDirectoryUrl(directoryPath).then((val) => {
                    directoryEntry = val;
                    let fileType = '';
                    this.file.getFile(directoryEntry, filename, {}).then((file) => {
                      file.file((f)=>{
                        fileType = f.type;
                        // console.log(fileType);
                        if(fileType == 'image/jpeg'){
                          this.file.readAsDataURL(directoryPath, filename)
                            .then(
                              (data) => {
                                console.log(data);
                                this.http.put(
                                  'http://192.168.43.46:8000/api/accounts/' + this.witness.account.owner_id + '/edit',
                                  {
                                    phone_number: this.witness.account.phone_number,
                                    image: data
                                  }
                                ).subscribe(
                                  (res) => {
                                    console.log(res);
                                  }
                                );
                              }
                            );
                        }
                      });
                    });
                  });
                  
                });
              }
            ).catch(e => console.log(e));
          }
        },
      ]
    });
    actionSheet.present();
    // */
    // this.http.put(
    //   'http://192.168.43.46:8000/api/accounts/' + this.witness.id + '/edit',
    //   {
    //     phone_number: this.witness.account.phone_number,
    //     image: '98988'
    //   }
    // ).subscribe(
    //   (res) => {
    //     console.log(res);
    //   }
    // );
  }

  displayAvatar(avatarPath){

  }

}

// class Witness{

//   constructor(public account = new User(), public report = []){

//   }
// }
