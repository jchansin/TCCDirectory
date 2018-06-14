import { DatabaseProvider } from "./../../services/database.service";
import { FavoritesPage } from "./../favorites/favorites";
// import { ListPage } from './../list/list';

import { MapPage } from "./../map/map";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
// import { Http } from '@angular/http';
import { TccdApiService } from "./../../services/tccdapi.service";

@Component({
    selector: "page-search",
    templateUrl: "search.html"
})
export class SearchPage {
    skillArray: Array<string>;
    skills = [];
    selected_value: string;
    value: string;

    constructor(
        public database: DatabaseProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        private tccdApiService: TccdApiService
    ) {}

    ionViewDidLoad() {
        console.log("ionViewDidLoad SearchPage");
        this.skills = [];
        this.tccdApiService.getSkillsList().then(response => {
            console.log(
                "Données de getSkillsList récupérées",
                JSON.stringify(response.data[0].name)
            );
            for (let i = 0; i < response.data.length; i++) {
                this.skills.push(response.data[i]);
            }
        });
    }

    goToFavoritesPage() {
        this.navCtrl.push(FavoritesPage);
    }

    showselected($event) {
        this.selected_value = $event;
        console.log(this.selected_value);
    }

    makeSearch() {
        this.navCtrl.push(MapPage, {
            value: this.selected_value.toString()
        });
    }
}
