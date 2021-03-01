import classes from './Logo.module.scss';
import LogoImage from '../../assets/images/logo.jpg';

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={LogoImage} alt="app logo" />
    </div>
  );
};

export default Logo;
