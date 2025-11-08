'use strict';

const inputText = document.querySelector('input[name="text"]');
const outputTextArea = document.querySelector('textarea.output');
/* console.dir(inputText);
console.dir(outputTextArea); */

/* 1. Interaction entre input et output */
inputText.addEventListener('input', () => {
  const defaultPlaceholder = inputText.placeholder;
  if (inputText.value === '') {
    outputTextArea.value = defaultPlaceholder;
  } else {
    outputTextArea.value = inputText.value;
  }
});

/* autre manière de faire en utilisant l'event */
/* inputText.addEventListener('input', (event) => {
  const defaultPlaceholder = inputText.placeholder;
  if (event.target.value === '') {
    outputTextArea.value = defaultPlaceholder;
  } else {
    outputTextArea.value = event.target.value;
  }
}); */

/* interaction inverse, si on change le textarea */
outputTextArea.addEventListener('input', (e) => {
  inputText.value = e.target.value;
});

/* 2. Changement de typo */
const select = document.querySelector('select[name="typeface"]');
select.addEventListener('change', (e) => {
  outputTextArea.style.fontFamily = e.target.value;
});

/* 3. Changement de taille, de graisse et d’interlignage */
const sizeInput = document.querySelector('input[name="size"]');
const weightInput = document.querySelector('input[name="weight"]');
const leadingInput = document.querySelector('input[name="leading"]');

const sizeLabel = document.querySelector('.sizelabel');
const weightLabel = document.querySelector('.weightlabel');
const leadingLabel = document.querySelector('.leadinglabel');

sizeInput.addEventListener('change', (e) => {
  outputTextArea.style.fontSize = `${e.target.value}px`;
  sizeLabel.textContent = `${e.target.value}px`;
});

weightInput.addEventListener('change', (e) => {
  outputTextArea.style.fontWeight = `${e.target.value}`;
  weightLabel.textContent = `${e.target.value}`;
});

leadingInput.addEventListener('change', (e) => {
  outputTextArea.style.lineHeight = `${e.target.value}`;
  leadingLabel.textContent = `${e.target.value}`;
});

/* 4. Texte italique */
const italicInput = document.querySelector('input[name="italic"]');
italicInput.addEventListener('change', (e) => {
  if (italicInput.checked) {
    outputTextArea.style.fontStyle = 'italic';
  } else {
    outputTextArea.style.fontStyle = 'normal';
  }
});

/* 5. Couleur de texte et de background*/
const colors = document.querySelector('.colors');
colors.addEventListener('click', (e) => {
  const colorBackground = e.target.style.backgroundColor;
  const colorText = e.target.style.color;

  outputTextArea.style.backgroundColor = colorBackground;
  outputTextArea.style.color = colorText;
});

/* 6. Sauvegarde de réglages */
const savedConfigs = [];

const saveButton = document.querySelector('.save');
saveButton.addEventListener('click', () => {
  const settings = {
    background: outputTextArea.style.backgroundColor,
    color: outputTextArea.style.color,
    italic: italicInput.checked,
    leading: outputTextArea.style.lineHeight,
    size: outputTextArea.style.fontSize,
    text: outputTextArea.value,
    typo: outputTextArea.style.fontFamily,
    weight: outputTextArea.style.fontWeight,
  };

  savedConfigs.push(settings);
  showSavedConfigs(); // Update the display after saving
});

/* 7. Création d’un élément de réglage */
const settingsContainer = document.querySelector('.settings-container');

const truncateString = (string = '', maxLength = 50) =>
  string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

const showSavedConfigs = () => {
  settingsContainer.innerHTML = '';

  savedConfigs.forEach((el) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('settings');
    newDiv.innerHTML = `${truncateString(el.text)}`;
    newDiv.style.backgroundColor = el.background;
    newDiv.style.color = el.color;
    newDiv.style.fontFamily = el.typo;
    newDiv.style.fontSize = el.size;
    newDiv.style.fontWeight = el.weight;
    newDiv.style.lineHeight = el.leading;
    newDiv.style.fontStyle = el.italic ? 'italic' : 'normal';

    newDiv.addEventListener('click', () => {
      applyConfig(el);
    });

    settingsContainer.appendChild(newDiv);
  });
};

/* 8. Appliquer les réglages */
const applyConfig = (config) => {
  outputTextArea.style.backgroundColor = config.background;
  outputTextArea.style.color = config.color;
  outputTextArea.style.fontFamily = config.typo;
  outputTextArea.style.fontSize = config.size;
  outputTextArea.style.fontWeight = config.weight;
  outputTextArea.style.lineHeight = config.leading;
  outputTextArea.style.fontStyle = config.italic ? 'italic' : 'normal';
  outputTextArea.value = config.text;

  inputText.value = config.text;
  select.value = config.typo;
  sizeInput.value = config.size;
  weightInput.value = config.weight;
  leadingInput.value = config.leading;
  italicInput.checked = config.italic;

  sizeLabel.textContent = config.size;
  weightLabel.textContent = config.weight;
  leadingLabel.textContent = config.leading;
};
