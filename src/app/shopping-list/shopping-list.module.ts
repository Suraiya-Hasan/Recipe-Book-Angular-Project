import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ShoppingListRoutingModule
    ]
})
export class ShoppingListModule {

}