const cookBook = [{
    "type": "recipe",
    "name": "Skibidi Spaghetti",
    "requiredItems": [
      {
        "name": "Meatball",
        "quantity": 3
      },
      {
        "name": "Pasta",
        "quantity": 1
      },
      {
        "name": "Tomato",
        "quantity": 2
      }
    ]
  },
  {
    "type": "recipe",
    "name": "Meatball",
    "requiredItems": [
      {
        "name": "Beef",
        "quantity": 2
      },
      {
        "name": "Egg",
        "quantity": 1
      }
    ]
  },
  {
    "type": "recipe",
    "name": "Pasta",
    "requiredItems": [
      {
        "name": "Flour",
        "quantity": 3
      },
      {
        "name": "Egg",
        "quantity": 1
      }
    ]
  },
  {
      "type": "ingredient",
      "name": "Beef",
      "cookTime": 5
  },
  {
      "type": "ingredient",
      "name": "Egg",
      "cookTime": 3,
  },
  {
      "type": "ingredient",
      "name": "Flour",
      "cookTime": 0
  },
  {
      "type": "ingredient",
      "name": "Tomato",
      "cookTime": 2,
  }
];

var name = "Skibidi Spaghetti";
var singleIngredients = [];
var recipe = cookBook.find(e => e.name === name);

function getIngredients(recipe, cookBook, quantity) {
  
  for (var ingredient of recipe) {

    var details = cookBook.find(e => e.name === ingredient.name);
    
    if (details) {
      if (details.type === "recipe") {
        getIngredients(details.requiredItems, cookBook, ingredient.quantity);
      }
      else {
        index = singleIngredients.findIndex(e => e.name === details.name) 

        if (index !== -1) {
          singleIngredients[index].quantity += (ingredient.quantity * quantity);
        }
        else {
          details.quantity = ingredient.quantity * quantity;
          singleIngredients.push(details);
        }
      }
    }
  }
}

getIngredients(recipe.requiredItems, cookBook, 1);

var totalCookTime = 0
singleIngredients.forEach((ingredient) => {
  totalCookTime += (ingredient.cookTime * ingredient.quantity);
  delete ingredient.cookTime;
  delete ingredient.type;
})

console.log({
  "name": name,
  "cookTime": totalCookTime,
  "ingredient": singleIngredients
})
