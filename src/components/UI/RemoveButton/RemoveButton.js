import classes from './RemoveButton.module.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Button = (props) => {
  return (
    <button className={classes.RemoveButton} onClick={props.clicked}>
      <AiOutlineCloseCircle />
    </button>
  );
};

export default Button;
