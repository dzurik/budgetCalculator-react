import { useSelector } from 'react-redux';
import { PieChart } from 'react-minimal-pie-chart';
import classes from './BudgetDiagram.module.scss';

const BudgetDiagram = (props) => {
  const totalBudget = useSelector((state) => {
    return state.totalBudget;
  });

  const incomes = useSelector((state) => {
    return state.incomes;
  });

  const expenses = useSelector((state) => {
    return state.expenses;
  });

  let diagram;

  if (incomes === 0 && expenses === 0) {
    return (diagram = <div className={classes.Null}>Enter some transactions:</div>);
  } else if (totalBudget || totalBudget === 0) {
    return (diagram = (
      <div>
        <PieChart
          animate
          reveal
          label={({ dataEntry }) => dataEntry.percentage.toFixed(1) + ' %'}
          data={[
            { title: 'Income', value: incomes, color: '#4bde7e' },
            {
              title: 'Expense',
              value: expenses * -1,
              color: '#ea3e3e',
            },
          ]}
        />
      </div>
    ));
  }

  return <div>{diagram}</div>;
};

export default BudgetDiagram;
