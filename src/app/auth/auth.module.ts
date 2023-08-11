import { NgModule } from "@angular/core";
import { AlertComponent } from "../shared/alert/alert.component";
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner.component";
import { AuthComponent } from "./auth.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


const routes: Routes = [
    { path: 'auth', component: AuthComponent }
]

@NgModule({
    declarations: [
        AuthComponent,
        LoadingSpinnerComponent,
        AlertComponent,
    ],
    imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
    exports: [RouterModule]
})
export class AuthModule { }