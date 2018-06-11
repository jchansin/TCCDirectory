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

    public getSkillsList(): Promise<any> {
        const url = `${this.baseUrl}skills`;

        return this.http.get(url)
        .toPromise()
        .then(response => {
            console.log('Liste de compétences obtenue !');
            response.json() as TccdApiGlobal;
        })
        .catch(error => console.log('Erreur dans getSkillsList', JSON.stringify(error)))
    }


    // Test requête API
    public getBusinessInfo(): Promise<any> {
        const url = `${this.baseUrl}businesses`;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as TccdApiGlobal)
        .catch(error => console.log('Erreur dans getBusinessInfo', JSON.stringify(error)))

    }


}