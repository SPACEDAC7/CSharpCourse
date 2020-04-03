import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {getUserById, uploadFile, updateMainPicture, deletePicture, apiUpdateUser} from '../../util/apiFunctions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPaperPlane, faTrash, faExclamation } from '@fortawesome/free-solid-svg-icons'
import ImageUploader from "react-images-upload";
import alertify from 'alertifyjs';
import TimeAgo from 'timeago-react';

const updateUser = ((userId,knownAs,introduction,lookingFor,interests,city) => {
    apiUpdateUser(userId,
        {
            knownAs,introduction,lookingFor,interests,city
        })
});

export default function MemberEdit(props){

    const [member, setMember] = useState({});
    const [knownAs, setKnownAs] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [lookingFor, setLookingFor] = useState("");
    const [interests, setInterests] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [pictures, setPictures] = useState([]);

    const onDrop = picture => {
        setPictures([...pictures, picture]);
    };

    let {userId} = props;

    useEffect(() => {
        if (member.Username === undefined) {
            getUserById(userId).then(res => {
               console.log("Member-edit: ", res)
               setMember(res)
               setKnownAs(res.KnownAs);
               setIntroduction(res.Introduction);
               setLookingFor(res.LookingFor);
               setInterests(res.Interests);
               setCity(res.City);
            });
       }
    })

    return (<div>
        <div>
            {member.Username}
        </div>
        <img alt={knownAs} src={member?.PhotoUrl !== null? member.PhotoUrl : require("../../assets/avatar.jpg")}></img>
        <div>
            <strong>Location:</strong>
            <p>{member?.City}, {member?.Country}</p>
            <div>
            City: <input type="text" value={city} onChange={(event) => setCity(event.target.value)}></input>
            Country: <input type="text" value={country} onChange={(event) => setCountry(event.target.value)}></input>
        </div>
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
        <div>
            <strong>Photos:</strong>
            <div>
                {member?.Photos?.map(photo => {
                    return (<div>
                        <img alt={photo?.Description} key={photo.Id} src={photo?.Url}></img>
                        <button className="btn btn-primary little-borders" onClick={()=> updateMainPicture(userId, photo.Id)}><FontAwesomeIcon icon={faExclamation} /> Makes main</button>
                        <button className="btn btn-primary little-borders" onClick={()=>{
                            alertify.confirm('Delete photo', 'Seguro que quieres borrar esta photo', function(){ deletePicture(userId, photo.Id) }
                            , function(){ alertify.error('Cancel')});
                        }}><FontAwesomeIcon icon={faTrash} /> Remove</button>
                        </div>);
                })}
                <div>
                    <div>Upload a new image</div>
                    <ImageUploader
                        withIcon={true}
                        onChange={onDrop}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                        withPreview={true}
                        />
                </div>
                <button className="btn btn-warning little-borders" onClick={() => uploadFile(userId, pictures)}>Upload Picture</button>
            </div>
        </div>
        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faHeart} /> Like</button>
        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faPaperPlane} /> Message</button>
     </div>)
}