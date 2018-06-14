import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-infos',
  templateUrl: 'infos.html',
})
export class InfosPage {

  results = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfosPage');
    this.results = [];
    this.results = this.navParams.get('results');
    console.log(this.results);
  }



}
