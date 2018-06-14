import { ListPage } from "./../list/list";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SearchPage } from "../search/search";

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: "page-favorites",
    templateUrl: "favorites.html"
})
export class FavoritesPage {
    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {
        console.log("ionViewDidLoad FavoritesPage");
    }
    goToListPage() {
        //   console.log('ionViewDidLoad MapPage');
        this.navCtrl.push(ListPage);
    }

    goToSearchPage() {
        this.navCtrl.setRoot(SearchPage);
    }
}
