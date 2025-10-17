'use strict';

const languagePrompt = {
  question: 'What is your favorite programming language',
  options: [
    '1. JavaScript',
    '2. PHP (psycho)',
    '3. Java',
    '4. Assembly (psychoer)',
    '5. Rust',
    '6. TypeScript',
  ],
};

const coursePrompt = {
  question: 'Ce challenge est-il difficile?',
  options: ['Oui', 'Non'],
};
const createPoll = (prompt) => {
  const votes = new Map();
  prompt.options.forEach((name) => votes.set(name, 0));

  const allKeys = [...votes.keys()];

  //log the q and options on the console
  console.log(prompt.question + ' : ' + allKeys.join(', '));

  return {
    vote(optionIndex) {
      if (optionIndex - 1 >= 0 && optionIndex - 1 < prompt.options.length) {
        const optionKey = allKeys[optionIndex - 1];
        votes.set(optionKey, votes.get(optionKey) + 1);
        console.log(
          `Voted for: ${optionKey}, Actual votes: ${[...votes.entries()].join(
            ' | '
          )}`
        );
      } else {
        console.error('Invalid option index');
      }
    },
    getResults() {
      return votes;
    },
    getAllKeys() {
      return votes.keys();
    },
  };
};

const languagePoll = createPoll(languagePrompt);
languagePoll.vote(1);
languagePoll.vote(3);

const coursePoll = createPoll(coursePrompt);
coursePoll.vote(1);
coursePoll.vote(2);
coursePoll.vote(1);
coursePoll.vote(-1);

console.log('Final results:', languagePoll.getResults());
console.log('Final results:', coursePoll.getResults());
