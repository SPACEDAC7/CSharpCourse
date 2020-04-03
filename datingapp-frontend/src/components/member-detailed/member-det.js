import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {getUserById, getMessages} from '../../util/apiFunctions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPaperPlane, faTrash, faExclamation } from '@fortawesome/free-solid-svg-icons'
import ImageUploader from "react-images-upload";
import alertify from 'alertifyjs';
import TimeAgo from 'timeago-react';

export default function MemberDetailed(){
    
    const [member, setMember] = useState({});
    const [messages, setMessages] = useState({});
    let {memberId} = useParams();
    let {userId} = useParams();

    const [pictures, setPictures] = useState([]);

    const onDrop = picture => {
        setPictures([...pictures, picture]);
    };

    useEffect(() => {
        console.log("UserId: ", userId, " - MemberId: ", memberId);
        if (member.Username === undefined) {
            getUserById(memberId).then(res => {
               console.log("Member - ", res);
                setMember(res)
            });
       }

       if (userId !== undefined){
        getMessages(memberId, "Inbox").then(res => {
            console.log("Messages - ", res)
            setMessages(res)
        });
    }
       if(pictures !== undefined){
           console.log("Pictures: ", pictures);
       }
    })
  
return (<div>
        <div>
            {member.Username}
        </div>
        <img alt={member?.KnownAs} src={member?.PhotoUrl !== null? member.PhotoUrl : require("../../assets/avatar.jpg")}></img>
        <div>
            <strong>Location:</strong>
            <p>{member?.City}, {member?.Country}</p>
        </div>
        <div>
            <strong>Age:</strong>
            <p>{member.Age}</p>
        </div>
        <div>
            <strong>Last Active:</strong>
            {member?.LastActive && <TimeAgo
                datetime={member.LastActive.toLocaleString()} 
                locale='en_GB'
                />}
        </div>
        <div>
            <strong>Member Since:</strong>
            <p>{new Date(member.Created).toLocaleDateString()}</p>
        </div>
        <div>
            <strong>Introduction:</strong>
            <p>{member.Introduction}</p>
        </div>
        <div>
            <strong>Interests:</strong>
            <p>{member.Interests}</p>
        </div>
        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faHeart} /> Like</button>
        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faPaperPlane} /> Message</button>

        

     </div>);
}