import { SearchPage } from './../search/search';
import { Component } from "@angular/core";
import { NavController, NavParams, Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Component({
    selector: "page-welcome",
    templateUrl: "welcome.html"
})
export class WelcomePage {
    database: SQLiteObject;
    splash = true;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private platform: Platform,
        public sqlite: SQLite
    ) {
        this.platform.ready().then(() => {
            //   this.initDb();
        });
    }
    ionViewDidLoad() {
        console.log("ionViewDidLoad WelcomePage");
        setTimeout(() => {
            this.splash = false;
            this.redirectToHome();
        }, 4000);
    }
        redirectToHome() {
      this.navCtrl.setRoot(SearchPage);
      }

    //  initDb() {
    //      this.sqlite
    //          .create({
    //              name: "data.db",
    //             location: "default"
    //              })
    //             .then((db: SQLiteObject) => {
    //               this.database = db;
    //               this.createSkillsTable();
    //             // console.log("CREATE SUCESS");
    //          })
    //          .catch(e => console.log(e));
    //  }

    //  createSkillsTable(): any {
    //      this.database
    //          .executeSql(
    //              "CREATE TABLE IF NOT EXISTS skills (id INTEGER PRIMARY KEY, skills TEXT)",
    //              {}
    //          )
    //          .then(() => {
    //              this.checkSkillsExist().then(data => {
    //                  let totalSkills = data;
    //                  console.log("totalSkills", data);
    //                  if (totalSkills >= 13) this.redirectToHome();
    //                  else this.insertSkillsDatas();
    //              });
    //          })
    //          .catch(e => console.log(e));
    //  }

    //  dropSkillsTable() {
    //      this.database
    //          .executeSql("DROP TABLE skills", {})
    //          .then(() => {
    //              console.log("table skills dropped");
    //          })
    //          .catch(e => console.log(e));
    //  }
    //  checkSkillsExist(): any {
    //      return this.database
    //     .executeSql("SELECT * FROM skills", {})
    //          .then(data => {
    //              return data.rows.length;
    //          })
    //          .catch(e => console.log(e));
    //  }

    //  insertSkillsDatas() {
    //      let inserts =
    //          "INSERT INTO `skills` VALUES (1, 'PHP'),"+
    //          "(2, 'Javascript'),"+
    //          "(3, 'Java'),"+
    //          "(4, 'HTML'),"+
    //          "(5, 'Angular'),"+
    //          "(6, 'React'),"+
    //          "(7, 'Mysql'),"+
    //          "(8, 'MongoDB'),"+
    //          "(9, 'Firebase'),"+
    //          "(10, 'Windows'),"+
    //          "(11, 'IOS'),"+
    //          "(12, 'Android'),"+
    //          "(13, 'Ionic');";

    //          this.database
    //          .executeSql(inserts, {})
    //          .then(() => {
    //              this.redirectToSearch();
    //          })
    //          .catch(e => console.log(e));
    //  }

    //  redirectToSearch() {
    //      this.navCtrl.push(SearchPage);
    //  }



}
