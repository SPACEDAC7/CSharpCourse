import React, {useState, useEffect} from 'react';
import {getUsers} from '../../util/apiFunctions'
import './members.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import MemberDetailed from '../member-detailed/member-det'

export default function Member(){
    const [members, setMembers] = useState([]);
    
    

    useEffect(() => {
        if (members.length === 0) {
            getUsers().then(res => {
               setMembers(res)
            });
       }
    });


    let {path, url} = useRouteMatch();

    return (
        <div className="tarjetas">
            {members.map((user) => {
                return (
                    <div key={user.Username} className="tarjeta">
                        <img alt="cosa" src={user.PhotoUrl}></img>
                        <p>{user.Username}</p>
                        <p>{user.City}</p>
                        <Link to={`${url}/${user.Username}`}><button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faUser} /></button></Link>
                        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faHeart} /></button>
                        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    
                    </div>
                )
            })}

          <Switch>
            <Route path={`${path}/:memberUsername`}>
              <MemberDetailed></MemberDetailed>
            </Route>
          </Switch>
        </div>
    )
}