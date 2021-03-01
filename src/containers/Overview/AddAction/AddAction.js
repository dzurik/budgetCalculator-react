import classes from './AddAction.module.scss';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions/index';

const AddAction = (props) => {
  const [sign, setAdd] = useState(true);
  const [actionName, setActionName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState('HUF');

  const dispatch = useDispatch();

  const onAddIncome = (actionName, amount, currency) =>
    dispatch(actions.addIncome(actionName, +amount, currency));

  const onAddExpense = (actionName, amount, currency) =>
    dispatch(actions.addExpense(actionName, +amount * -1, currency));

  let buttonClasses = [classes.Icon];

  if (!sign) {
    buttonClasses.push(classes.Red);
  }

  const changeSign = (e) => {
    e.preventDefault();
    setAdd(!sign);
  };

  const checkValidity = (actionName, amount) => {
    let isValid = true;

    if (actionName === '' && !amount > 0 && isValid) {
      isValid = actionName !== '';

      setError('Please enter valid data.');
      return isValid;
    }

    if (actionName === '' && isValid) {
      isValid = actionName !== '';

      setError('Please enter valid transaction name.');
      return isValid;
    }

    if (!amount > 0 && isValid) {
      isValid = amount > 0;

      setError('Please enter positive number.');
      return isValid;
    }

    return isValid;
  };

  const resetValuesOnAccept = (method) => {
    method(actionName, +amount, currency);
    setActionName('');
    setAmount('');
    setError('');
  };

  const addTransaction = (actionName, amount, currency) => {
    const valid = checkValidity(actionName, amount);

    if (!valid) return;

    if (sign) {
      resetValuesOnAccept(onAddIncome);
    }

    if (!sign) {
      resetValuesOnAccept(onAddExpense);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.Error}>{error}</div>
      <div className={classes.Add}>
        {sign ? (
          <FiPlusCircle onClick={changeSign} className={buttonClasses.join(' ')} />
        ) : (
          <FiMinusCircle onClick={changeSign} className={buttonClasses.join(' ')} />
        )}

        <input
          type="text"
          placeholder="Action name"
          className={classes.Input}
          value={actionName}
          onChange={(event) => setActionName(event.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          className={classes.Input}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />

        <select
          className={classes.Select}
          onChange={(event) => setCurrency(event.target.value)}
        >
          <option value="HUF">Ft</option>
          <option value="EUR">€</option>
          <option value="USD">$</option>
          <option value="GBP">£</option>
        </select>

        <Button clicked={() => addTransaction(actionName, amount, currency)}>
          Add {sign ? 'Income' : 'Expense'}
        </Button>
      </div>
    </React.Fragment>
  );
};

export default AddAction;
