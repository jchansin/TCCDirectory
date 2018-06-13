import { CallNumber } from '@ionic-native/call-number';
import { FavoritesPage } from './../favorites/favorites';
import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

    results = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private callSvc: CallNumber, private sms: SMS) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    this.addListResults();
  }

  goToSearchPage(){
    //   console.log('ionViewDidLoad MapPage');
      this.navCtrl.setRoot(SearchPage);
  }

  goToFavoritesPage() {
      this.navCtrl.setRoot(FavoritesPage);
  }

  addListResults() {
    this.results = [];
    this.results = this.navParams.get('mapResults');
    console.log(JSON.stringify(this.results));

}

    // async CallNumber():Promise<any>{
    //     try {
    //         await this.call.callNumber(String(this.results), true);
    //     }
    //     catch(e){
    //         console.log(e);
    //     }
    // }

    CallNumber(){
        this.callSvc.callNumber('87213406', true).then(() => {
            console.log('call worked');
        }).catch((err) => {
            alert(JSON.stringify(err))
        })
    }

    SendSMS(){
        var options : {
            replaceLineBreaks: false,
            android: {
                intent: 'INTENT'
            }
        }
        this.sms.send('87213406', 'Message', options).then(() => {
            console.log('sms worked');
        }).catch((err) => {
            alert(JSON.stringify(err))
        })
    }


}
