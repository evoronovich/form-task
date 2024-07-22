import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CheckUsernameModel} from '../model/check-username.model';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  checkUsername(username: string): Observable<CheckUsernameModel> {
    return this.http.post<CheckUsernameModel>(`${this.apiUrl}/checkUsername`, {
      username
    });
  }
}
