import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private LOCAL_URL = 'http://localhost:8000';
  private MOCK_URL = 'https://run.mocky.io/v3/c5aebe5a-9fc9-4958-9450-442fa364ad2e';
  private CLOUD_URL = 'http://35.240.158.142:8000';

  constructor(
    private router: Router, private http: HttpClient
  ) { }

  public getContacts(): Observable<any> {
    return this.http.get(this.CLOUD_URL + '/api/contact');
  }

  public delete(id: any): Observable<any> {
    return this.http.delete(this.CLOUD_URL + '/api/contact/' + id);
  }

  public getById(id: any): Observable<any> {
    return this.http.get(this.CLOUD_URL + '/api/contact/' + id);
  }

  public add(formValues: any): Observable<any> {
    return this.http.post(this.CLOUD_URL + '/api/contact', formValues);
  }
}
