//ex 1
function countSheep() {
  for (let i = 1; i < 26; i++) {
    console.log(i > 1 ? 'sheeps' : 'sheep');
  }
}

let age = 10;
console.log(age);

let age2 = '10';
console.log(age);

console.log(age + age2);

//ex 2
function calcSurface(rayon = 5) {
  return Math.PI * Math.pow(rayon, 2);
}

//ex 3
class Person {
  constructor(name, age, hobby) {
    this.name = name;
    this.age = age;
    this.hobby = hobby;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name}, I am ${
        this.age
      } years old and my hobbies are ${this.hobby.join(', ')}`
    );
  }
}

//ex 3 bis
function fibonacci(num = 4) {
  if (num === 1) {
    return 0;
  }

  if (num === 2) {
    return 1;
  }

  return fibonacci(num - 1) + fibonacci(num - 2);
}

countSheep();
console.log(calcSurface(4));
const p1 = new Person('Dylan', 21, ['sport', 'philosophy', 'money']);
p1.greet();
console.log(p1);
console.log(fibonacci(5));
