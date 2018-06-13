import { FavoritesPage } from './../favorites/favorites';
import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

    results = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    this.addListResults();
  }

  goToSearchPage(){
    //   console.log('ionViewDidLoad MapPage');
      this.navCtrl.setRoot(SearchPage);
  }

  goToFavoritesPage() {
      this.navCtrl.setRoot(FavoritesPage);
  }

  addListResults() {
    this.results = [];
    this.results = this.navParams.get('mapResults');
    console.log(JSON.stringify(this.results));

}

}
