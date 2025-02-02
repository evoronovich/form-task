import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CheckUserResponseData, SubmitFormResponseData} from '../../shared/interface/responses';
import {SubmitFormsRequest} from '../../shared/model/submit-forms.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = '/api';
  private http: HttpClient = inject(HttpClient)

  checkUsername(username: string): Observable<CheckUserResponseData> {
    return this.http.post<CheckUserResponseData>(`${this.apiUrl}/checkUsername`, {
      username
    });
  }

  submitForms(formsRequest: SubmitFormsRequest): Observable<SubmitFormResponseData> {
    return this.http.post<SubmitFormResponseData>(`${this.apiUrl}/submitForm`, {
      formsRequest
    });
  }
}
