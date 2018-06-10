import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { Http } from '@angular/http';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
  }

  skillsList=[];

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  /* public getSkillsList() {
    const url = "http://tccdirectory.1click.pf/api/skills"

    return this.http.get(url)
    .toPromise()
    .then(response => {
      skillsList = response.json()
      console.log('Liste de compétences obtenue !')
    })
    .catch(error => console.log('Erreur dans getSkillsList', error))
  } */


}
