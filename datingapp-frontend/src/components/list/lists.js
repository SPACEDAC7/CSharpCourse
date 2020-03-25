import React, {useState, useEffect} from 'react';
import {getLikedUsers} from '../../util/apiFunctions'
import { Link, useRouteMatch } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { ButtonGroup, Button} from 'react-bootstrap'


export default function Lists(props){
    const [members, setMembers] = useState([]);
    const [filterName, setFilterName] = useState("likees");
    
    useEffect(() => {
        if (members.length === 0) {
            getLikedUsers(filterName).then(res => {
               setMembers(res)
            });
       }
    });

    const getLikeUsers = (value) => {
        if(value !== filterName){
            setFilterName(value);
            getLikedUsers(value).then(res => {
                setMembers(res)
             });
        }
    }


    let {url} = useRouteMatch();

    return (<div>
        <ButtonGroup aria-label="Basic example">
            {filterName === "likees" ? 
                <Button variant="secondary" onClick={() => getLikeUsers("likees")} active>Members who I like</Button>:
                <Button variant="secondary" onClick={() => getLikeUsers("likees")}>Members who I like</Button>}
            {filterName !== "likees" ? 
                <Button variant="secondary" onClick={() => getLikeUsers("likers")} active>Members who like me</Button>:
                <Button variant="secondary" onClick={() => getLikeUsers("likers")}>Members who like me</Button>}
        </ButtonGroup>
        {members?.map(user => {
           return (
            <div key={user.Username} className="tarjeta">
                <img className="small-picture" alt="cosa" src={user.PhotoUrl !== null ? user.PhotoUrl : require("../../assets/avatar.jpg")}></img>
                <p>{user.Username}, {user.Age}</p>
                <p>{user.Gender}</p>
                <p>{user.City}</p>
                <Link to={`${url}/${user.Id}`}><button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faUser} /></button></Link>
            </div>
        )
        })}
        
        </div>)
}