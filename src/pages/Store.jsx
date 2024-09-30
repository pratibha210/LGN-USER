import React, { useState, useEffect, useCallback } from 'react';

import LeftBar from '../Compoonents/LeftBar';
import Header from '../Compoonents/Header';
import RightBarSmall from '../Compoonents/RightBarSmall';
import Footer from '../Compoonents/Footer';
import { httpRequest } from "../services/Helper"
import Swal from 'sweetalert2';
import gift from '../assets/img/gift-card.png';
import points from '../assets/img/points.png';
import filter from '../assets/img/filter.png';
import product from '../assets/img/product.png';
import { useAppContext } from "../context/AppContext"


const Store = () => {
    const [user, setUser] = useState({})
    const { error_notify, getLocalStorageData } = useAppContext()

    const [storeData, setStoreData] = useState();
    const [electronics, setElectronics] = useState();
    const [features, setFeatures] = useState();
    const [fashion, setFashion] = useState();

    const userData = getLocalStorageData("user")
        .then(data => {
            setUser(data)
        })
        .catch(err => {
            console.log(err)
        })

    const storeProduct = useCallback(async () => {
        try {
            const res = await httpRequest('GET', 'api/v1/store/list/active?page=1&limit=10', {},
                {},
                {
                    "x-access-token": user?.token,
                    "Content-Type": "application/json"
                }
            );
            console.log(res, "res");

            setStoreData(res.coupons);
            setElectronics(res.electronics);
            setFeatures(res.features);
            setFashion(res.fashion);
        } catch (error) {
            console.log(error);
        }
    }, []);
    const showAlert = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Your file is safe :)',
              'error'
            );
          }
        });
      };
    const checkOut = useCallback(async () => {
        try {
          setLoading(true);
          const data = { userId: user };
          const res = await httpRequest('PUT', `api/v1/store/reedem-coupon/${"storeDetails?._id"}`, data);
          // Show success modal
          setModalContent({
            message: 'Purchase Successful! Thank you for your purchase.',
            isSuccess: true,
          });
          setCurrentModal(() => confirmModal);
          setLoading(false);
        } catch (error) {
          // Show error modal
          setModalContent({
            message: 'Purchase failed. Please try again later.',
            isSuccess: false,
          });
          setModalVisible(true);
          setLoading(false);
        }
      }, ["storeDetails", user]);



    useState(() => {
        storeProduct();
    }, [storeProduct])

    return (
        <>
            <Header></Header>
            <LeftBar></LeftBar>
            <RightBarSmall></RightBarSmall>
            <div className="store-wrap d-flex">
                <div className="left-wrap">
                    <div className="shop-actionarea d-flex align-items-center justify-content-between">
                        <div className="btn-wrap d-flex">
                            <a href="#" className="btn main-btn">Store</a>
                            {/* <a href="#" className="btn black-btn">My Inventory</a> */}
                        </div>
                        {/* <div className="right-wrap">
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
                        </div> */}
                    </div>
                    {electronics?.length > 0 && electronics?.map((data) => {
                        return (
                            <div className="store-banner" style={{ backgroundImage: `url(${data?.image || 'img/shop-banner.png'})`}}>
                                <h2>{data?.title}</h2>
                                <p> {data?.description}</p>
                            </div>
                        )
                    })}
                    {features?.length > 0 && features?.map((item) => {
                        return(
                    <div className="product-area d-flex">
                        <div className="product-detail">
                            <h2>{item?.title}</h2>
                            <p>{item?.description}</p>
                            <p dangerouslySetInnerHTML={{ __html: item?.policy }}/>
                            <a href="#" className="btn main-btn">{item?.lgn_coin_amount} LP <img src={points} alt="" /> </a>
                        </div>

                        <div className="product-img">
                            <img src={item?.image} alt="" />
                        </div>
                    </div>
                    )
                    })}
                    <div className="gift-card d-flex">
                    {storeData?.length > 0 && storeData?.map((item)=>{
                        return(
                        <div className="card-area" >
                            <img  style={{width: '100%'}}src={item?.image} alt="" />
                            <p>{item?.title}</p>
                            <button onClick={()=>showAlert()} className="btn point-btn">{item?.lgn_coin_amount} LP <img src={points} alt="" /> </button>
                        </div>
                    )
                }) }
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