# Option B: Recipe Finder Implementation Plan

Note. This project is significanly harder than the stock application and is recommended for students who are feeling very comfortable with the material or who have previous experience.

## Base Features Only - Required Features from Rubric

This plan focuses on implementing the MINIMUM required features to pass. Build features one at a time and test each before moving to the next.

## Remember

**If you can't solve the harder problem, solve the easier problem.**

Start with the absolute basics and add features one at a time. Each feature should be fully working before moving to the next.

Try to commit as you go, this will make it easier to roll back code if you have issues.

---

## Step 1: REQUIRED - Create Your Project Files

**RUBRIC REQUIREMENT:** Separate HTML, CSS, and JS files

Create three files in your project folder:

- `index.html` - The structure of your page
- `styles.css` - All styling
- `app.js` - All JavaScript functionality

---

## Step 2: OPTIONAL - Plan Your Layout

**BEST PRACTICE (Not a rubric requirement, but highly recommended)**

Before coding, sketch out or wireframe your app layout using Figma, Excalidraw, or paper.

**Note:** The rubric only requires the final app to be responsive - it doesn't require planning. However, planning will make building much easier!

**Required Sections to Include:**

1. Header with app title
2. Search section with 3 search options (ingredients, cuisine, dietary)
3. Recipe results grid (hidden initially)
4. Recipe detail modal (popup showing full recipe)
5. Favorites section showing saved recipes

**Keep it simple!** You can always add more styling later. You don't need fancy tabs - simple buttons or sections work fine.

---

## Step 3: REQUIRED - Build the HTML Structure (Static First)

**RUBRIC REQUIREMENT:** Dynamic content display structure

Create the basic HTML skeleton WITHOUT any functionality:

**What to include:**

```
- Header with title "Recipe Finder"
- Three search sections (or three simple buttons):
  1. Search by Ingredients (with input field)
  2. Search by Cuisine (with buttons for different cuisines)
  3. Search by Dietary (with buttons for dietary restrictions)
- Empty div for recipe results (will be filled with JavaScript)
- Empty div for favorites (will be filled with JavaScript)
- Modal popup for recipe details (hidden initially)
```

**Test:** Open `index.html` in your browser. You should see all sections, but nothing works yet.

---

## Step 4: REQUIRED - Style Your App with CSS

**RUBRIC REQUIREMENT:** Responsive design for different screen sizes

Now make it look professional:

**Required CSS:**

- Layout using Flexbox or CSS Grid for recipe cards
- Consistent spacing (use multiples of 8px)
- High contrast colors for readability
- Styled buttons with hover effects
- Card-style containers for recipes
- Modal overlay styling (background + centered modal box)
- Responsive design (works on mobile and desktop)

**Note:** You don't need fancy tab animations - simple show/hide sections is fine!

**Test:** Resize your browser window. Everything should look good at different sizes.

---

## Step 5: REQUIRED - Find and Test Your API

**RUBRIC REQUIREMENT:** Successfully connects to public API using Fetch API

**CRITICAL STEP:** You need a working API before coding JavaScript.

**Recommended API:** Spoonacular (free tier available)

1. Go to https://spoonacular.com/food-api
2. Sign up for a FREE API key
3. Read the documentation for these endpoints:
   - "Search Recipes" - for general search
   - "Search by Ingredients" - for ingredient-based search
   - "Get Recipe Information" - for detailed recipe data
4. Test your API using Postman or your browser

**Test this URL in your browser and POSTMAN (replace YOUR_API_KEY):**

```
https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=YOUR_API_KEY
```

**You should see JSON data with recipe results.**

**Alternative APIs if Spoonacular doesn't work:**

- Edamam Recipe API (edamam.com)

**IMPORTANT:** Never commit your API key to GitHub. Use a separate config file.

---

## Step 6: OPTIONAL - Organize Your Search Sections

**THIS STEP IS OPTIONAL** - You can skip this and show all search sections at once!

**SIMPLIFIED APPROACH:** You don't need complex tabs! Just have all three search options visible or use simple show/hide.

**Option 1 - All visible (EASIEST):**

- Show all three search sections on the page at once
- Skip this step entirely

**Option 2 - Simple toggle buttons:**

1. Create 3 buttons: "Ingredients", "Cuisine", "Dietary"
2. Each button shows/hides its matching search section
3. Use simple CSS display: none / display: block

**Test:** If using buttons, click each one to show the right search section.

---

## Step 7: REQUIRED - Implement Recipe Search by Ingredients

**RUBRIC REQUIREMENT:** Recipe search by ingredients

**What to code:**

1. Get reference to ingredients input field and search button
2. Add click event listener to search button
3. Create async function that:
   - Gets ingredient list from input (comma-separated)
   - Validates it's not empty
   - Calls the API with ingredients parameter
   - Handles errors with try/catch
   - Logs results to console

