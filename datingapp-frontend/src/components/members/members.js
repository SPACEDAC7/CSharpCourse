import React, {useState, useEffect} from 'react';
import {getUsers} from '../../util/apiFunctions'
import './members.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Link, useRouteMatch } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'


export default function Member(){
    const [members, setMembers] = useState([]);
    
    const getUsersPerPage = (page) => {
        getUsers(page).then(res => {
            setMembers(res)
         });
    }

    useEffect(() => {
        if (members.length === 0) {
            getUsers().then(res => {
               setMembers(res)
            });
       }
    });


    let {url} = useRouteMatch();
    const totalPages = parseInt(localStorage.getItem("totalPages"));
    const currentPage = parseInt(localStorage.getItem("currentPage"));

    return (
        <div>
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
            <div>
                <Pagination>
                    <Pagination.First onClick={() => getUsersPerPage(0)} />
                    <Pagination.Prev onClick={() => getUsersPerPage(currentPage > 0 ? currentPage - 1 : 0)}/>
                    {Array.from(Array(totalPages).keys()).map( e => {
                        return e+1 == currentPage ? 
                        <Pagination.Item onClick={() => getUsersPerPage(e+1)} active>{e + 1}</Pagination.Item> :
                        <Pagination.Item onClick={() => getUsersPerPage(e+1)} >{e + 1}</Pagination.Item>
                    }
                    )}
                    <Pagination.Next onClick={() => getUsersPerPage(currentPage < totalPages ? currentPage + 1 : totalPages)}/>
                    <Pagination.Last onClick={() => getUsersPerPage(totalPages)}/>
                </Pagination>
            </div>
        </div>
    )
}