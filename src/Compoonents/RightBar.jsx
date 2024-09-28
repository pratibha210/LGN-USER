import React from 'react';

import drop from '../assets/img/drop.png';
import user1 from '../assets/img/user1.png';
import emoji from '../assets/img/emoji.png';
import setting from '../assets/img/setting.png';

function RightBar() {
  return (
<div className="right-bar">
        <div className="leaderboard-area">
            <h2>LEADERBOARD</h2>
            <table>
                <tr className="head-area">
                    <th>#</th>
                    <th>NAME</th>
                    <th>CORRECT</th>
                    <th>POINTS</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Sumit Majumder</td>
                    <td>40</td>
                    <td>200</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Sumit Majumder</td>
                    <td>40</td>
                    <td>200</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Sumit Majumder</td>
                    <td>40</td>
                    <td>200</td>
                </tr>
            </table>

            <div className="your-rank">
                <h3>Your Rank</h3>
                <ul>
                    <li>72</li>
                    <li>Sumit Majumder</li>
                    <li>50</li>
                    <li>400</li>
                </ul>
            </div>

            <div className="drop-img"><a href="#"><img src={drop} alt="" /></a></div>
        </div>
        <div className="chat-area">
            <div className="chat-msg d-flex">
                <div className="msg-wrap d-flex align-items-center">
                    <img src={user1} alt="" />
                    <p><span className="cc">Ryan: </span>What is this game ?</p>
                </div>
                <div className="msg-wrap d-flex align-items-center">
                    <img src={user1} alt="" />
                    <p><span className="b-35">Dumbledore:  </span>is this an extraction shooter</p>
                </div>
                <div className="msg-wrap d-flex align-items-center">
                    <img src={user1} alt="" />
                    <p><span className="g-41">Mary: </span>12/10 beer didn't green screen. make up stayed through the tears.
                    </p>
                </div>
                <div className="msg-wrap d-flex align-items-center">
                    <img src={user1} alt="" />
                    <p><span className="cc">Ryan: </span>What is this game ?</p>
                </div>
                <div className="msg-wrap d-flex align-items-center">
                    <img src={user1} alt="" />
                    <p><span className="cc">Ryan: </span>What is this game ?</p>
                </div>
                <div className="msg-wrap d-flex align-items-center">
                    <img src={user1} alt="" />
                    <p><span className="b-35">Dumbledore:  </span>is this an extraction shooter</p>
                </div>
                <div className="msg-wrap d-flex align-items-center">
                    <img src={user1} alt="" />
                    <p><span className="g-41">Mary: </span>12/10 beer didn't green screen. make up stayed through the tears.
                    </p>
                </div>
                <div className="msg-wrap d-flex align-items-center">
                    <img src={user1} alt="" />
                    <p><span className="cc">Ryan: </span>What is this game ?</p>
                </div>
            </div>
            <div className="sending-area">
                <div className="input-wrap">
                    <a href="#">
                        <img src={emoji} alt="" />
                    </a>
                    <input type="text" placeholder="Search..." className="search-input" />
                </div>
                <div className="btn-area d-flex justify-content-between align-items-center">
                    <img src={setting} alt="" />
                    <a href="#" className="btn main-btn">Chat</a>
                </div>
            </div>
        </div>
    </div>

)
}

export default RightBar