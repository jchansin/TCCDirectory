import { NavController } from "ionic-angular";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Toast } from "@ionic-native/toast";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Geolocation } from "@ionic-native/geolocation";
import { CallNumber } from "@ionic-native/call-number";
import { SMS } from "@ionic-native/sms";
import { AndroidPermissions } from "@ionic-native/android-permissions";

import { MyApp } from "./app.component";
import { WelcomePage } from "./../pages/welcome/welcome";
import { SearchPage } from "../pages/search/search";
import { MapPage } from "../pages/map/map";
import { ListPage } from "../pages/list/list";
import { FavoritesPage } from "../pages/favorites/favorites";
import { InfosPage } from "./../pages/infos/infos";

import { HttpModule } from "@angular/http";
import { TccdApiService } from "../services/tccdapi.service";
import { DatabaseProvider } from "./../services/database.service";
import { ConnectivityProvider } from "../providers/connectivity/connectivity";
import { GoogleMapsProvider } from "../providers/google-maps/google-maps";
import { LocationsProvider } from "../providers/locations/locations";

@NgModule({
    declarations: [
        MyApp,
        WelcomePage,
        SearchPage,
        MapPage,
        ListPage,
        FavoritesPage,
        InfosPage
    ],
    imports: [HttpModule, BrowserModule, IonicModule.forRoot(MyApp)],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        WelcomePage,
        SearchPage,
        MapPage,
        ListPage,
        FavoritesPage,
        InfosPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SQLite,
        TccdApiService,
        Geolocation,
        InAppBrowser,
        CallNumber,
        SMS,
        DatabaseProvider,
        Toast,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ConnectivityProvider,
        GoogleMapsProvider,
        LocationsProvider
    ]
})
export class AppModule {}
