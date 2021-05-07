import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  static userToken: any;
  private LOCAL_URL = 'http://localhost:8000';
  private MOCK_URL = 'https://run.mocky.io/v3/c5aebe5a-9fc9-4958-9450-442fa364ad2e';
  private CLOUD_URL = 'http://35.240.158.142:8000';

  constructor(
    private router: Router, private http: HttpClient
  ) { }

  public login(loginValue: any): Observable<any> {
    return this.http.post(this.CLOUD_URL + '/api/auth', loginValue);
  }

  public register(formValues: any): Observable<any> {
    return this.http.post(this.CLOUD_URL + '/api/register', formValues);
  }

  public update(id: any, formValues: any): Observable<any> {
    return this.http.put(this.CLOUD_URL + '/api/' + id, formValues);
  }

  public delete(id: any): Observable<any> {
    return this.http.delete(this.CLOUD_URL + '/api/' + id);
  }

  public getAccounts(): Observable<any> {
    return this.http.get(this.CLOUD_URL + '/api');
  }

  public getById(id: any): Observable<any> {
    return this.http.get(this.CLOUD_URL + '/api/' + id);
  }

  public setUserToken(data: any): void {
    sessionStorage.setItem('userToken', JSON.stringify(data));
    console.log(JSON.parse(sessionStorage.getItem('userToken')));
    AccountService.userToken = data.jwtToken;
  }

  public getUserToken(): any {
    if (sessionStorage.getItem('userToken') !== undefined) {
      AccountService.userToken = JSON.parse(sessionStorage.getItem('userToken'));
      return AccountService.userToken.jwtToken;
    } else {
      return null;
    }
  }

  public logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  public isLoggedIn(): boolean {
    if (sessionStorage.getItem('userDetails') !== null) {
      return true;
    }
    return false;
  }
}
