import classes from './Transactions.module.scss';
import Incomes from './Incomes/Incomes';
import Expenses from './Expenses/Expenses';

const Transactions = (props) => {
  return (
    <div className={classes.Transactions}>
      <Incomes />
      <Expenses />
    </div>
  );
};

export default Transactions;
