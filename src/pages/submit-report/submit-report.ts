import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, 
  CaptureImageOptions, CaptureVideoOptions, CaptureAudioOptions } from '@ionic-native/media-capture';

import { AddReportFilePage } from '../add-report-file/add-report-file';
import { CompletePage } from '../complete/complete';

@Component({
  selector: 'page-submit-report',
  templateUrl: 'submit-report.html',
})
export class SubmitReportPage {

  nFiles = 0;
  name = "";
  // signedIn = false;
  title: string;
  description: string;
  headers: Headers;

  media;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public platform: Platform, public actionsheetctrl: ActionSheetController,
    private camera: Camera, private mediaCapture: MediaCapture, private http: Http) {
    
  }

  ionViewDidLoad() {
    this.title = this.navParams.get('title');
    this.name = this.navParams.get('name');

    this.headers = new Headers();
    this.headers.append('Authorization', 'JWT ' + this.navParams.get('token'));
    // console.log('ionViewDidLoad SubmitReportPage');
  }

  // addNewFile(){
  //   this.navCtrl.push(AddReportFilePage);
  // }

  submitAsUser(){
    // this.loginToken = this.navParams.get('token');
    this.http.post(
      'http://localhost:8000/api/report/create/',
      {},
      { headers: this.headers }
    ).subscribe((res) => {
      console.log(res);
      // this.navCtrl.push(CompletePage);
    });
  }

  submitAsUnknown(){
    this.navCtrl.push(CompletePage);
  }

  imageCapture(){
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }
    
    // this.camera.getPicture(options).then((imageData) => {
    //  // imageData is either a base64 encoded string or a file URI
    //  // If it's base64:
    //  let base64Image = 'data:image/jpeg;base64,' + imageData;
    //  let prev = <HTMLImageElement>document.getElementById('image');
    //  prev.src = base64Image;
    // }, (err) => {
    //  // Handle error
    // });
    let options: CaptureImageOptions = { limit: 1 };
    this.mediaCapture.captureImage(options).then(
      (data: MediaFile[]) => {
        this.nFiles++;
        let mediaContainer = document.getElementById('media');
        let newImg = document.createElement('img');
        newImg.setAttribute('width', "320");
        newImg.setAttribute("height", "320");
        newImg.src = data[0].fullPath;
        this.media = data[0].fullPath;
        mediaContainer.appendChild(newImg);
        mediaContainer.appendChild(document.createElement('hr'));
        // let prev = <HTMLImageElement>document.getElementById('image');
        // prev.src = data[0].fullPath;
      },
      (err: CaptureError) => console.error(err)
    );
  }

  videoCapture(){
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

  audioCapture(){
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

  send(){
    // console.log(this.media);
    this.http.post(
      'http://localhost:8000/api/reports/create/',
      {
        title: this.title,
        message: this.description,
        location: '1',
        witness: null
      },
      { headers: this.headers }
    ).subscribe((res) => {
      console.log('report created');
      let report = res.json();
      this.http.post(
        'http://localhost:8000/api/media/create/',
        {
          // file: new File(),//this.media,
          report: report.id | 1
        },
        { headers: this.headers }
      )
      // for(let i = 0; i < this.nFiles; i++){
      //   this.http.post(
      //     '',
      //     {

      //     },
      //     { headers: this.headers }
      //   ).subscribe((res) => {
      //     console.log('media uploaded');
      //   })
      // }
    });
  }
}

interface ReportMedia{
  type: string;
  path: string;
}
