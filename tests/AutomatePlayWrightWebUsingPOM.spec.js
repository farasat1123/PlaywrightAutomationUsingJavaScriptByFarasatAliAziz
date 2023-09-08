const { chromium } = require('@playwright/test');
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const IntroPage = require('../pageObjects/IntroPage'); // Import the page object
const todoList = require(path.join(__dirname, '..', 'todoList.json'));

test('Display Todo List', async () => {
    // Read the todoList.json file
    fs.readFile('todoList.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading todoList.json:', err);
        return;
      }
  
      try {
        // Parse the JSON data into an array of items
        const todoList = JSON.parse(data);
  
        // Display the items in the console
        console.log('Todo List Items:');
        for (const item of todoList) {
          console.log(item.item);
        }
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
      }
    });
  });

test('Display Items on Intro Page', async ({ page }) => {
  const introPage = new IntroPage(page); // Create an instance of the IntroPage

  // Go to the intro page
  await introPage.gotoIntroPage();

  // Get and display the first item
  const firstItemText = await introPage.getFirstItemText();
  console.log('First Item:', firstItemText);

  // Get and display the second item
  const secondItemText = await introPage.getSecondItemText();
  console.log('Second Item:', secondItemText);

  // Get and display the third item
  const thirdItemText = await introPage.getThirdItemText();
  console.log('Third Item:', thirdItemText);

  // Get and display the fourth item
  const fourthItemText = await introPage.getFourthItemText();
  console.log('Fourth Item:', fourthItemText);
});

test('Compare Items with Todo List and Save Result', async ({ page }) => {
    const introPage = new IntroPage(page); // Create an instance of the IntroPage
  
    // Go to the intro page
    await introPage.gotoIntroPage();
  
    // Get the expected item texts using page object methods
    const expectedFirstItem = await introPage.getFirstItemText();
    const expectedSecondItem = await introPage.getSecondItemText();
    const expectedThirdItem = await introPage.getThirdItemText();
    const expectedFourthItem = await introPage.getFourthItemText();
  
    // Define itemsFromWebPage in the current scope
    const itemsFromWebPage = [
      { item: expectedFirstItem },
      { item: expectedSecondItem },
      { item: expectedThirdItem },
      { item: expectedFourthItem }
    ];
  
    // Create an object to store the results
    const comparisonResult = {
      timestamp: new Date().toISOString(),
      webPageItems: itemsFromWebPage,
      todoListItems: todoList
    };
  
    // Specify the filename for the result JSON file
    const resultFileName = 'comparisonResult.json';
  
    // Write the comparison result to a JSON file
    fs.writeFileSync(resultFileName, JSON.stringify(comparisonResult, null, 2));
  
    console.log(`Comparison result saved to ${resultFileName}`);
  });
