import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';

import { Camera, CameraOptions } from '@ionic-native/camera';
import {
  MediaCapture, MediaFile, CaptureError,
  CaptureImageOptions, CaptureVideoOptions, CaptureAudioOptions
} from '@ionic-native/media-capture';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File as IonicFile } from '@ionic-native/file';

import { CompletePage } from '../complete/complete';
import { Witness } from '../../models/models';

// import Dropbox = require('../../../node_modules/dropbox/src/index');

@Component({
  selector: 'page-submit-report',
  templateUrl: 'submit-report.html',
})
export class SubmitReportPage {
  nFiles = 0;
  title: string;
  description: string;
  headers: Headers;

  // signedIn = false;
  witness: Witness;

  media: MediaFile;

  // dbx: Dropbox;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, public actionsheetctrl: ActionSheetController,
    private camera: Camera, private mediaCapture: MediaCapture, private http: Http,
    private transfer: FileTransfer, public loadingCtrl: LoadingController,
    private file: IonicFile) {

  }

  ionViewDidLoad() {
    this.title = this.navParams.get('title');
    this.witness = this.navParams.get('witness')
    // this.title = 'new report';
    // this.description = 'description';

    this.headers = new Headers();
    this.headers.append('Authorization', 'JWT ' + this.navParams.get('token'));

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
        this.media = data[0];
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
    })
    actionSheet.present();
  }

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

  send() {
    this.file.readAsDataURL(this.media.fullPath.replace(this.media.name, ''), this.media.name)
      .then(
        (data) => {
          let reportBody = {
            title: this.title,
            message: this.description,
            location: '1',
            witness: this.witness.id
          };
          this.http.post(
            'http://192.168.43.46:8000/api/reports/create/',
            reportBody,
            { headers: this.headers }
          ).subscribe(
              (reportResponse) => {
                let mediaBody = {
                  file: data,
                  filename: 'report.' + this.media.name.split('.')[1],  //fix - use lastindexof
                  report: reportResponse.json().id
                };
                this.http.post(
                  'http://192.168.43.46:8000/api/media/create/', mediaBody
                ).subscribe(
                    (res) => {
                      // console.log('uploaded file');
                      // console.log(res);
                    }, 
                    (err)=>{
                      // console.log('upload error');
                      // console.log(err);
                    }
                );
              }
            );
        }
      ).catch((r) => {
        // console.log('error: ', r);
        }
      );
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
