import classes from './MainNavigation.module.css';
import {NavLink} from 'react-router-dom'

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink 
            end 
            to='/'
            className={({isActive}) =>  isActive ? classes.active : undefined}
            >Home</NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) =>  isActive ? classes.active : undefined} to='/events'>Events</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
