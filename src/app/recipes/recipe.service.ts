import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService {

    recipeChanged = new Subject<Recipe[]>

    private recipes: Recipe[] = [
        new Recipe(
            "Chicken Pizza",
            "A delicious chicken pizza with chicken, mozzarella cheese and mushroom",
            "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
            [
                new Ingredient('chicken', 1),
                new Ingredient('cheese', 1)
            ]),
        new Recipe(
            "Pepperoni Pizza",
            "A delicious chicken pizza with pepperoni, mozzarella cheese and cheddar cheese",
            "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
            [
                new Ingredient('chicken', 1),
                new Ingredient('cheese', 1),
                new Ingredient('pepperoni', 250, 'gm')
            ]),
        new Recipe(
            "Chicken Cheese Pizza",
            "A delicious chicken pizza with chicken, mozzarella cheese and mushroom",
            "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
            [
                new Ingredient('chicken', 1),
                new Ingredient('cheese', 1),
                new Ingredient('cheddar', 20, 'gm')
            ])
    ];

    constructor(private slService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }
    addIngToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
    getRecipe(id: number) {
        return this.recipes[id];
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }
}