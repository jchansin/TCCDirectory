import { FavoritesPage } from './../favorites/favorites';
import { Http } from '@angular/http';
import { TccdApiService } from './../../services/tccdapi.service';
import { Geolocation } from "@ionic-native/geolocation";
import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { ListPage } from '../list/list';

declare var google;

@Component({
    selector: "map-page",
    templateUrl: "map.html"
})
export class MapPage {
    @ViewChild("map") mapElement: ElementRef;
    map: any;
    value: string;
    results = [];
    mapResults: any;
    menuId: number;


    constructor(
        public navCtrl: NavController,
        public geolocation: Geolocation,
        public navParams: NavParams,
        public tccdApi: TccdApiService,
        public http: Http,
        public menuCtrl: MenuController
    ) {}

    ionViewDidLoad() {

        this.getSearchResults();
        this.loadMap();
    }

    loadMap() {
        this.geolocation.getCurrentPosition().then(
            position => {
                let latLng = new google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                );

                let mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                this.map = new google.maps.Map(
                    this.mapElement.nativeElement,
                    mapOptions
                );
                this.addMarker();
            },
            err => {
                console.log(err);
            }
        );
    }

    addMarker() {
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });

        let content = "<h4>Information!</h4>";

        this.addInfoWindow(marker, content);
    }

    addInfoWindow(marker, content) {
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, "click", () => {
            infoWindow.open(this.map, marker);
        });
    }

    // addMarkerContact () {
    //     var marker, i;

    //     for (i = 0; i < data.length; i++) {
    //     marker = new google.maps.Marker({
    //         position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    //         map: map
    //     });

    //     google.maps.event.addListener(marker, 'click', (function(marker, i) {
    //         return function() {
    //         infowindow.setContent(locations[i][0]);
    //         infowindow.open(map, marker);
    //         }
    //     })(marker, i));
    //     }
    //     }
    // }

    getSearchResults() {
        this.value = this.navParams.get('value');
        this.results = [];
        const url = `http://tccdirectory.1click.pf/api/search`;

        return this.http.post(url, { 'skills': this.value })
        .map(res => res.json())
        .subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                if (this.results.indexOf(data[i]) == -1) {
                this.results.push(data[i]);
                }
            }
            console.log('Développeur: ', this.results);
            console.log('Critères de recherche', this.value);
            return this.results;
        })
    }

    addResultsMarker() {
        let marker, i;

        for (i = 0; i < this.results.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.results[i].latitude, this.results[i].longitude),
                map: this.map
            });

            /* let contentString = "<div>" + "<img src='" +
                this.results[i].logo + "'  style = 'display: block; margin-left: auto; margin-right: auto; width: 50%; height: 50%'/>" + '</div>' +
                "<hr/><div style = 'text-align: center'><h2>" + this.results[i].name + '</h2></div>';
            let infoWindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 256
            }); */


            google.maps.event.addListener(marker, "click", () => {
                this.toggleMenu();
                console.log(JSON.stringify(this.results[i].latitude));
            });
        }
    }

    toggleMenu() {
        //this.menuId = x;
        this.menuCtrl.toggle();
    }

    goToListPage(){
        this.navCtrl.push(ListPage, {mapResults: this.results})
    }
    goToFavoritesPage() {
        this.navCtrl.push(FavoritesPage);
    }

}
