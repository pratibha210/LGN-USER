import React from 'react';
import ri1 from '../assets/img/ri1.png';
import ri2 from '../assets/img/ri2.png';
import ri3 from '../assets/img/ri3.png';
import ri4 from '../assets/img/ri4.png';
import ri5 from '../assets/img/ri5.png';
import { useAppContext } from '../context/AppContext';
function RightBarSmall() {
  const { logout } = useAppContext();
  const path = window.location.pathname;

  return (
    <div className="sidebar-right d-flex align-items-center">
      <ul>
        <li className={path =="/profile" && "active"}><a href="/profile"><img src={ri1} alt="" /></a></li>
        <li className={path =="/store" && "active"}><a href="/store"><img src={ri2} alt="" /></a></li>
        {/* <li><a href="#"><img src={ri3} alt=""/></a></li>
            <li><a href="#"><img src={ri4} alt=""/></a></li> */}
        <li><a href="/login" onClick={() => logout()}><img src={ri5} alt="" /></a></li>
      </ul>
    </div>

  )
}

export default RightBarSmall