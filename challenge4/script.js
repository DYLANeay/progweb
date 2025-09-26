// exercice 1
const addTwo = (base) => {
  return base + 2;
};

console.log(addTwo(2));

// exercice 2
const pluralize = (word) => {
  if (word.endsWith('s')) {
    return 'Word is already in plural';
  }

  return `${word}s`;
};

console.log(pluralize('hello'));

// exercice 3
function map(arr, fn) {
  let array = [];
  arr.forEach((element) => {
    array.push(fn(element));
  });
  return array;
}

console.log(map([1, 2, 3], addTwo));

// exercice 4
let alphabet = '';
const letters = ['a', 'b', 'c', 'd'];
forEach(letters, function (char) {
  alphabet += char;
});
console.log(alphabet);
