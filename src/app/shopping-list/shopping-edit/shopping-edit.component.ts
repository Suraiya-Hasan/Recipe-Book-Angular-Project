import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput',{static:false}) nameInputRef!: ElementRef;
  @ViewChild('amountInput',{static:false}) amountInputRef!: ElementRef;
  @ViewChild('unitInput',{static:false}) unitInputRef!: ElementRef;

  constructor(private slService: ShoppingListService){}
  
  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const ingUnit = this.unitInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount, ingUnit);
    this.slService.addIng(newIngredient);
  }

}
