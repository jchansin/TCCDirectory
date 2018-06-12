import { DatabaseProvider } from './../../services/database.service';
import { SearchPage } from './../search/search';
import { Component } from "@angular/core";
import { NavController, NavParams, Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";


@Component({
    selector: "page-welcome",
    templateUrl: "welcome.html"
})
export class WelcomePage {
    splash = true;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private platform: Platform,
        public sqlite: SQLite,
        public database: DatabaseProvider
    ) {
        this.platform.ready().then(() => {
            this.database.initDb();
        });
    }

    ionViewDidLoad() {
        console.log("ionViewDidLoad WelcomePage");
        setTimeout(() => {
            this.splash = false;
            this.redirectToSearch();
        }, 4000);
    }


    redirectToSearch() {
    this.navCtrl.setRoot(SearchPage);
    }


}
