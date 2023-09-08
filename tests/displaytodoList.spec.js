const { test } = require('@playwright/test');
const fs = require('fs');

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
