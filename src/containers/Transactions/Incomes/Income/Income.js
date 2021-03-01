import classes from './Income.module.scss';
import { useSelector } from 'react-redux';
import { currencyHelper } from '../../../../shared/utility';
import RemoveButton from '../../../../components/UI/RemoveButton/RemoveButton';

const Income = (props) => {
  const currency = useSelector((state) => {
    return state.currency;
  });

  const currencies = useSelector((state) => {
    return state.currencies;
  });

  const incomeClasses = [classes.Income];

  if (props.index % 2) {
    incomeClasses.push(classes.Second);
  }

  return (
    <li key={props.id} className={incomeClasses.join(' ')}>
      <div className={classes.Action}>{props.action} </div>
      <div className={classes.Amount}>
        + {currencyHelper(currency, props.currency, props.amount, currencies)}
        <RemoveButton clicked={props.clicked} />
      </div>
    </li>
  );
};

export default Income;
