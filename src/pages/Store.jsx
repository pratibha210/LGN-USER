import React from 'react';

import LeftBar from '../Compoonents/LeftBar';
import Header from '../Compoonents/Header';
import RightBarSmall from '../Compoonents/RightBarSmall';
import Footer from '../Compoonents/Footer';

import gift from '../assets/img/gift-card.png';
import points from '../assets/img/points.png';
import filter from '../assets/img/filter.png';
import product from '../assets/img/product.png';


const Store = () => {
    return  (
        <>
         <Header></Header>
         <LeftBar></LeftBar>
         <RightBarSmall></RightBarSmall>
         <div className="store-wrap d-flex">
        <div className="left-wrap">
            <div className="shop-actionarea d-flex align-items-center justify-content-between">
                <div className="btn-wrap d-flex">
                    <a href="#" className="btn main-btn">Store</a>
                    <a href="#" className="btn black-btn">My Inventory</a>
                </div>
                <div className="right-wrap">
                    <div className="pagination">
                        <ul className="d-flex">
                            <li><a href="#" className="active">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><button className="last-btn">Last</button></li>
                            <li><a href="#"><img src={filter} alt="" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="store-banner">
                <h2>STORE</h2>
                <p>Lorem ipsum dolor sit amet consectetur. Sed pulvinar orci ut et in lorem erat risus semper.</p>
            </div>
            <div className="product-area d-flex">
                <div className="product-detail">
                    <h2>HYPERX CLOUD II</h2>
                    <p>The HyperX Cloud II was built to be an ultra-comfortable gaming headset with amazing sound.</p>
                    <p>10 Days estimated delivery time</p>
                    <a href="#" className="btn main-btn">5000 LP <img src={points} alt="" /> </a>
                </div>
                <div className="product-img">
                    <img src={product} alt="" />
                </div>
            </div>
            <div className="gift-card d-flex">
                <div className="card-area">
                    <img src={gift} alt="" />
                    <p>500 Super Coins (Flipkart)</p>
                    <a href="#" className="btn point-btn">100 LP <img src={points} alt="" /> </a>
                </div>
                <div className="card-area">
                    <img src={gift} alt="" />
                    <p>500 Super Coins (Flipkart)</p>
                    <a href="#" className="btn point-btn">100 LP <img src={points} alt="" /> </a>
                </div>
                <div className="card-area">
                    <img src={gift} alt="" />
                    <p>500 Super Coins (Flipkart)</p>
                    <a href="#" className="btn point-btn">100 LP <img src={points} alt="" /> </a>
                </div>
                
            </div>
        </div>
        <div className="right-wrap">
            <div className="lgn-points">
                <h2>GET FREE LGN POINTS</h2>
                <div className="card-area">
                    <h3>Invite your friends and get free LPs</h3>
                    <p>You will earn at least 20 LP for every successful referral</p>
                    <a href="#" className="btn invite-btn">Invite</a>
                </div>
            </div>
            <div className="faq-sec">
                <h2>FAQS</h2>
                <div className="faq-card">
                    <div className="faq-cnt">
                        <h3>How do I earn LGN Points to claim items?</h3>
                        <p>LGN Points are earned by participating in tournaments and correct answering.</p>
                    </div>
                    <div className="faq-cnt">
                        <h3>How do I earn LGN Points to claim items?</h3>
                        <p>LGN Points are earned by participating in tournaments and correct answering.</p>
                    </div>
                    <div className="faq-cnt">
                        <h3>How do I earn LGN Points to claim items?</h3>
                        <p>LGN Points are earned by participating in tournaments and correct answering.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <Footer></Footer>
         </>
       
      )
};

export default Store;