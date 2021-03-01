import classes from './Expense.module.scss';
import { useSelector } from 'react-redux';
import { currencyHelper } from '../../../../shared/utility';
import RemoveButton from '../../../../components/UI/RemoveButton/RemoveButton';

const Expense = (props) => {
  const currency = useSelector((state) => {
    return state.currency;
  });

  const currencies = useSelector((state) => {
    return state.currencies;
  });

  const expenseClasses = [classes.Expense];

  if (props.index % 2) {
    expenseClasses.push(classes.Second);
  }

  return (
    <li key={props.id} className={expenseClasses.join(' ')}>
      <div className={classes.Action}>{props.action} </div>
      <div className={classes.Amount}>
        {currencyHelper(currency, props.currency, props.amount, currencies)}
        <RemoveButton clicked={props.clicked} />
      </div>
    </li>
  );
};

export default Expense;
