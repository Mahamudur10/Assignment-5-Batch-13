1. What is the difference between var, let, and const?
In JavaScript we use var, let, and const to declare variables. var is the old way of declaring variables. It is function scoped and can be redeclared. let is block scoped and we can update its value but we cannot redeclare it in the same scope. const is also block scoped but its value cannot be changed after declaration.

2. What is the spread operator (...)?
The spread operator (...) is used to expand or copy elements of an array or object.
Example: const arr1 = [1, 2, 3];    const arr2 = [...arr1, 4, 5];

3. What is the difference between map(), filter(), and forEach()?
These are array methods in JavaScript. map() creates a new array by modifying every element. filter() creates a new array but only with elements that match a condition. forEach() simply loops through the array and performs an action. It does not return a new array.

4. What is an arrow function?
An arrow function is a shorter and cleaner way to write functions in JavaScript.
Example: const add = (a, b) => {
 	return a + b;
};

5. What are template literals?
Template literals are used to write strings more easily using backticks (`) and ${} to insert variables. Example:   let name = "Mahamudur"; 
console.log(`Hello ${name}`);
