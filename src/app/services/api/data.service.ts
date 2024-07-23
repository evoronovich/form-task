import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CheckUsernameResponse} from '../../model/check-username.model';
import {SubmitFormsRequest, SubmitFormsResponse} from '../../model/submit-forms.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  checkUsername(username: string): Observable<CheckUsernameResponse> {
    return this.http.post<CheckUsernameResponse>(`${this.apiUrl}/checkUsername`, {
      username
    });
  }
  submitForms(formsRequest: SubmitFormsRequest): Observable<SubmitFormsResponse> {
    return this.http.post<SubmitFormsResponse>(`${this.apiUrl}/submitForm`, {
      formsRequest
    });
  }
}
