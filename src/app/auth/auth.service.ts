import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiredIn: string,
    localId: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTPt0I_dnMWZAS4I0Ojcmg4rDl7SBzsg0', { email: email, password: password, returnSecureToken: true })
    }
}