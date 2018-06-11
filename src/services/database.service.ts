import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { WelcomePage } from '../pages/welcome/welcome';

@Injectable()

export class DatabaseProvider {

    public db: SQLiteObject;

    constructor(public sqlite: SQLite) {

    }

    public initDb() {
        this.sqlite.create({
            name: "tccdirectory.db",
            location: "default"
        })
        .then((db: SQLiteObject) => {
            this.db = db;
            this.createFavoritesTable();
            console.log("CREATE SUCCESS");
        })
        .catch(e => console.log('Erreur initDb', e));
    }

    public createFavoritesTable(): any {
        this.db.executeSql(
            "CREATE TABLE `favorites` (`id`	INTEGER, `business_id`	INTEGER UNIQUE, `favorite`	INTEGER, `name`	TEXT);", {}
        )
        .then((data) => {
            console.log('Table opérationnelle, longueur :', data.text)
        })
        .catch(e => console.log('Erreur create table',e));
    }

    /* dropSkillsTable() {
        this.db
            .executeSql("DROP TABLE favorites", {})
            .then(() => {
                console.log("table favorites dropped");
            })
            .catch(e => console.log(e));
    } */

}