**Test:** Enter "chicken, rice, tomato" and search. You should see recipe results in console.

---

## Step 8: REQUIRED - Display Recipe Results as Cards

**RUBRIC REQUIREMENT:** Dynamic content display with search functionality

**What to code:**

1. Create function to display recipe cards
2. Loop through recipe results
3. For each recipe, create a card with:
   - Recipe title
   - Basic info (prep time, servings)
4. Add all cards to the results section
5. Show the results section

**OPTIONAL:** Add recipe images (images are a BONUS feature in the rubric)

**Test:** Search for recipes. Cards should appear on the page in a grid layout.

---

## Step 9: REQUIRED - Implement Search by Cuisine Type

**RUBRIC REQUIREMENT:** Recipe search by cuisine type

**What to code:**

1. Create buttons or dropdown for different cuisines:
   - Italian
   - Mexican
   - Asian
   - American
   - Mediterranean
2. Add click event to each cuisine option
3. Call API with cuisine parameter
4. Display results using the same card display function

**Test:** Click "Italian" cuisine. Italian recipes should appear.

---

## Step 10: REQUIRED - Implement Search by Dietary Restrictions

**RUBRIC REQUIREMENT:** Recipe search by dietary restrictions

**What to code:**

1. Create buttons or checkboxes for dietary options:
   - Vegetarian
   - Vegan
   - Gluten-free
   - Dairy-free
2. Add click event to each option
3. Call API with diet parameter
4. Display results

**Test:** Click "Vegan". Only vegan recipes should appear.

---

## Step 11: OPTIONAL - Show Loading State

**RUBRIC BONUS FEATURE:** Loading states - Implements loading indicators during API operations

**Note:** This is listed under "Could Have (Bonus Points)" in the rubric, NOT required for passing. However, it greatly improves user experience!

**What to code:**

1. Create a loading spinner element in HTML (hidden initially)
2. Create functions to show and hide the loading indicator
3. Show loading BEFORE API call
4. Hide loading AFTER data is received or error occurs

**Test:** Search for recipes. You should see a loading spinner while waiting for results.

---

## Step 11: REQUIRED - Add Error Handling

**RUBRIC REQUIREMENT:** Error handling - Network error management with user-friendly messaging

**What to code:**

1. Create an error display element in HTML
2. Add try/catch blocks to all API calls
3. Check if response.ok before processing data
4. Display helpful error messages to users:
   - "No recipes found. Try different ingredients."
   - "Network error. Check your connection."
   - "API error. Try again later."

**Test:**

- Search for "xyz123" - should show "no recipes found"
- Turn off WiFi and search - should show network error

---

## Step 12: REQUIRED - Fetch and Display Recipe Details

**RUBRIC REQUIREMENT:** Detailed recipe view - Shows ingredients, instructions, prep/cook time, servings

**What to code:**

1. Add click event to each recipe card
2. When card is clicked:
   - Get the recipe ID
   - Fetch detailed recipe data from API
   - Open a modal/popup
   - Display full recipe details:
     - Ingredients list
     - Cooking instructions
     - Prep time and cook time
     - Number of servings

**Test:** Click a recipe card. A modal should open with full recipe details.

---

## Step 13: REQUIRED - Display Nutritional Information

**RUBRIC REQUIREMENT:** Nutritional information - Display calorie count and basic nutritional data

**What to code:**

1. Fetch nutrition data from API (part of recipe details)
2. Display in recipe detail modal:
   - Calories per serving
   - Protein
   - Carbs
   - Fat
3. Format numbers nicely

**Test:** Open recipe details. Nutritional info should be clearly displayed.

---

## Step 14: REQUIRED - Implement Favorites System

**RUBRIC REQUIREMENT:** Favorites system - Save favorite recipes to localStorage

**What to code:**

1. Add "Add to Favorites" button in recipe detail modal
2. Create favorites array in localStorage
3. When button clicked:
   - Save recipe data to favorites array
   - Update localStorage
   - Show success message
4. Prevent adding duplicate favorites

**Test:**

- Add 3 recipes to favorites
- Refresh the page
- Favorites should persist

---

## Step 15: REQUIRED - Display Favorites List

**RUBRIC REQUIREMENT:** Data persistence - Load and display favorites from localStorage

**What to code:**

1. Load favorites from localStorage when page loads
2. Display all favorite recipes in favorites section
3. Each favorite should show:
   - Recipe title
   - Quick info
   - Remove button

**OPTIONAL:** Display recipe images (images are a BONUS feature in the rubric)

**Test:** Favorites section should show all saved recipes.

---

## Step 16: REQUIRED - Add Remove from Favorites

**RUBRIC REQUIREMENT:** Data persistence - Manage localStorage data

**What to code:**

1. Add remove button to each favorite recipe
2. Create function to remove recipe from favorites array
3. Update localStorage
4. Re-render favorites list

