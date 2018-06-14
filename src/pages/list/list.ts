import { InfosPage } from "./../infos/infos";
import { TccdApiService } from "./../../services/tccdapi.service";
import { MenuController } from "ionic-angular";
import { MapPage } from "./../map/map";
import { CallNumber } from "@ionic-native/call-number";
import { FavoritesPage } from "./../favorites/favorites";
import { SearchPage } from "./../search/search";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SMS } from "@ionic-native/sms";

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: "page-list",
    templateUrl: "list.html"
})
export class ListPage {
    results = [];
    businessId: any;
    businessInfo = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private callSvc: CallNumber,
        private sms: SMS,
        private menuCtrl: MenuController,
        private tccdApi: TccdApiService
    ) {}

    ionViewDidLoad() {
        console.log("ionViewDidLoad ListPage");
        this.addListResults();
    }

    goToSearchPage() {
        this.navCtrl.setRoot(SearchPage);
    }

    goToFavoritesPage() {
        this.navCtrl.push(FavoritesPage);
    }

    goToMapPage() {
        this.navCtrl.push(MapPage, this.results);
    }

    goToInfosPage(x) {
        this.navCtrl.push(InfosPage, { businessId: x });
    }

    addListResults() {
        this.results = [];
        this.results = this.navParams.get("mapResults");
        console.log(this.results);
    }

    // AddAbus() {
    //         this.results = [];
    // this.results = this.navParams.get('mapResults');
    // console.log(this.results);
    // }
}
