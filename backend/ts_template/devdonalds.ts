import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: any = [];

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {

  if (recipeName.length == 0) return null;
  
  recipeName = recipeName.replace(/[-_]/g, " ");
  recipeName = recipeName.replace(/[^a-zA-Z\s]/g, "");
  recipeName = recipeName.toLowerCase();
  recipeName = recipeName.replace(/\b[a-z]/g, (match) => match.toUpperCase());
  recipeName = recipeName.trim();
  recipeName = recipeName.replace(/\s{2,}/g, " ");

  return recipeName;
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  // TODO: implement me
  var entry = req.body;
  
  const isInvalidType = entry.type !== "ingredient" && entry.type !== "recipe";
  const isInvalidCookTime = entry.type === "ingredient" && entry.cookTime < 0;
  const isDuplicate = cookbook.some(e => e.name === entry.name); 
  
  if (isInvalidType || isInvalidCookTime || isDuplicate) {
    return res.status(400).send();
  }

  if (entry.type === "recipe" && entry.requiredItems) {

    const subItemNames = entry.requiredItems.map((item:any) => item.name)
    const hasDuplicateSubItems = new Set(subItemNames).size !== subItemNames.length;

    if (hasDuplicateSubItems) {
      return res.status(400).send();
    }
  }

  cookbook.push(entry);
  return res.status(200).send({}); 

});

function getIngredients(recipe, cookBook, singleIngredients, quantity) {
  
  for (var ingredient of recipe) {

    var details = cookBook.find(e => e.name === ingredient.name);
    
    if (details) {
      if (details.type === "recipe") {
        getIngredients(details.requiredItems, cookBook, singleIngredients, ingredient.quantity);
      }
      else {
        var index = singleIngredients.findIndex(e => e.name === details.name) 

        if (index !== -1) {
          singleIngredients[index].quantity += (ingredient.quantity * quantity);
        }
        else {
          singleIngredients.push({
            ...details,
            quantity: ingredient.quantity * quantity
          })
        }
      }
    }
    else {
      return false;
    }
  }

  return true;
}
// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Request) => {
  
  var recipeName = req.query.name as string;
  
  // Determine if name exists and is a recipe (two birds one stone)
  const recipeExists = cookbook.filter(entry => entry.name === recipeName && entry.type === "recipe").length !== 0;
  
  if (!recipeExists) {
    return res.status(400).send();
  }
  
  var singleIngredients = [];
  var recipe = cookbook.find(e => e.name === recipeName);
  var ingredientsExists = getIngredients(recipe.requiredItems, cookbook, singleIngredients, 1);

  if (!ingredientsExists) {
    res.status(400).send();
  }

  var totalCookTime = 0
  singleIngredients.forEach((ingredient) => {
    totalCookTime += (ingredient.cookTime * ingredient.quantity);
    delete ingredient.cookTime;
    delete ingredient.type;
  })

  res.status(200).send({
    "name": recipeName,
    "cookTime": totalCookTime,
    "ingredient": singleIngredients
  })
});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
