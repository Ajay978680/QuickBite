import React, { useState, useContext } from 'react';
import './Navbar.css';
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, username, orders, addOrder } = useContext(StoreContext);
  
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    const navigate = useNavigate();
    navigate("/");
  };

  const handleOrderClick = () => {
    addOrder();
  };

  return (
    <div className="navbar">
      {/* Replacing image logo with styled text */}
      <Link to='/' className="logo-text">QuickBite</Link> 

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <span className="username">{username}</span>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li><img src="bag_icon.png" alt="" /><p>Orders</p></li>
              {orders.length > 0 && (
                <li><button onClick={handleOrderClick}>Place New Order</button></li>
              )}
              <hr />
              <li onClick={logout}><img src="" alt="logout_icon.png"/><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
