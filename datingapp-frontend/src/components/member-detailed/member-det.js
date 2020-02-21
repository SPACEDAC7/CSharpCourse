import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {getUserById} from '../../util/apiFunctions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons'


export default function MemberDetailed(){
    
    const [member, setMember] = useState({});
    let {memberId} = useParams();

    useEffect(() => {
        if (member.Username === undefined) {
            getUserById(memberId).then(res => {
               setMember(res)
            });
       }
    })
  
return (<div>
        <div>
            {member.Username}
        </div>
        <img alt={member?.KnownAs} src={member?.PhotoUrl}></img>
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
            <p>{member.LastActive}</p>
        </div>
        <div>
            <strong>Member Since:</strong>
            <p>{member.Created}</p>
        </div>
        <div>
            <strong>Introduction:</strong>
            <p>{member.Introduction}</p>
        </div>
        <div>
            <strong>Interests:</strong>
            <p>{member.Interests}</p>
        </div>
        <div>
            <strong>Photos:</strong>
            <div>
                {member?.Photos?.map(photo => {
                    return (<img alt={photo?.Description} key={photo.Id} src={photo?.Url}></img>);
                })}
            </div>
        </div>
        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faHeart} /> Like</button>
        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faPaperPlane} /> Message</button>
     </div>);
}