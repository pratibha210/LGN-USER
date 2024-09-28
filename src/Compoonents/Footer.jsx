import React from 'react';

import logo from '../assets/img/lgn-logo.png';

function Footer() {
  return (
    <div className="footer d-flex align-items-center justify-content-between">
        <div className="left-wrap">
            <a href="#"><img src={logo} alt="" /></a>
            <p>&copy; Copyrights Basus Hall of Game.</p>
        </div>
        <div className="right-wrap">
            <ul className="d-flex">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Career</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Help</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy </a></li>
                <li><a href="#">Sitemap</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Footer