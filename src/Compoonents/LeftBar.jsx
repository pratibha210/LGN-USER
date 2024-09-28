import React from 'react';
import i1 from '../assets/img/i1.png';
import i2 from '../assets/img/i2.png';
import i3 from '../assets/img/i3.png';
import i4 from '../assets/img/i4.png';

function LeftBar() {
  return (
    <div className="sidebar d-flex align-items-center">
        <ul>
            <li><a href="#"><img src={i1} alt="" /></a></li>
            <li><a href="#"><img src={i2} alt="" /></a></li>
            <li><a href="/"><img src={i3} alt="" /></a></li>
            <li><a href="/leaderboard"><img src={i4} alt="" /></a></li>
        </ul>
    </div>
  )
}

export default LeftBar