import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SubmitFormsRequest} from '../../model/submit-forms.model';
import {CheckUserResponseData, SubmitFormResponseData} from '../../shared/interface/responses';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = '/api';

  constructor(private http: HttpClient) {
  }

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
