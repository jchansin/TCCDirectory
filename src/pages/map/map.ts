import { Geolocation } from "@ionic-native/geolocation";
import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController } from "ionic-angular";

declare var google;

@Component({
    selector: "map-page",
    templateUrl: "map.html"
})
export class MapPage {
    @ViewChild("map") mapElement: ElementRef;
    map: any;

    constructor(
        public navCtrl: NavController,
        public geolocation: Geolocation
    ) {}

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
        /* console.log("loadMap ignited");
        let latLng = new google.maps.LatLng(-34.929, 138.601);

        console.log("loadMap latLng", JSON.stringify(latLng));
        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        console.log("loadMap mapOptions", JSON.stringify(mapOptions));
        this.map = new google.maps.Map(
            this.mapElement.nativeElement,
            mapOptions
        );

        console.log("loadMap map", this.map); */

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
}
