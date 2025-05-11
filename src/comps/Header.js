import { Link } from 'react-router-dom';
import '../css/Header.css';

function Header() {
    return(
        <div className='header'>
          <nav>
          <ul>
  <li><Link class="active" to="/todo">Home</Link></li>
  <li><Link to="/contact">Contact</Link></li>
  <li><Link to="/account">Account</Link></li>
  <li><Link to="/login">Logout</Link></li>
</ul>
          </nav>
        </div>
    )
}
export default Header;