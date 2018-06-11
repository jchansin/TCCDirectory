import { FavoritesPage } from './../favorites/favorites';
import { ListPage } from './../list/list';
// import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { TccdApiGlobal } from './../../models/tccdapi-global.model';
import { TccdApiService } from './../../services/tccdapi.service';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  skillsList: TccdApiGlobal;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private tccdApiService: TccdApiService) {

   /*  this.tccdApiService.getSkillsList()
    .then(skillsListFetched => {
      this.skillsList = skillsListFetched;
      console.log(this.skillsList);
    }); */
    this.tccdApiService.getBusiness(12).then ((resp) => {
      console.log(JSON.stringify(resp));
    })

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  goToListPage(){
    //   console.log('ionViewDidLoad MapPage');
      this.navCtrl.setRoot(ListPage)
  }
  goToFavoritesPage() {
    this.navCtrl.setRoot(FavoritesPage);
}



}
