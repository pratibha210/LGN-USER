import React, { useEffect, useState } from 'react';

import drop from '../assets/img/drop.png';
import user1 from '../assets/img/user1.png';
import emoji from '../assets/img/emoji.png';
import setting from '../assets/img/setting.png';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase.config'
import { collection, addDoc, serverTimestamp, query, onSnapshot, where, orderBy } from "firebase/firestore";
function RightBar({userDetails}) {
    const { id } = useParams();
    const [leaderBoard, setLeaderBoard] = useState(null);
    const [chatData, setChatData] = useState({
        tournamentId: id,
        author: "",
        content: "",
        userName: '',
        userImage: ''
    });
    const [messages, setMessages] = useState([])
    const handleChat = data => {
        setChatData(prev => ({
            ...prev,
            content: data,
            createdAt: serverTimestamp()
        }))
    }

    const submitChat = async e => {
        e.preventDefault()
        const updatedChatData = {
            ...chatData,
            author: userDetails?.email,
            userName: userDetails?.name,
            userImage: userDetails?.profileImage
        }

        // Send message to fitrebase

        await addDoc(collection(db, "chats"), updatedChatData)

        setChatData(prev => ({
            ...prev,
            content: ""
        }))
    }
    useEffect(() => {
        const queryChats = query(collection(db, "chats"), where("tournamentId", "==", id), orderBy("createdAt",))

        const subscribe = onSnapshot(queryChats, (snapshot) => {
            const allMessages = snapshot.docs.map(item => {

                return { id: item.id, ...item.data() };
            })

            setMessages(allMessages)
        })

        return () => subscribe()
    }, [id])

    const getLeaderBoard = async () => {
        try {
            const data = await httpRequest(
                "GET",
                "api/tournament/get-leaderboard-by-tournament/66f131412d31ce4ceb33b9ef",
                {},
                {},
                {}
            )
            console.log(data)
            setLeaderBoard(data.leaderboard)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getLeaderBoard()
    }, [])
    return (
        <div className="right-bar">
            <div className="leaderboard-area">
                <h2>LEADERBOARD</h2>
                <table>
                    <thead className="head-area">
                        <tr>
                            <th>#</th>
                            <th>NAME</th>
                            <th>POINTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaderBoard?.map((leader, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{leader?.userId?.name}</td>
                                    <td>{leader?.points}</td>
                                </tr>
                            ))
                        }
                    </tbody>
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
                    {
                        messages?.map((chat) => (
                            <div className="msg-wrap d-flex align-items-center">
                                {chat.userImage ? <img src={chat.userImage} alt="" /> : <img src={user1} alt="" />}
                                <p><span className="cc">{chat.userName}: </span>{chat.content}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="sending-area">
                    <div className="input-wrap">
                        <a href="#">
                            <img src={emoji} alt="" />
                        </a>
                        <input type="text" placeholder="Search..." value={chatData?.content} className="search-input" onChange={(e) => handleChat(e.target.value)} />
                    </div>
                    <div className="btn-area d-flex justify-content-between align-items-center">
                        <img src={setting} alt="" />
                        <a href="#" className="btn main-btn" onClick={(e) => submitChat(e)}>Chat</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RightBar