**Test:** Remove a recipe from favorites. It should disappear and stay removed after refresh.

---

## Step 17: REQUIRED - Close Modal Functionality

**RUBRIC REQUIREMENT:** Interactive elements and user experience

**What to code:**

1. Add close button (X) to modal header
2. Add click event to close button to hide the modal

**Optional enhancements (if you want):**

- Close modal when clicking outside modal content
- Close modal when pressing Escape key

**Test:** Click X button - modal closes

---

## Step 18: REQUIRED - Make It Responsive

**RUBRIC REQUIREMENT:** Responsive design - Interface works properly on different screen sizes

**What is actually required:**

1. **Mobile responsive** - App works on phones, tablets, and desktops
2. **Basic readability** - Text is legible, buttons are clickable
3. **Layout doesn't break** - Content displays properly at different widths

**Test:** Resize your browser window from phone size to desktop. Everything should still work and be readable.

---

## Step 19: OPTIONAL - Add Professional Polish

**BEST PRACTICE (Not required by rubric, but makes your app look better)**

**Optional styling enhancements:**

1. Consistent spacing and alignment
2. Clear visual hierarchy
3. Smooth transitions for modal open/close
4. Recipe card hover effects
5. Icons for buttons
6. Proper image sizing and aspect ratios (if you added images)

**Test:** Show it to a friend. Can they use it without explanation?

---

## Step 20: REQUIRED - Test All Required Features

**VALIDATION CHECKPOINT:** Ensure you've met all rubric requirements before submission

Go through the rubric and check off each requirement:

**Files:**

- [ ] Separate HTML, CSS, and JS files

**Security:**

- [ ] API key not in code

**API Integration:**

- [ ] Successfully connects to recipe API
- [ ] Uses fetch with async/await or .then()
- [ ] Handles errors with try/catch

**Recipe Search:**

- [ ] Search by ingredients
- [ ] Search by cuisine type
- [ ] Search by dietary restrictions

**Recipe Details:**

- [ ] Shows ingredients list
- [ ] Shows cooking instructions
- [ ] Shows prep time and cook time
- [ ] Shows number of servings

**Nutritional Info:**

- [ ] Displays calorie count
- [ ] Shows basic nutritional data

**Favorites:**

- [ ] Can save recipes to favorites
- [ ] Favorites persist in localStorage
- [ ] Can remove from favorites

**UI:**

- [ ] Dynamic content display
- [ ] Loading indicator during API calls
- [ ] Error messages shown to user
- [ ] Responsive design

---

## Common Problems and Solutions

### Problem: API returns "Invalid API Key"

**Solution:**

- Double-check you copied the API key correctly
- Make sure there are no extra spaces
- Verify the API key is active on Spoonacular dashboard

### Problem: API returns "Rate limit exceeded"

**Solution:**

- Free tier has limited requests per day
- Keep track of how many searches you're doing
- Consider implementing request caching

### Problem: No recipes found

**Solution:**

- Try simpler search terms
- Check that you're using the correct API endpoint
- Verify the parameters in your API request

### Problem: Images not loading

**Solution:**

- Check if image URLs are valid in API response
- Some recipes don't have images - add fallback image
- Use placeholder image when recipe.image is null

### Problem: LocalStorage not working

**Solution:**

- Check browser privacy settings
- Try opening in regular window (not private/incognito)
- Verify you're using `JSON.stringify()` when saving and `JSON.parse()` when loading

### Problem: Modal won't close

**Solution:**

- Check that event listeners are properly attached
- Verify class names match between HTML and JavaScript
- Use browser dev tools to debug click events

---

## Optional Enhancements (Bonus Points)

Only add these AFTER all required features work:

1. **Recipe Images** - Display appetizing photos for each recipe (RUBRIC BONUS)
2. **Ingredient Substitution** - Suggest alternatives for ingredients (RUBRIC BONUS)
3. **Shopping List Generator** - Generate shopping list from favorite recipes
4. **Recipe Rating** - Show user ratings from API
5. **Print Recipe** - Format recipe for printing
6. **Sort/Filter Results** - Sort by calories, time, rating, etc.
7. **Fancy Tab System** - Animated tabs instead of simple buttons
8. **Load More/Pagination** - Load recipes in batches instead of all at once
9. **Export Favorites** - Download favorites as JSON or text file
10. **Click Outside Modal to Close** - Close modal by clicking background
11. **Escape Key to Close Modal** - Close modal with Escape key

---

## Final Checklist Before Submission

- [ ] All required features implemented and tested
- [ ] No errors in browser console
- [ ] API key not committed to GitHub
- [ ] README file with setup instructions
- [ ] Code is commented and organized
- [ ] App works on mobile and desktop
- [ ] Tested with multiple search types
- [ ] Favorites persist after page refresh
- [ ] Error messages are user-friendly
- [ ] Modal opens and closes properly

---
