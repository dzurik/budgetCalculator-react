import * as actionTypes from './actionTypes';

export const addIncome = (action, amount, currency) => {
  return {
    type: actionTypes.ADD_INCOME,
    transactions: {
      id: Math.round(Date.now() / 1000) - 1614261200,
      action: action,
      amount: amount,
      currency: currency,
    },
  };
};

export const addExpense = (action, amount, currency) => {
  return {
    type: actionTypes.ADD_EXPENSE,
    transactions: {
      id: Math.round(Date.now() / 1000) - 1614261200,
      action: action,
      amount: amount,
      currency: currency,
    },
  };
};

export const changeCurrency = (currency) => {
  return {
    type: actionTypes.CHANGE_CURRENCY,
    currency: currency,
  };
};

export const changeSortBy = (sortBy) => {
  return {
    type: actionTypes.CHANGE_SORTBY,
    sortBy: sortBy,
  };
};

export const removeTransaction = (transactionObj) => {
  return {
    type: actionTypes.REMOVE_TRANSACTION,
    id: transactionObj.id,
    actionType: transactionObj.actionType,
    amount: transactionObj.amount,
    currency: transactionObj.currency,
  };
};

export const initiateSetup = () => {
  const transactions = JSON.parse(localStorage.getItem('transactions'));
  return {
    type: actionTypes.INITIATE_SETUP,
    transactions: transactions,
  };
};
