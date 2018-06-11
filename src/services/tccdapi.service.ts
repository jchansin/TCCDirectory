import { TccdApiGlobal } from './../models/tccdapi-global.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class TccdApiService {

    private baseUrl: string = 'http://tccdirectory.1click.pf/api/';

    constructor(private http: Http) {

    }

     // Fonction pour récupérer la compétence x
     public getSkill(x): Promise<any> {
        const url = `${this.baseUrl}skill/${x}`;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as TccdApiGlobal)
        .catch(error => console.log('Erreur dans getSkill', JSON.stringify(error)))
    }
    
    // Fonction pour récupérer l'ensemble des compétences
    public getSkillsList(): Promise<any> {
        const url = `${this.baseUrl}skills`;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as TccdApiGlobal)
        .catch(error => console.log('Erreur dans getSkillsList', JSON.stringify(error)))
    }

    // Fonction pour récupérer les informations du professionnel x
    public getBusiness(x): Promise<any> {
        const url = `${this.baseUrl}business/${x}`;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as TccdApiGlobal)
        .catch(error => console.log('Erreur dans getBusiness', JSON.stringify(error)))
    }

    // Fonction pour récupérer l'ensemble des professionnels
    public getBusinessList(): Promise<any> {
        const url = `${this.baseUrl}businesses`;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as TccdApiGlobal)
        .catch(error => console.log('Erreur dans getBusinessList', JSON.stringify(error)))
    }

    // Fonction pour signaler un abus du professionnel x
    public getAbus(x): Promise<any> {
        const url = `${this.baseUrl}abus/business/${x}`;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as TccdApiGlobal)
        .catch(error => console.log('Erreur dans getAbus', JSON.stringify(error)))
    }


}