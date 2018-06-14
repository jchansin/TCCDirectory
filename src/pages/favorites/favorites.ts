import { InfosPage } from "./../infos/infos";
import { DatabaseProvider } from "./../../services/database.service";
import { ListPage } from "./../list/list";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SearchPage } from "../search/search";

@Component({
    selector: "page-favorites",
    templateUrl: "favorites.html"
})
export class FavoritesPage {
    favorites = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private database: DatabaseProvider
    ) {}

    ionViewWillEnter() {
        console.log("ionViewWillEnter FavoritesPage");
        this.getFavoritesList();
    }

    goToListPage() {
        this.navCtrl.push(ListPage);
    }

    goToSearchPage() {
        this.navCtrl.setRoot(SearchPage);
    }

    getFavoritesList() {
        console.log('getFavoritesList');
        this.favorites = [];
        this.database
            .getFavoritesList()
            .then(data => {
                console.log('Got favorites list')
                for (let i = 0; i < data.rows.length; i++) {
                    this.favorites.push(data.rows.item(i));
                }
            })
            .catch(e => console.log(JSON.stringify(e)));
    }

    goToInfosPage(x) {
        this.navCtrl.push(InfosPage, { businessId: x });
    }
}
