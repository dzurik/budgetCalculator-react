import classes from './Incomes.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { sortByFunction } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

import Income from './Income/Income';

const Incomes = (props) => {
  const transactions = useSelector((state) => {
    return state.transactions;
  });

  const sortBy = useSelector((state) => {
    return state.sortBy;
  });

  const dispatch = useDispatch();

  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    setIncomes(transactions.filter((income) => income.actionType === 'income'));
  }, [transactions, setIncomes]);

  const onRemoveTransaction = (incomeTransaction) =>
    dispatch(actions.removeTransaction(incomeTransaction));

  return (
    <div className={classes.Incomes}>
      <h2>Incomes:</h2>
      <ul>
        {sortByFunction(sortBy, incomes, 'income').map((income, index) => (
          <Income
            index={index}
            key={income.id}
            action={income.action}
            amount={income.amount}
            currency={income.currency}
            clicked={() => onRemoveTransaction(income)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Incomes;
