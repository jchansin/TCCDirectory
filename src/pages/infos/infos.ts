// import { MapPage } from './../map/map';
import { DatabaseProvider } from "./../../services/database.service";
import { TccdApiService } from "./../../services/tccdapi.service";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { CallNumber } from "@ionic-native/call-number";
import { SMS } from "@ionic-native/sms";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Toast } from "@ionic-native/toast";

@Component({
    selector: "page-infos",
    templateUrl: "infos.html"
})
export class InfosPage {
    results = [];
    businessId: any;
    name: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public tccdApi: TccdApiService,
        private callSvc: CallNumber,
        private sms: SMS,
        private iab: InAppBrowser,
        private db: DatabaseProvider,
        // private mapPage: MapPage,
        private toast: Toast
    ) {}

    ionViewDidLoad() {
        console.log("ionViewDidLoad InfosPage");
        this.results = [];
        console.log(this.navParams.get("businessId"));
        this.businessId = this.navParams.get("businessId");
        this.getBusinessInfo(this.businessId);
    }

    getBusinessInfo(x) {
        this.tccdApi
            .getBusiness(x)
            .then(response => {
                this.results = response;
                console.log(this.results);
            })
            .catch(e => console.log(JSON.stringify(e)));
    }

    callNumber(x) {
        this.callSvc
            .callNumber(x, true)
            .then(() => {
                console.log("call worked");
            })
            .catch(err => {
                alert(JSON.stringify(err));
            });
    }

    sendSMS(x) {
        var options: {
            replaceLineBreaks: false;
            android: {
                intent: "INTENT";
            };
        };
        this.sms
            .send(x, "Message", options)
            .then(() => {
                console.log("sms worked");
            })
            .catch(err => {
                alert(JSON.stringify(err));
            });
    }

    goToBrowser(x) {
        const browser = this.iab.create(x, "_blank", {
            location: "yes",
            fullscreen: "yes"
        });
        browser.on("exit").subscribe(event => {
            console.log("browser exit");
            this.navCtrl.push(InfosPage, { businessId: this.businessId });
        });
    }

    testFavorite(x, y) {
        console.log("testFavorite");
        this.db.testFavorite(x, y);
    }

    /* calcDirections(x,y) {
    this.navCtrl.push(MapPage);
    this.mapPage.initDirections(x,y);
  } */

    sendReport(x) {
        this.tccdApi.getAbus(x);
        this.toast
            .show(
                `Votre signalement a bien été pris en compte`,
                "5000",
                "center"
            )
            .subscribe(toast => {
                console.log(toast);
            });
    }
}
