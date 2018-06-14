import { FavoritesPage } from './../favorites/favorites';
import { Http } from '@angular/http';
import { TccdApiService } from './../../services/tccdapi.service';
import { Geolocation } from "@ionic-native/geolocation";
import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { ListPage } from '../list/list';
import { InfosPage } from './../infos/infos';

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
    mapResults = [];
    menuId: number;
    businessInfo: any;

    constructor(
        public navCtrl: NavController,
        public geolocation: Geolocation,
        public navParams: NavParams,
        public tccdApi: TccdApiService,
        public http: Http,
        public menuCtrl: MenuController
    ) {}

    ionViewDidLoad() {


        let mapOptions = {
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        this.map = new google.maps.Map(
            this.mapElement.nativeElement,
            mapOptions
        );

        this.getSearchResults();
        this.loadMap();
    }

    // Initialise la carte centrée sur la position du téléphone
    loadMap() {
        console.log('Load map');
        
        // *** Récupère la position du téléphone, centre la carte sur cette position et y ajoute un marqueur ***
        // this.geolocation.getCurrentPosition().then((position) => {
        //         let latLng = new google.maps.LatLng(
        //             position.coords.latitude,
        //             position.coords.longitude
        //         );
        //         this.map.setCenter(latLng);
        //         this.addMarker();
        //         console.log(position);
        //     })
        //     .catch((error) => {
        //         console.log('Error getting location', error);
        //       });

        let latLng = new google.maps.LatLng(
            48.8584,
            2.2945
        )
        this.map.setCenter(latLng);
        this.addMarker();
        
    }

    // Ajoute un marqueur au centre de la carte
    addMarker() {
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter(),
            title: "Vous êtes ici",
            label: "Moi"
        });

        let content = "<h4>Information!</h4>";

        this.addInfoWindow(marker, content);
    }

    // Fenêtre d'information liée au marqueur initial
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

    // Récupère les filtres de SearchPage et envoie une requête à l'API
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
                }666666666666
            }
            console.log('Développeur: ', this.results);
            console.log('Critères de recherche', this.value);
            return this.results;
        })
    }

    // Ajoute des marqueurs pour chaque résultat de la recherche
    addResultsMarker() {
        let marker, i;
        console.log(this.results);
        for (i = 0; i < this.results.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.results[i].latitude, this.results[i].longitude),
                map: this.map
            });      

            
            google.maps.event.addListener(marker, 'click', (function(marker, i, context) {
                return function() {
                  context.navCtrl.push(InfosPage, {businessId: context.results[i].id});
                }
              })(marker, i, this));

        }
    }

    // // Ajouter un toggle menu aux marqueurs
    // addMenuToggle(x, i) {
    //     console.log(this.results[i].name);
    //     this.tccdApi.getBusiness(x)
    //     .then((results) => {
    //         this.businessInfo = results;
    //         console.log('Données de addMenuToggle :', this.businessInfo)
    //         this.menuCtrl.toggle(this.businessInfo);
    //     })
    //     .catch((e) => console.log('Erreur dans addMenuToggle', (e)))
    // }


    // toggleMenu() {
    //     this.menuId = x;
    //     this.menuCtrl.toggle();
    // }

    goToListPage(){
        this.mapResults = [];
        this.navCtrl.push(ListPage, {mapResults: this.results})
    }

    goToInfosPage(){
        this.navCtrl.push(InfosPage, this.results)
    }
    goToFavoritesPage() {
        this.navCtrl.push(FavoritesPage);
    }

}
