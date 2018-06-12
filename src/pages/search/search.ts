import { DatabaseProvider } from './../../services/database.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { Http } from '@angular/http';

import { TccdApiGlobal } from './../../models/tccdapi-global.model';
import { TccdApiService } from './../../services/tccdapi.service';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  skillsList: TccdApiGlobal;

  constructor(public database: DatabaseProvider, public navCtrl: NavController, public navParams: NavParams, private http: Http, private tccdApiService: TccdApiService) {
    /* this.tccdApiService.getBusiness(12).then ((resp) => {
      console.log(JSON.stringify(resp)); 
    }) */
    
    this.database.selectFavorite();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  

}
