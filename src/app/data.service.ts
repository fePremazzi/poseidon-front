import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TransferResponse } from "../app/models/transfer-response";
import { TransferRequest } from "../app/models/transfer-request";


import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "http://localhost:8000/schedules";

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getTransfers(): Observable<TransferResponse[]> {
    return this.httpClient.get<TransferResponse[]>(this.REST_API_SERVER)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // get a Transfer by id
  getTransferById(id: number): Observable<TransferResponse> {
    return this.httpClient.get<TransferResponse>(this.REST_API_SERVER + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // create a Transfer
  saveTransfer(transfer: TransferRequest): Observable<TransferRequest> {
    return this.httpClient.post<TransferRequest>(this.REST_API_SERVER, JSON.stringify(transfer), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // update transfer
  updateTransfer(transfer: TransferRequest): Observable<TransferRequest> {
    return this.httpClient.put<TransferRequest>(this.REST_API_SERVER + '/' + transfer.id, JSON.stringify(transfer), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  // delete Transfer by id
  deleteTransfer(id: number) {
    return this.httpClient.delete(this.REST_API_SERVER + '/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
