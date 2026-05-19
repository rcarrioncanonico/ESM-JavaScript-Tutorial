let user = {name: 'John',
    surname: 'Smith'};

user.name = 'Pete';

console.log(user.surname);

delete user.name;


function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

// so we create a function by writing function keyword, then the name of the function, then parentheses and curly braces.
// The obj is the parameter of the function. It is a variable that will receive the value of the argument when the function is called
//


let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}

function sumSalaries (salaries) {
    let sum = 0
    for (let key in salaries) {
        sum += salaries[key]  
    }
    return sum
}
console.log(sum)


// f

let obj = {
  width: 200,
  height: 300,
  title: "My menu"}

function multiplyNumeric(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'number'){
            obj[key] = obj[key] * 2 // or obj[key] *= 2
        }
    }
}
