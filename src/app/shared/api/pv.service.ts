import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Pv } from '../models/pv';

@Injectable({
  providedIn: 'root'
})
export class PvService {

  constructor(
    private http: HttpClient
  ) {
  }

  postPv(body: any): Observable<Pv> {
    return this.http.post(`${environment.apiBase}/pv_mise_en_services`, body) as Observable<Pv>;
  }
}
