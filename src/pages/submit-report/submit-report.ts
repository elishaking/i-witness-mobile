import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
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
  name = "Sign In";
  signedIn = false;
  title:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public platform: Platform, public actionsheetctrl: ActionSheetController,
    private camera: Camera, private mediaCapture: MediaCapture) {
    this.title = navParams.get('title');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SubmitReportPage');
  }

  // addNewFile(){
  //   this.navCtrl.push(AddReportFilePage);
  // }

  submitAsUser(){
    this.navCtrl.push(CompletePage);
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
        newImg.src = data[0].fullPath;
        mediaContainer.appendChild(newImg);
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
        // let vid = <HTMLVideoElement>document.getElementById('video');
        let source = document.createElement('source');
        source.setAttribute('src', data[0].fullPath);
        newVid.appendChild(source);
        mediaContainer.appendChild(newVid);
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
}
