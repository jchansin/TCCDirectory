import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { WelcomePage } from './../pages/welcome/welcome';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { MapPage } from '../pages/map/map';
import { ListPage } from '../pages/list/list';
import { FavoritesPage } from '../pages/favorites/favorites';

import { HttpModule } from '@angular/http';
import { TccdApiService } from '../services/tccdapi.service';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    SearchPage,
    MapPage,
    ListPage,
    FavoritesPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage
    SearchPage,
    MapPage,
    ListPage,
    FavoritesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    TccdApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
