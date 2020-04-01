import React, {useState, useEffect}  from 'react';
import { Form, ButtonGroup, Button} from 'react-bootstrap'
import {getMessages} from '../../util/apiFunctions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faInbox, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Pagination from 'react-bootstrap/Pagination'
import { Link, useRouteMatch } from 'react-router-dom'
import TimeAgo from 'timeago-react';
import './message.css'

export default function Message(props){
    
    const [inboxType, setInboxType] = useState("Unread")
    const [messages, setMessages] = useState([]);
    const totalPages = parseInt(localStorage.getItem("totalPages"));
    const currentPage = parseInt(localStorage.getItem("currentPage"));
    const {userId} = props;

    const getMessagesPerPage = (page) => {
        getMessages(userId, inboxType, page).then(messages => {
            setMessages(messages)
        })
    }

    const getMessagesForInboxType = (inboxType) => {
        setInboxType(inboxType);
        getMessages(userId, inboxType).then(messages => {
            setMessages(messages)
        })

    }


    useEffect(() => {
        if(messages.length === 0){
            getMessages(userId, inboxType).then(messages => {
                console.log("messages: ", messages)
                setMessages(messages)
            })
        }
    });
    
    
    return (<div>

        <ButtonGroup aria-label="Basic example">
            {inboxType === "unread" ? 
                <Button variant="secondary" onClick={() => getMessagesForInboxType("Unread")} active><FontAwesomeIcon icon={faPaperPlane} />Unread</Button>:
                <Button variant="secondary" onClick={() => getMessagesForInboxType("Unread")}><FontAwesomeIcon icon={faPaperPlane} />Unread</Button>}
            {inboxType === "inbox" ? 
                <Button variant="secondary" onClick={() => getMessagesForInboxType("Inbox")} active><FontAwesomeIcon icon={faInbox} />Inbox</Button>:
                <Button variant="secondary" onClick={() => getMessagesForInboxType("Inbox")}><FontAwesomeIcon icon={faInbox} />Inbox</Button>}
            {inboxType === "outbox" ? 
                <Button variant="secondary" onClick={() => getMessagesForInboxType("Outbox")} active><FontAwesomeIcon icon={faArrowRight} />Outbox</Button>:
                <Button variant="secondary" onClick={() => getMessagesForInboxType("Outbox")}><FontAwesomeIcon icon={faArrowRight} />Outbox</Button>}
        </ButtonGroup>


  
        { messages.length === 0 && <div class="row">
            <h3>No messages</h3>
        </div>}
  
        { messages.length > 0 && <div class="row">
            <table class="table table-hover">
                <tr>
                <th >Message</th>
                <th >From / To</th>
                <th >Sent / Received</th>
                <th ></th>
                </tr>
                {messages.map(message => {
                    return (
                <tr link="/members, messageContainer == 'Outbox' ? message.recipientId : message.senderId]">
                <td>{message.content}</td>
                <td>
                    {inboxType != 'Outbox' && <div>
                        <img src={message?.senderPhotoUrl} class="img-circle rounded-circle small-image"></img>
                        <strong>{message.senderKnownAs}</strong>
                    </div>}
                    {inboxType == 'Outbox' && (<div >
                        <img src={message?.recipientPhotoUrl} class="img-circle rounded-circle small-image"></img>
                        <strong>{message.recipientKnownAs}</strong>
                    </div>)}
                </td>
                <td><TimeAgo
                datetime={message?.messageSent.toLocaleString()} 
                locale='en_GB'
                /></td>
                <td>
                    {inboxType === 'Outbox' && <Link to={`members/${message.recipientId}`}><button class="btn btn-primary">Profile</button></Link>}
                    {inboxType !== 'Outbox' && <Link to={`members/${message.senderId}`}><button class="btn btn-primary">Profile</button></Link>}
                </td>
                <td>
                    <button class="btn btn-danger">Delete</button>
                </td>
                </tr>
                    )
                })}
            </table>
        
        </div>}

        <div>
            <Pagination>
                <Pagination.First onClick={() => getMessagesPerPage(0)} />
                <Pagination.Prev onClick={() => getMessagesPerPage(currentPage > 0 ? currentPage - 1 : 0)}/>
                {Array.from(Array(totalPages).keys()).map( e => {
                    return e+1 == currentPage ? 
                    <Pagination.Item onClick={() => getMessagesPerPage(e+1)} active>{e + 1}</Pagination.Item> :
                    <Pagination.Item onClick={() => getMessagesPerPage(e+1)} >{e + 1}</Pagination.Item>
                }
                )}
                <Pagination.Next onClick={() => getMessagesPerPage(currentPage < totalPages ? currentPage + 1 : totalPages)}/>
                <Pagination.Last onClick={() => getMessagesPerPage(totalPages)}/>
            </Pagination>
        </div>

    </div>)
}