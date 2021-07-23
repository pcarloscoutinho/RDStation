/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */

function customerSuccessBalancing(customerSuccess, customers, customerSuccessAway) {
  availableCss = customerSuccess.filter((cs) => !customerSuccessAway.includes(cs.id));

  var relationArray = [];
  customers.forEach((customer) => {
    let diffArray = [];

    availableCss.forEach((cs) => {
      if (customer.score <= cs.score) {
        diff = Math.abs(customer.score - cs.score);

        diffArray.push({ csId: cs.id, diff: diff });
      }
    });
    diffArray.sort((firstDiff, secondDiff) => firstDiff.diff - secondDiff.diff);
    relationArray.push({ customerId: customer.id, ...diffArray[0] });
  });

  const reduced = relationArray.reduce((total, distribution) => {
    total[distribution.csId] = (total[distribution.csId] || 0) + 1;
    return total;
  }, {});

  let array = Object.entries(reduced).sort((a, b) => b[1] - a[1]);

  if (array[0][1] === array[1][1]) {
    return 0;
  }

  return parseInt(array[0][0]);
}

// export { customerSuccessBalancing };

// const css = [
//   { id: 1, score: 60 },
//   { id: 2, score: 20 }, //away
//   { id: 3, score: 95 },
//   { id: 4, score: 75 }, //away
// ];
// const customers = [
//   { id: 1, score: 90 },
//   { id: 2, score: 20 },
//   { id: 3, score: 70 },
//   { id: 4, score: 40 },
//   { id: 5, score: 60 },
//   { id: 6, score: 10 },
// ];
// const csAway = [2, 4];

// const cs = customerSuccessBalancing(css, customers, csAway);
// console.log(cs);
