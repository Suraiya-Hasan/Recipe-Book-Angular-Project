import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs";
import { throwError } from "rxjs";

export interface AuthResData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiredIn: string;
    localId: string;
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    API_KEY = 'AIzaSyDTPt0I_dnMWZAS4I0Ojcmg4rDl7SBzsg0';
    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
    }
    login(email: string, password: string) {
        return this.http.post<AuthResData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(catchError(this.handleError));
    }
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred.'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "This Email already exists";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "Login credentials don't match.";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Login credentials don't match.";
                break;
        }
        return throwError(errorMessage);
    }
}