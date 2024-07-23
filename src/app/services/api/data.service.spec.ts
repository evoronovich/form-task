import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DataService} from './data.service';
import {CheckUsernameResponse} from '../../model/check-username.model';
import {SubmitFormsRequest, SubmitFormsResponse} from '../../model/submit-forms.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('checkUsername', () => {
    it('should send a POST request to check the username', () => {
      const mockResponse: CheckUsernameResponse = {isAvailable: true};
      const username = 'testuser';

      service.checkUsername(username).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('/api/checkUsername');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({username});
      req.flush(mockResponse);
    });
  });

  describe('submitForms', () => {
    it('should send a POST request to submit forms', () => {
      const formsRequest: SubmitFormsRequest = {
        forms: [{
          country: 'foo',
          username: 'foo',
          birthday: new Date()
        }]
      };
      const mockResponse: SubmitFormsResponse = {result: 'nice job'};

      service.submitForms(formsRequest).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('/api/submitForm');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({formsRequest});
      req.flush(mockResponse);
    });
  });
});
