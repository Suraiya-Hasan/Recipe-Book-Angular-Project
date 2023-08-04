import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from '@angular/core';

export class ShoppingListService{
    ingChanged = new EventEmitter<Ingredient[]>();

    private ingredients:Ingredient[] = [
        new Ingredient('chicken',250, 'gm'),
        new Ingredient('cheese',50, 'gm'),
      ];
      getIngredient(){
        return this.ingredients.slice();
      }
      addIng(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingChanged.emit(this.ingredients.slice());
      }
      addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingChanged.emit(this.ingredients.slice())
      }
}