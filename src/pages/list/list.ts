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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  goToSearchPage(){
    //   console.log('ionViewDidLoad MapPage');
      this.navCtrl.setRoot(SearchPage);
  }
  goToFavoritesPage() {
      this.navCtrl.setRoot(FavoritesPage);
  }

}
