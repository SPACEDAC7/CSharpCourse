import React, {useState, useEffect} from 'react';
import {getUsers} from '../../util/apiFunctions'
import './members.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Link, useRouteMatch } from 'react-router-dom'


export default function Member(){
    const [members, setMembers] = useState([]);
    
    

    useEffect(() => {
        if (members.length === 0) {
            getUsers().then(res => {
               setMembers(res)
            });
       }
    });


    let {url} = useRouteMatch();

    return (
        <div className="tarjetas">
            {members.map((user) => {
                return (
                    <div key={user.Username} className="tarjeta">
                        <img alt="cosa" src={user.PhotoUrl !== null ? user.PhotoUrl : require("../../assets/avatar.jpg")}></img>
                        <p>{user.Username}</p>
                        <p>{user.City}</p>
                        <Link to={`${url}/${user.Id}`}><button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faUser} /></button></Link>
                        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faHeart} /></button>
                        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </div>
                )
            })}

          
        </div>
    )
}