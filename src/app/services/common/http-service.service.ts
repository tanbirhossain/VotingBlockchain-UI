import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = 'http://localhost:5000/api/'
  privateKey = '';
  publicKey = '';
  httpHeaders = new HttpHeaders();

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {
    this.privateKey = cookieService.get('privateKey');
    this.publicKey = cookieService.get('publicKey');

    if (!this.privateKey || !this.publicKey)
      toastr.error('شناسه ی کاربری یافت نشد , مجددا وارد شوید')
    else
      this.httpHeaders = new HttpHeaders({ PrivateKey: this.privateKey, PublicKey: this.publicKey });
  }

  get<TResponse>(url: string, params: {} = {}, showMessage = false): Observable<TResponse> {

    return this.httpClient.get<TResponse>(this.baseUrl + url, {
      headers: this.httpHeaders,
      params: params,
    }).pipe<TResponse, TResponse>(

      map((data: TResponse) => {

        if (showMessage)
          this.toastr.success('درخواست با موفقیت انجام شد');

        return data;

      }), catchError<any, any>(e => this.handleError(e, showMessage))

    );

  }

  post<TResponse>(url: string, body: {} = {}, showMessage = false): Observable<TResponse> {

    return this.httpClient.post<TResponse>(this.baseUrl + url, body, {
      headers: this.httpHeaders
    }).pipe<TResponse, TResponse>(

      map((data: TResponse) => {

        if (showMessage)
          this.toastr.success('درخواست با موفقیت انجام شد');

        return data;

      }), catchError<any, any>(e => this.handleError(e, showMessage))
    );

  }

  patch<TResponse>(url: string, body: {} = {}, showMessage = false) {

    return this.httpClient.patch<TResponse>(this.baseUrl + url, body, {
      headers: this.httpHeaders
    }).pipe<TResponse, TResponse>(

      map((data: TResponse) => {

        if (showMessage)
          this.toastr.success('درخواست با موفقیت انجام شد');

        return data;

      }), catchError<any, any>(e => this.handleError(e, showMessage))
    );

  }

  delete<TResponse>(url: string, params: {} = {}, showMessage = false) {

    return this.httpClient.delete<TResponse>(this.baseUrl + url, {
      headers: this.httpHeaders,
      params: params
    }).pipe<TResponse, TResponse>(

      map((data: TResponse) => {

        if (showMessage)
          this.toastr.success('درخواست با موفقیت انجام شد');

        return data;

      }), catchError<any, any>(e => this.handleError(e, showMessage))
    );

  }

  handleError(error, showMessage: boolean) {

    if (error && error.error && error.error.ShowError) {

      this.toastr.error(error.error.Message);

      return null;

    }

    if (showMessage)
      this.toastr.error('خطایی در سیستم رخ داد');
  }

}
