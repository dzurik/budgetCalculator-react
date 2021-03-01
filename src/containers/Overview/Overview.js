import React from 'react';
import ShowBudget from './ShowBudget/ShowBudget';
import BudgetDiagram from './BudgetDiagram/BudgetDiagram';
import AddAction from './AddAction/AddAction';
import Transactions from '../Transactions/Transactions';
import CurrencyChanger from '../CurrencyChanger/CurrencyChanger';

const Overview = (props) => {
  return (
    <React.Fragment>
      <ShowBudget />
      <BudgetDiagram />
      <AddAction></AddAction>
      <CurrencyChanger />
      <Transactions />
    </React.Fragment>
  );
};

export default Overview;
