import { TccdApiService } from './../../services/tccdapi.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-infos',
  templateUrl: 'infos.html',
})
export class InfosPage {

  results = [];
  businessId: any;
  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tccdApi: TccdApiService, private callSvc: CallNumber, private sms: SMS, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfosPage');
    this.results = [];
    console.log(this.navParams.get('businessId'));
    this.businessId = this.navParams.get('businessId');
    this.getBusinessInfo(this.businessId);
  }

  getBusinessInfo(x) {
    this.tccdApi.getBusiness(x)
    .then(response => {
      this.results = response;
      console.log(this.results);
    })
    .catch(e => console.log(JSON.stringify(e)));
  }

  CallNumber(x){
    this.callSvc.callNumber(x, true).then(() => {
        console.log('call worked');
    }).catch((err) => {
        alert(JSON.stringify(err))
    })
  }

  SendSMS(x){
      var options : {
          replaceLineBreaks: false,
          android: {
              intent: 'INTENT'
          }
      }
      this.sms.send(x, 'Message', options).then(() => {
          console.log('sms worked');
      }).catch((err) => {
          alert(JSON.stringify(err))
      })
  }

  goToBrowser(x) {
    this.iab.create(x)
  }

}
