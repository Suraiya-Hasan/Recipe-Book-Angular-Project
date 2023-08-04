import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('chicken', 250, 'gm'),
    new Ingredient('cheese', 50, 'gm'),
  ];
  getIngredient() {
    return this.ingredients.slice();
  }
  addIng(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingChanged.next(this.ingredients.slice())
  }
}