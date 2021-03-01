import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  transactions: [],
  incomes: 0,
  expenses: 0,
  totalBudget: null,
  currency: 'HUF',
  sortBy: 'default',
  currencies: {
    eur: 361,
    usd: 297,
    gbp: 414,
  },
};

const baseAmountCalc = (currency, amount) => {
  let amountInBaseCurrencyHUF;

  if (currency === 'HUF') {
    amountInBaseCurrencyHUF = amount;
  }

  if (currency === 'EUR') {
    amountInBaseCurrencyHUF = amount * initialState.currencies.eur;
  }

  if (currency === 'USD') {
    amountInBaseCurrencyHUF = amount * initialState.currencies.usd;
  }

  if (currency === 'GBP') {
    amountInBaseCurrencyHUF = amount * initialState.currencies.gbp;
  }

  return amountInBaseCurrencyHUF;
};

const addIncome = (state, action) => {
  const currencyInHUF = baseAmountCalc(
    action.transactions.currency,
    action.transactions.amount
  );

  const updatedTransactions = [
    ...state.transactions,
    {
      id: action.transactions.id,
      action: action.transactions.action,
      actionType: 'income',
      amount: +action.transactions.amount,
      currency: action.transactions.currency,
    },
  ];

  localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

  return updateObject(state, {
    transactions: updatedTransactions,
    incomes: state.incomes + currencyInHUF,
    totalBudget: state.totalBudget + currencyInHUF,
  });
};

const addExpense = (state, action) => {
  const currencyInHUF = baseAmountCalc(
    action.transactions.currency,
    action.transactions.amount
  );

  const updatedTransactions = [
    ...state.transactions,
    {
      id: action.transactions.id,
      action: action.transactions.action,
      actionType: 'expense',
      amount: +action.transactions.amount,
      currency: action.transactions.currency,
    },
  ];

  localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

  return updateObject(state, {
    transactions: updatedTransactions,
    expenses: state.expenses + currencyInHUF,
    totalBudget: state.totalBudget + currencyInHUF,
  });
};

const changeCurrency = (state, action) => {
  return updateObject(state, {
    currency: action.currency,
  });
};

const changeSortBy = (state, action) => {
  return updateObject(state, {
    sortBy: action.sortBy,
  });
};

const removeTransaction = (state, action) => {
  const updatedTransactions = state.transactions.filter(
    (transaction) => transaction.id !== action.id
  );

  const updatedAmount = baseAmountCalc(action.currency, action.amount);

  localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

  if (action.actionType === 'income') {
    return updateObject(state, {
      transactions: updatedTransactions,
      totalBudget: state.totalBudget - updatedAmount,
      incomes: state.incomes - updatedAmount,
    });
  } else {
    return updateObject(state, {
      transactions: updatedTransactions,
      totalBudget: state.totalBudget - updatedAmount,
      expenses: state.expenses - updatedAmount,
    });
  }
};

const initiateSetup = (state, action) => {
  let updatedIncomes = 0;
  let updatedExpenses = 0;

  if (!action.transactions || !action.transactions.length) {
    return updateObject(state, {});
  }

  const updatedTotalBudget = action.transactions
    .map((transaction) => {
      const updatedAmount = baseAmountCalc(transaction.currency, transaction.amount);
      if (updatedAmount > 0) {
        updatedIncomes = updatedIncomes + updatedAmount;
      } else {
        updatedExpenses = updatedExpenses + updatedAmount;
      }

      return updatedAmount;
    })
    .reduce((acc, curr) => (acc = acc + curr), 0);

  return updateObject(state, {
    transactions: action.transactions,
    incomes: updatedIncomes,
    expenses: updatedExpenses,
    totalBudget: updatedTotalBudget,
  });
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_INCOME) {
    return addIncome(state, action);
  }

  if (action.type === actionTypes.ADD_EXPENSE) {
    return addExpense(state, action);
  }

  if (action.type === actionTypes.CHANGE_CURRENCY) {
    return changeCurrency(state, action);
  }

  if (action.type === actionTypes.CHANGE_SORTBY) {
    return changeSortBy(state, action);
  }

  if (action.type === actionTypes.REMOVE_TRANSACTION) {
    return removeTransaction(state, action);
  }

  if (action.type === actionTypes.INITIATE_SETUP) {
    return initiateSetup(state, action);
  }

  return state;
};

export default reducer;
