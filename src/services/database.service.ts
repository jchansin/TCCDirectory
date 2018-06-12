import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { WelcomePage } from '../pages/welcome/welcome';

@Injectable()

export class DatabaseProvider {

    public db: SQLiteObject;
    public business_id: number;
    public favorite: number;
    public name: string;

    constructor(public sqlite: SQLite) {

    }

    // Créer ou ouvrir la DB
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

    // Créer la table si inexistante
    public createFavoritesTable(): any {
        this.db.executeSql(
            "CREATE TABLE `favorites` (`id`	INTEGER, `business_id`	INTEGER UNIQUE, `favorite`	INTEGER, `name`	TEXT, PRIMARY KEY(`id`));", {}
        )
        .then((data) => {
            console.log('Table opérationnelle, longueur :', data.rows.length)
        })
        .catch(e => console.log('Erreur create table', JSON.stringify(e)));
    }

    // Insérer une entreprise en "favoris"
    public insertFavorite(business_id, favorite, name): any {
        this.db.executeSql(
            "INSERT INTO `favorites` (business_id, favorite, name) VALUES (" + business_id + ", " + favorite + ", " + name + ");", {})
        .then(() => console.log('Insertion en favoris réussie !'))
        .catch(err => console.log('Erreur dans insertFavorite', JSON.stringify(err)))
    }


    // Tester l'existence d'une entreprise en favoris
    public selectFavorite(): any {
        this.db.executeSql(
            "SELECT * FROM favorites WHERE business_id='14';", {}
        )
        .then((data) => console.log(JSON.stringify(data)))
        .catch(err => console.log('Erreur dans selectFavorite', JSON.stringify(err)))

    }


   /*  // Effacer la table (pour tests)
    dropSkillsTable() {
        this.db
            .executeSql("DROP TABLE favorites", {})
            .then(() => {
                console.log("table favorites dropped");
            })
            .catch(e => console.log(e));
    }*/
 
}
