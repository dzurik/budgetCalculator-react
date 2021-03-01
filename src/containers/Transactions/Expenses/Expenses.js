import classes from './Expenses.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { sortByFunction } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

import Expense from './Expense/Expense';

const Expenses = () => {
  const transactions = useSelector((state) => {
    return state.transactions;
  });

  const sortBy = useSelector((state) => {
    return state.sortBy;
  });

  const dispatch = useDispatch();

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    setExpenses(transactions.filter((expense) => expense.actionType === 'expense'));
  }, [transactions]);

  const onRemoveTransaction = (expenseTransaction) =>
    dispatch(actions.removeTransaction(expenseTransaction));

  return (
    <div className={classes.Expenses}>
      <h2>Expenses:</h2>
      <ul>
        {sortByFunction(sortBy, expenses, 'expense').map((expense, index) => (
          <Expense
            key={expense.id}
            index={index}
            action={expense.action}
            amount={expense.amount}
            currency={expense.currency}
            clicked={() => onRemoveTransaction(expense)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
