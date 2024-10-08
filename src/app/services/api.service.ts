import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../constants/apiConfig';
import { catchError, Observable, throwError } from 'rxjs';
import { ICards } from '../models/card.model';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(private readonly http: HttpClient) {}

	getCharacters(): Observable<ICards> {
		return this.http.get<ICards>(API_CONFIG.baseUrl).pipe(catchError(this.handleError));
	}
	private handleError(error: HttpErrorResponse) {
		let errorMessage = '';

		if (error.error instanceof ErrorEvent) {
			errorMessage = `Client-side error: ${error.error.message}`;
		} else {
			errorMessage = `Server-side error: ${error.status} - ${error.message}`;
		}

		console.error(errorMessage);

		return throwError(() => new Error('Algo salió mal. Por favor, intenta nuevamente más tarde.'));
	}
}
