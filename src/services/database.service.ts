import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export class DatabaseProvider {
    public db: SQLiteObject;
    public business_id: number;
    public favorite: number;
    public name: string;

    constructor(public sqlite: SQLite) {}

    // Créer ou ouvrir la DB
    public initDb() {
        this.sqlite
            .create({
                name: "tccdirectory.db",
                location: "default"
            })
            .then((db: SQLiteObject) => {
                this.db = db;
                this.createFavoritesTable();
                console.log("CREATE SUCCESS");
            })
            .catch(e => console.log("Erreur initDb", e));
    }

    // Créer la table si inexistante
    public createFavoritesTable(): any {
        this.db
            .executeSql(
                "CREATE TABLE `favorites` (`id`	INTEGER, `business_id`	INTEGER UNIQUE, `favorite`	INTEGER, `name`	TEXT, PRIMARY KEY(`id`));",
                {}
            )
            .then(data => {
                console.log(
                    "Table opérationnelle, longueur :",
                    data.rows.length
                );
            })
            .catch(e => console.log("Erreur create table", JSON.stringify(e)));
    }

    // Tester l'existence d'une entreprise en favoris
    public testFavorite(x, y): any {
        this.db
            .executeSql(
                "SELECT favorite FROM favorites WHERE business_id=" + x + ";",
                {}
            )
            .then(data => {
                console.log(JSON.stringify(data));
                let favorite = data.rows.item(0).favorite;
                if (data.rows.length == 1) {
                    this.toggleFavorite(x, y, favorite);
                } else {
                    this.insertFavorite(x, y);
                }
            })
            .catch(err =>
                console.log("Erreur dans selectFavorite", JSON.stringify(err))
            );
    }

    // Insérer une entreprise en "favoris" si inexistante dans la table
    public insertFavorite(x, y): any {
        this.db
            .executeSql(
                "INSERT INTO `favorites` (business_id, name, favorite) VALUES (" +
                    x +
                    ", " +
                    y +
                    ", 1);",
                {}
            )
            .then(() => console.log("Insertion en favoris réussie !"))
            .catch(err =>
                console.log("Erreur dans insertFavorite", JSON.stringify(err))
            );
    }

    // Changer la valeur de la propriété "favorite"
    public toggleFavorite(x, y, z): any {
        if (z == 1) {
            this.db
                .executeSql(
                    "UPDATE `favorites` SET favorite=0 WHERE business_id=" +
                        x +
                        ";",
                    {}
                )
                .then(() => console.log("Effacement de favoris réussi !"))
                .catch(err =>
                    console.log(
                        "Erreur dans insertFavorite",
                        JSON.stringify(err)
                    )
                );
        } else {
            this.db
                .executeSql(
                    "UPDATE `favorites` SET favorite=1 WHERE business_id=" +
                        x +
                        ";",
                    {}
                )
                .then(() => console.log("Réinsertion en favoris réussie !"))
                .catch(err =>
                    console.log(
                        "Erreur dans insertFavorite",
                        JSON.stringify(err)
                    )
                );
        }
    }

    // Récupérer la liste des favoris
    public getFavoritesList(): any {
        this.db
            .executeSql("SELECT * FROM favorites WHERE favorite='1';", {})
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(e =>
                console.log("Erreur dans getFavoritesList", JSON.stringify(e))
            );
    }

    /* // Effacer la table (pour tests)
    dropSkillsTable() {
        this.db
            .executeSql("DROP TABLE favorites", {})
            .then(() => {
                console.log("table favorites dropped");
            })
            .catch(e => console.log(e));
    } */
}
