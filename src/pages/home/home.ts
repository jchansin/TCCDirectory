import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
@Component({
    selector: "page-home",
    templateUrl: "home.html"
})
export class HomePage {
    totalSkills = 0;
    skills = [];

    constructor(
        public navCtrl: NavController,
        private platform: Platform,
        private sqlite: SQLite
    ) {
        this.platform.ready().then(() => {});
    }
    ionViewDidLoad() {
          this.getSkills();
    }
     getSkills() {
         this.skills = [];
         this.sqlite
             .create({
                 name: "data.db",
                 location: "default"
             })
             .then((db: SQLiteObject) => {
                 db.executeSql("SELECT * FROM skills", {}).then(data => {
                     this.totalSkills = data.rows.length;
                     for (let i = 0; i < data.rows.length; i++) {
                        this.skills.push(data.rows.item(i));
                     }})
                 })
             };
        }
