import { Component } from '@angular/core';
import { 
  Platform, NavController, NavParams, 
  LoadingController, ActionSheetController, 
  ToastController 
} from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { Camera, CameraOptions } from '@ionic-native/camera';
import {
  MediaCapture, MediaFile, CaptureError,
  CaptureImageOptions, CaptureVideoOptions, CaptureAudioOptions
} from '@ionic-native/media-capture';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File as IonicFile } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';

import { CompletePage } from '../complete/complete';
import { Witness, Report, getURL } from '../../models/models';

// import Dropbox = require('../../../node_modules/dropbox/src/index');

@Component({
  selector: 'page-submit-report',
  templateUrl: 'submit-report.html',
})
export class SubmitReportPage {
  headers: Headers;

  report: Report;
  nFiles = 0;

  // signedIn = false;
  witness: Witness;

  media: MediaFile[] = [];

  // dbx: Dropbox;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, public actionsheetctrl: ActionSheetController,
    private camera: Camera, private mediaCapture: MediaCapture, private http: Http,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController, //private transfer: FileTransfer,
    private file: IonicFile, private geolocation: Geolocation) {
    this.witness = this.navParams.get('witness');
    this.report = {title: '', message: '', location: 'i', witness: this.witness ? this.witness.id : null};
    this.report.title = this.navParams.get('title');
  }

  ionViewDidLoad() {
    // this.report.title = 'new report';
    // this.report.message = 'message';

    this.headers = new Headers();
    // this.headers.append('Authorization', 'JWT ' + this.witness.token);

    // this.dbx = new Dropbox({
    //   accessToken: 'SE7xfW446lgAAAAAAAACCFc_vnloZ-IknQL2rVPwE3BDzs0Gg___2WJRYNP7wDos',
    //   clientId: '',
    //   selectUser: ''
    // });
  }

  imageCapture() {
    let options: CaptureImageOptions = { limit: 1 };
    this.mediaCapture.captureImage(options).then(
      (data: MediaFile[]) => {
        this.nFiles++;
        let mediaContainer = document.getElementById('media');
        let newImg = document.createElement('img');
        newImg.setAttribute('width', "320");
        newImg.setAttribute("height", "320");
        newImg.src = data[0].fullPath;
        this.media.push(data[0]);
        mediaContainer.appendChild(newImg);
        mediaContainer.appendChild(document.createElement('hr'));

        // let prev = <HTMLImageElement>document.getElementById('image');
        // prev.src = data[0].fullPath;
      },
      (err: CaptureError) => console.error(err)
    );
  }

  videoCapture() {
    let options: CaptureVideoOptions = { limit: 1 };
    this.mediaCapture.captureVideo(options).then(
      (data: MediaFile[]) => {
        this.nFiles++;
        let mediaContainer = document.getElementById('media');
        let newVid = document.createElement('video');
        newVid.setAttribute('controls', 'true');
        newVid.setAttribute('width', "320");
        newVid.setAttribute("height", "320");
        // let vid = <HTMLVideoElement>document.getElementById('video');
        let source = document.createElement('source');
        source.setAttribute('src', data[0].fullPath);
        newVid.appendChild(source);
        mediaContainer.appendChild(newVid);
        mediaContainer.appendChild(document.createElement('hr'));
        // vid.play();
        // console.log(vidSrc.src);
      },
      (err: CaptureError) => console.error(err)
    );
  }

  audioCapture() {
    let options: CaptureAudioOptions = { limit: 1 };
    this.mediaCapture.captureAudio(options).then(
      (data: MediaFile[]) => {
        this.nFiles++;
        let mediaContainer = document.getElementById('media');
        let newAud = document.createElement('audio');
        newAud.setAttribute('controls', 'true');
        // let vid = <HTMLVideoElement>document.getElementById('video');
        let source = document.createElement('source');
        source.setAttribute('src', data[0].fullPath);
        newAud.appendChild(source);
        mediaContainer.appendChild(newAud);
        mediaContainer.appendChild(document.createElement('hr'));
      },
      (err: CaptureError) => console.error(err)
    );
  }

  addMedia() {
    let actionSheet = this.actionsheetctrl.create({
      title: 'Media',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Take picture',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            // console.log('Camera Open');
            this.imageCapture();
          }
        },
        {
          text: 'Record video',
          icon: !this.platform.is('ios') ? 'videocam' : null,
          handler: () => {
            // console.log('camera app')
            this.videoCapture();
          }
        },
        {
          text: 'Record audio',
          icon: !this.platform.is('ios') ? 'mic' : null,
          handler: () => {
            // console.log('audio recorder open');
            this.audioCapture();
          }
        }
      ]
    });
    actionSheet.present();
  }

  /*
  uploadFile(filepath, apiEndpoint) {
    console.log('filename', this.media.fullPath.substr(this.media.fullPath.lastIndexOf('/') + 1));
    let options: FileUploadOptions = {
      fileKey: 'file',
      // httpMethod: 'PUT',
      fileName: this.media.fullPath.substr(this.media.fullPath.lastIndexOf('/') + 1),
      // fileName: this.media.name,
      // mimeType: this.media.type,
      // chunkedMode: false,
      headers: {
        Connection: "close"
        // 'Content-Type': 'image/jpeg'
      }

    }

    const fileTransfer: FileTransferObject = this.transfer.create();
    //  console.log('in uploadfile');

    // Upload a file:
    fileTransfer.upload(filepath, encodeURI(apiEndpoint), options, true).then((data) => {
      // success
      console.log('upload success');
    }, (err) => {
      // error
      console.log('upload error');
      console.log(err);
    });
  }
  */

  // getLocation(){
  //   // let location = '';
  //   // this.geolocation.getCurrentPosition().then((geoposition) => {
  //   //   location = geoposition.coords.latitude + ',' + geoposition.coords.longitude + ',' + geoposition.timestamp;
  //   // });
  // }

  send() {
    let loading = this.loadingCtrl.create({
      content: 'Sending Report...'
    });
    loading.present();

    // let timeout = setTimeout(()=>{
    // }, 15000);

    let location = '';
    this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((geoposition) => {
      this.report.location = geoposition.coords.latitude + ',' + geoposition.coords.longitude + ',' + geoposition.timestamp;

      let reportBody = {
        title: this.report.title,
        message: this.report.message,
        location: this.report.location,
        witness: this.report.witness
      };
      console.log(reportBody);
      this.http.post(
        getURL() + 'api/reports/create/', reportBody,
        // { headers: this.headers }
      )
      .subscribe(
        (report) => {
          // console.log(report);
          let loading = this.loadingCtrl.create({
            content: 'Uploading media files'
          });
          loading.present();
          let loadingDismissed = false;

          // let timeout = setTimeout(()=>{
            
          // }, 15000);

          for(let i = 0; i < this.media.length; i++){
            this.file.readAsDataURL(this.media[i].fullPath.replace(this.media[i].name, ''), this.media[i].name)
            .then(
              (data) => {
                let mediaBody = {
                  file: data,
                  filename: 'report' + report.json().id + '.' + this.media[i].name.split('.')[1],  //fix - use lastindexof
                  report: report.json().id
                };
                this.http.post(
                  getURL() + 'api/media/create/', mediaBody
                ).subscribe(
                    (res) => {
                      // console.log('uploaded file');
                      // console.log(res);
                    }, 
                    (err)=>{
                      // console.log('upload error');
                      // console.log(err);

                      if(!loadingDismissed){
                        loading.dismiss();
                        loadingDismissed = true;
                        this.toastCtrl.create({
                          message: "Connection Error: " + i + "files uploaded",
                          duration: 5000,
                          closeButtonText: 'OK',
                          dismissOnPageChange: true,
                        }).present();
                      }
                      
                    },
                    () => {
                      if(i == this.nFiles - 1)
                        loading.dismiss();
                    }
                );
              }
            );
          }
        },
        (error) => {
          loading.dismiss();
          this.toastCtrl.create({
            message: "Could not submit report: Connection Error",
            duration: 5000,
            closeButtonText: 'OK',
            dismissOnPageChange: true,
          }).present();
          // clearTimeout(timeout);
        },
        () =>{
          loading.dismiss();
          // clearTimeout(timeout);
        }
      );
    });
  }

  // listDropboxfolders(path = ''){
  //   this.dbx.filesListFolder({
  //     path: '',
  //     recursive: false,
  //     include_media_info: false,
  //     include_deleted: false,
  //     include_has_explicit_shared_members: false
  //   }).then(function(response) {
  //     // console.log(response.entries);
  //     console.log(response);
  //   })
  //   .catch(function(error) {
  //     console.error(error);
  //   });
  // }
}

interface ReportMedia {
  type: string;
  path: string;
}
