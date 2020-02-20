import React, {Component} from 'react';
import {getUsers} from '../../util/apiFunctions'
import './members.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default class Member extends Component{
    constructor(props){
        super(props)
        this.state = {members: null};
    }

    componentDidMount(){
        getUsers().then(res => {
            this.setState({members: res})
        });
    }


    render(){
        const {members} = this.state;
        return !!members && <div className="tarjetas">
            {members.map((user) => {
                return (
                    <div className="tarjeta">
                        <img src={user.PhotoUrl}></img>
                        <p>{user.Username}</p>
                        <p>{user.City}</p>
                        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faUser} /></button>
                        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faHeart} /></button>
                        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </div>
                )
            })}
        </div>
    }
}