 
    - 1️⃣ What is the difference between var, let, and const?


var :- var is function scoped. it can be reassigned and redeclared.

let:-- let is blocked scoped,can be reassigned but cannot redeclare in same block

const:--const is block scoped. it cannot be reassigned and cant be redeclared



    - 2️⃣ What is the spread operator (...)?

ans:--The spread operator is used for expands an array or object into individual elements. it can be used for copy, merge, or pass elements as arguments.



    - 3️⃣ What is the difference between map(), filter(), and forEach()?
forEach() → loops through array, no return, for side effects

map() → transforms array, returns new array

filter() → filters array, returns new array with items that pass a condition
Use forEach for actions (logging, updating external things)

Use map to transform

Use filter to select items based on a condition


 4️⃣ What is an arrow function?

Arrow function (=>) in JavaScript is a shorter syntax for writing functions.
No function keyword needed

Implicit return if single expression

Lexical this → keeps this from the surrounding scope

Example:

Use arrow functions for short, concise functions, especially in callbacks.
    - 5️⃣ What are template literals?

ans:--Template literals in JavaScript are strings wrapped in backticks (` `) that allow interpolation and multi-line strings.

it Use ${} to embed expressions. it Can span multiple lines without \n and it is very Useful for dynamic strings.