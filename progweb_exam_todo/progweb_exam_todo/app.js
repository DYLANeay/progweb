'use strict';

const inputText = document.querySelector('#input-todo');
const divCategory = document.querySelector('#category-container');
const ulList = document.querySelector('#list');

// If click on enter key
inputText.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const newTodo = document.createElement('li');
    newTodo.textContent = inputText.value;
    const selectedCategory = document.querySelector('[data-selected="true"]');
    newTodo.dataset.category = selectedCategory
      ? selectedCategory.dataset.category
      : '';
    newTodo.dataset.done = 'false';
    const deleteDiv = document.createElement('div');
    deleteDiv.classList.add('button-done');
    deleteDiv.textContent = '❌';
    newTodo.append(deleteDiv);
    ulList.prepend(newTodo);
    inputText.value = '';
  }
});

divCategory.addEventListener('click', (e) => {
  if (e.target.dataset.selected === 'false') {
    const otherCategories = document.querySelectorAll('.category');
    otherCategories.forEach((category) => {
      category.dataset.selected = 'false';
    });
    e.target.dataset.selected = 'true';
  }
});

ulList.addEventListener('click', (e) => {
  console.dir(e.target);
  if (e.target.dataset.done === 'false') {
    e.target.dataset.done = 'true';
    return;
  } else if (e.target.dataset.done === 'true') {
    e.target.dataset.done = 'false';
    e.target.style.textDecoration = 'none';
    return;
  }

  if (e.target.classList.contains('button-done')) {
    e.target.parentElement.remove();
  }
});
