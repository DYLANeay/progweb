const register = [
  {
    tableID: 0,
    orders: [
      {
        item: 'coffee',
        qty: 3,
        price: 3.5,
      },
      {
        item: 'salad',
        qty: 3,
        price: 8,
      },
      {
        item: 'steak',
        qty: 3,
        price: 28,
      },
      {
        item: 'ice cream',
        qty: 3,
        price: 5,
      },
    ],
  },
  {
    tableID: 1,
    orders: [
      {
        item: 'coffee',
        qty: 2,
        price: 3.5,
      },
      {
        item: 'salad',
        qty: 2,
        price: 8,
      },
      {
        item: 'steak',
        qty: 2,
        price: 28,
      },
      {
        item: 'ice cream',
        qty: 2,
        price: 5,
      },
    ],
  },
];

const TVA = 0.081;
const TIP = 0.1;

const getSubtotal = (orders) => {
  return orders.reduce(
    (accumulator, order) => accumulator + order.qty * order.price,
    0
  );
};

const calcPercentage = (amount, TVA, TIP) => {
  const tax = amount * TVA;
  const tip = amount * TIP;
  return (fees = {
    tax,
    tip,
  });
};

const createBill = (register) => {
  // on retourne un tableau contenant les différents objets crées par map
  return register.map((table) => {
    const subtotal = getSubtotal(table.orders);
    const tax = calcPercentage(subtotal, TVA, TIP).tax;
    const tip = calcPercentage(subtotal, TVA, TIP).tip;
    const total = subtotal + tax + tip;

    //à chaque map, on retourne un objet
    return {
      tableID: table.tableID,
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      tip: tip.toFixed(2),
      total: `CHF : ${total.toFixed(2)}`,
    };
  });
};

const splitBill = (billId, num) => {
  const bill = createBill(register).find((bill) => bill.tableID === billId);
  if (!bill) {
    console.error('Bill not found');
    return null;
  }

  return (parseFloat(bill.total.slice(6)) / num).toFixed(2);
};

console.log(createBill(register));
console.log(`Chaque personne devra payer ${splitBill(1, 4)} CHF`);
