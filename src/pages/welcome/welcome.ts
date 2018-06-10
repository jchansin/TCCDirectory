import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

    splash = true;

    constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {

    }
    ionViewDidLoad(){
     setTimeout(() => {
       this.splash = false;

     }, 4000);
    }

  }
