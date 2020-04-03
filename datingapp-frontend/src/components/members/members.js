import React, {useState, useEffect} from 'react';
import {getUsers, getFilteredUsers, likeUser} from '../../util/apiFunctions'
import './members.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Link, useRouteMatch } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'
import { Form, ButtonGroup, Button} from 'react-bootstrap'


export default function Member(props){
    const [members, setMembers] = useState([]);
    const [gender, setGender] = useState("");
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(99);
    const [orderBy, setOrderBy] = useState("created");
    const {userId} = props;
    
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

    const resetFilters = () =>{
        setGender("");
        setMinAge(18);
        setMaxAge(99);
        setOrderBy("created")
    }

    const applyFilters = () =>{
        var genderToFilter = gender !== "" ? gender : "female"; //Hardcoded for now
        getFilteredUsers(minAge, maxAge, genderToFilter, orderBy).then(res => {
            setMembers(res);
        })
    }


    let {url} = useRouteMatch();
    const totalPages = parseInt(localStorage.getItem("totalPages"));
    const currentPage = parseInt(localStorage.getItem("currentPage"));

    return (
        <div>
            <div>
                <p>Age From</p>
                <input type="number" class="form-control ml-1" id="minAge" name="minAge" value={minAge} onChange={(event) => {console.log("Min: ", event.target.value);setMinAge(event.target.value)}}></input>
    
                <p>Age To</p>
                <input type="number" class="form-control ml-1" id="maxAge" name="maxAge" value={maxAge} onChange={(event) => {console.log("Max: ", event.target.value);setMaxAge(event.target.value)}}></input>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select" value={gender} onChange={(event)=>{setGender(event.target.value)}}>
                    <option disabled selected>Que genero quieres ver:</option>
                    <option value={"female"}>Female</option>
                    <option value={"trans"}>Trans</option>
                    <option value={"other"}>Other</option>
                    <option value={"male"}>Male</option>
                    </Form.Control>
                </Form.Group>

                <p>Order By:</p>
                <ButtonGroup aria-label="Basic example">
                    {orderBy === "created" ? 
                        <Button variant="secondary" onClick={() => setOrderBy("created")} active>Newest Users</Button>:
                        <Button variant="secondary" onClick={() => setOrderBy("created")}>Newest Users</Button>}
                    {orderBy !== "created" ? 
                        <Button variant="secondary" onClick={() => setOrderBy("updated")} active>Last Update</Button>:
                        <Button variant="secondary" onClick={() => setOrderBy("updated")}>Last Update</Button>}
                </ButtonGroup>
                <div>
                    <button type="submit" class="btn btn-primary" onClick={() => applyFilters()}>Apply Filters</button>
                    <button type="button" class="btn btn-info" onClick={() => resetFilters()}>Reset Filter</button>
                </div>
            </div>
            <div className="tarjetas">
            {members.map((member) => {
                return (
                    <div key={member.Username} className="tarjeta">
                        <img className="small-picture" alt="cosa" src={member.PhotoUrl !== null ? member.PhotoUrl : require("../../assets/avatar.jpg")}></img>
                        <p>{member.Username}, {member.Age}</p>
                        <p>{member.Gender}</p>
                        <p>{member.City}</p>
                        <Link to={`${url}/${member.Id}`}><button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faUser} /></button></Link>
                        <button className="btn btn-primary little-borders" onClick={() => likeUser(userId,member.Id)}><FontAwesomeIcon icon={faHeart} /></button>
                        <Link to={`${url}/${member.Id}/${userId}`}><button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faPaperPlane} /></button></Link>
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