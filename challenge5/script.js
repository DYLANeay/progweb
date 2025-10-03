'use strict';

//number part
const numbers = Object.freeze([3, 14, 15, 92, 65, 35, 89, 79, 32, 38]);

numbers.forEach((num) => console.log(num));

const numbersDoubled = numbers.map((num) => num * 2);
console.log('tableau doublé : ' + numbersDoubled);

const oddNumbers = numbers.filter((num) => num % 2 !== 0);
console.log('tableau impair : ' + oddNumbers);

const numbersWithoutFirst = numbers.slice(1);
console.log('tableau sans le premier : ' + numbersWithoutFirst);

const numbersWithoutLast = numbers.slice(0, -1);
console.log('tableau sans le dernier : ' + numbersWithoutLast);

const numbersSum = numbers.reduce((acc, num) => acc + num, 0);
console.log('somme des nombres : ' + numbersSum);

const biggestNumber = Math.max(...numbers);
console.log('plus grand nombre : ' + biggestNumber);

const containsModulo9 = numbers.some((num) => num % 9 === 0);
console.log('contient un nombre modulo 9 : ' + containsModulo9);

const allBiggerThan0 = numbers.every((num) => num > 0);
console.log('tous les nombres sont plus grands que 0 : ' + allBiggerThan0);

const evenFirstIndexOddLastIndex = numbers.toSorted((a, b) => {
  if (a % 2 === 0 && b % 2 !== 0) return -1;
  if (a % 2 !== 0 && b % 2 === 0) return 1;
  return 0;
});
console.log(
  'nombres pairs en premier, impairs en dernier : ' + evenFirstIndexOddLastIndex
);

const increasingSortedNumbers = numbers.toSorted((a, b) => a - b);
console.log(increasingSortedNumbers);
console.log('nombres triés par ordre croissant : ' + increasingSortedNumbers);

const decreasingSortedNumbers = numbers.toSorted((a, b) => b - a);
console.log('nombres triés par ordre décroissant : ' + decreasingSortedNumbers);

console.log('-----------------------------------');

//string part
const strings = Object.freeze(['Sator', 'Arepo', 'Tenet', 'Opera', 'Rotas']);

const stringsWithR = strings.filter((str) => str.toLowerCase().includes('r'));
console.log("contient 'r' : " + stringsWithR);

const areEveryWord5Letters = strings.every((str) => str.length == 5);
console.log('tous les mots ont 5 lettres : ' + areEveryWord5Letters);

const stringsWithNewWordBeginning = ['Toriel', ...strings];
console.log(
  'nouveau tableau avec un mot au début : ' + stringsWithNewWordBeginning
);

const stringsWithNewWordEnd = [...strings, 'Sans'];
console.log('nouveau tableau avec un mot à la fin : ' + stringsWithNewWordEnd);

const stringsWithNewWordInTheMiddle =
  strings.length % 2 === 0
    ? [
        ...strings.slice(0, strings.length / 2),
        'Radar',
        ...strings.slice(strings.length / 2),
      ]
    : [
        ...strings.slice(0, Math.floor(strings.length / 2)),
        'Radar',
        ...strings.slice(Math.floor(strings.length / 2)),
      ];
console.log(
  'nouveau tableau avec un mot au milieu : ' + stringsWithNewWordInTheMiddle
);

const stringsConcatenated = strings.join(', ');
console.log('tous les mots concaténés : ' + stringsConcatenated);

const stringOrderedAlphabetically = strings.toSorted();
console.log(
  'mots triés par ordre alphabétique : ' +
    stringOrderedAlphabetically +
    ' ayant donc le premier mot : ' +
    stringOrderedAlphabetically[0]
);

const isPalindrome = (strings) => {
  const stringsJoined = strings.join('').toLowerCase();
  const lowerCased = stringsJoined.toLowerCase();
  const lowerCasedReversed = stringsJoined.toLowerCase();
  return lowerCased === lowerCasedReversed;
};
console.log('est un palindrome : ' + isPalindrome(strings));

console.log('-----------------------------------');

//object part
const circles = Object.freeze([
  { x: 20, y: 10, r: 10, color: 'red' },
  { x: 10, y: 10, r: 20, color: 'green' },
  { x: 30, y: 25, r: 15, color: 'blue' },
  { x: 10, y: 5, r: 5, color: 'red' },
]);
circles.forEach(Object.freeze);

circles.forEach((circle, index) => {
  console.log(
    `Cercle ${index}: ${JSON.stringify(circle)} a une aire de ${
      Math.PI * circle.r * circle.r
    }`
  );
});

const RedCircles = circles.filter((circle) => circle.color === 'red');
console.log('cercles rouges : ' + JSON.stringify(RedCircles));

const CentersCircles = circles.map((circle) => ({ x: circle.x, y: circle.y }));
console.log('centres des cercles (x, y) : ' + JSON.stringify(CentersCircles));

const circlesWithTranslation = circles.map((circle) => ({
  ...circle,
  x: circle.x + 10,
}));
console.log(
  'cercles avec translation de +10 sur x : ' +
    JSON.stringify(circlesWithTranslation)
);
