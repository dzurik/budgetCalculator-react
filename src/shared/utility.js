export const updateObject = (prevState, updatedProperties) => {
  return {
    ...prevState,
    ...updatedProperties,
  };
};

export const currencyHelper = (currency, incomeCurrency, amount, currencies) => {
  let number;
  let baseAmountInHUF;

  if (incomeCurrency === 'HUF') {
    baseAmountInHUF = amount;
  }

  if (incomeCurrency === 'EUR') {
    baseAmountInHUF = amount * currencies.eur;
  }

  if (incomeCurrency === 'USD') {
    baseAmountInHUF = amount * currencies.usd;
  }

  if (incomeCurrency === 'GBP') {
    baseAmountInHUF = amount * currencies.gbp;
  }

  if (currency === 'HUF') {
    number = new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
    }).format(baseAmountInHUF);
  }

  if (currency === 'EUR') {
    number = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(baseAmountInHUF / currencies.eur);
  }

  if (currency === 'USD') {
    number = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(baseAmountInHUF / currencies.usd);
  }

  if (currency === 'GBP') {
    number = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(baseAmountInHUF / currencies.gbp);
  }

  return number;
};

export const sortByFunction = (sortBy, transactionArray, transactionType) => {
  let sortedTransaction = [];

  if (sortBy === 'default') {
    sortedTransaction = transactionArray;
  }

  if (sortBy === 'smallest' && transactionType === 'income') {
    sortedTransaction = sortByHelper(
      transactionArray,
      'amount',
      'smaller',
      transactionType
    );
  }

  if (sortBy === 'smallest' && transactionType === 'expense') {
    sortedTransaction = sortByHelper(
      transactionArray,
      'amount',
      'bigger',
      transactionType
    );
  }

  if (sortBy === 'largest' && transactionType === 'income') {
    sortedTransaction = sortByHelper(
      transactionArray,
      'amount',
      'bigger',
      transactionType
    );
  }

  if (sortBy === 'largest' && transactionType === 'expense') {
    sortedTransaction = sortByHelper(
      transactionArray,
      'amount',
      'smaller',
      transactionType
    );
  }

  if (sortBy === 'ascending') {
    sortedTransaction = sortByHelper(
      transactionArray,
      'action',
      'smaller',
      transactionType
    );
  }

  if (sortBy === 'descending') {
    sortedTransaction = sortByHelper(
      transactionArray,
      'action',
      'bigger',
      transactionType
    );
  }

  return sortedTransaction;
};

const sortByHelper = (transactionArray, value, expression) => {
  let sortedTransaction = [];

  sortedTransaction = transactionArray
    .sort((a, b) => {
      if (expression === 'bigger') {
        return a[value] < b[value] ? 1 : -1;
      } else {
        return a[value] > b[value] ? 1 : -1;
      }
    })
    .map((transactionType, index) => {
      return {
        id: transactionType.id,
        action: transactionType.action,
        amount: transactionType.amount,
        currency: transactionType.currency,
      };
    });

  return sortedTransaction;
};
