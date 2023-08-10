import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from "./user.model";
import { Router } from '@angular/router';
export interface AuthResData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null as unknown as User);
    private tokenExpTimer: any;

    constructor(private http: HttpClient, private router: Router) { }


    signup(email: string, password: string) {
        return this.http.post<AuthResData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTPt0I_dnMWZAS4I0Ojcmg4rDl7SBzsg0}',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            })
        );
    }


    login(email: string, password: string) {
        return this.http.post<AuthResData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTPt0I_dnMWZAS4I0Ojcmg4rDl7SBzsg0',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                })
            );
    }

    logout() {
        this.user.next(null as unknown as User);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpTimer) clearTimeout(this.tokenExpTimer);
        this.tokenExpTimer = null;
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpDate: string;
        } = JSON.parse(localStorage.getItem('userData')!)
        if (!userData) return;
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expDuration = new Date(userData._tokenExpDate).getTime() - new Date().getTime();
            this.autoLogout(expDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuth(
        email: string,
        userId: string,
        token: string,
        expiresIn: number) {
        const expDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
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