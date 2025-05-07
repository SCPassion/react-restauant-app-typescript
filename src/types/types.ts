type Ingredient = {
  ingredients: string[] // Corrected type for ingredients
}

export type MenuItem = {
  id: number
  name: string
  emoji: string
  price: number
  ingredients: Ingredient
}
