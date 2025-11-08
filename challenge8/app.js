// ACCOUNT DATA
const account1 = {
  owner: 'Anna Anderson',
  username: 'aa',
  movements: [200, 450, -400.5, 3000, -650, -130, 70, 1300],
  pin: 1234,
};

const account2 = {
  owner: 'Bijan Bell',
  username: 'bb',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 1111,
};

const account3 = {
  owner: 'Celeste Carter',
  username: 'cc',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 0o0,
};

const accounts = [account1, account2, account3];

// ELEMENTS
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');

const btnColorMode = document.querySelector('.color_mode');
const root = document.documentElement;

let currentAccount;

const matchUser = (username, pin) => {
  const matchedAccount = accounts.find((acc) => username === acc.username);
  if (matchedAccount && matchedAccount.pin === pin) {
    return matchedAccount;
  } else {
    throw new Error("Couldn't match user");
  }
};

const message = (text, error) => {
  labelWelcome.textContent = text;
  error
    ? (labelWelcome.style.color = 'var(--withdrawal)')
    : (labelWelcome.style.color = 'var(--deposit)');
};

const displayAccount = (acc) => {
  if (acc) {
    containerApp.style.opacity = '100';

    labelBalance.textContent = calculateBalance(acc.movements);
    labelSumIn.textContent = calculateIncomes(acc.movements);
    labelSumOut.textContent = calculateOutcomes(acc.movements);

    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    displayTransactionsMovements(currentAccount);
  } else {
    throw new Error('No account to display');
  }
};

btnLogin.addEventListener('click', function (e) {
  try {
    e.preventDefault();
    currentAccount = matchUser(inputLoginUsername.value, +inputLoginPin.value);
    displayAccount(currentAccount);
    message(`Welcome ${currentAccount.owner}`);
  } catch (err) {
    message(err.message, true);
  }
});

btnTransfer.addEventListener('click', (e) => {
  try {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
      (acc) => acc.username === inputTransferTo.value
    );

    console.log(receiverAcc);

    if (!receiverAcc) throw new Error("Receiver account doesn't exist");
    transferMoney(currentAccount, receiverAcc, amount);
  } catch (err) {
    message(err.message, true);
  }
});

btnColorMode.addEventListener('click', () => {
  root.style.setProperty('--primary', '#121212');
  root.style.setProperty('--primary-lighter', '#1e1e1e');
  root.style.setProperty('--secondary', '#e0e0e0');
  root.style.setProperty('--deposit', '#60b347');
  root.style.setProperty('--withdrawal', '#ff4c4c');
});

const calculateIncomes = (movements) => {
  return movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
};

const calculateOutcomes = (movements) => {
  return movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0);
};

const calculateBalance = (movements) => {
  return movements.reduce((acc, mov) => acc + mov, 0);
};

const displayTransactionsMovements = (currentAccount) => {
  currentAccount.movements.forEach((mov) => {
    /* dangereux car j'insère du HTML direct */
    /* const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
     */

    /* Plus safe */
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const movementRow = document.createElement('div');
    movementRow.classList.add('movements__row');

    const movementType = document.createElement('div');
    movementType.classList.add('movements__type', `movements__type--${type}`);
    movementType.textContent = type;

    const movementValue = document.createElement('div');
    movementValue.classList.add('movements__value');
    movementValue.textContent = `${mov}€`;

    movementRow.appendChild(movementType);
    movementRow.appendChild(movementValue);

    containerMovements.prepend(movementRow);
  });
};

const transferMoney = (a1, a2, amount) => {
  const balance = calculateBalance(a1.movements);
  if (amount > 0 && balance >= amount) {
    a1.movements.push(-amount);
    a2.movements.push(amount);
    displayAccount(a1);
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
  } else {
    throw new Error('Insufficient funds or invalid amount');
  }
};
