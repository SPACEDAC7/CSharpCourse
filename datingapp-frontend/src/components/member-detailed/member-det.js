import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {getUserById, uploadFile} from '../../util/apiFunctions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPaperPlane, faTrash, faExclamation } from '@fortawesome/free-solid-svg-icons'
import ImageUploader from "react-images-upload";


export default function MemberDetailed(){
    
    const [member, setMember] = useState({});
    let {memberId} = useParams();

    const [pictures, setPictures] = useState([]);

    const onDrop = picture => {
        setPictures([...pictures, picture]);
    };

    useEffect(() => {
        if (member.Username === undefined) {
            getUserById(memberId).then(res => {
               setMember(res)
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
                    return (<div>
                        <img alt={photo?.Description} key={photo.Id} src={photo?.Url}></img>
                        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faExclamation} /> Makes main</button>
                        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faTrash} /> Remove</button>
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
                <button className="btn btn-warning little-borders" onClick={() => uploadFile(memberId, pictures)}>Upload Picture</button>
            </div>
        </div>
        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faHeart} /> Like</button>
        <button className="btn btn-primary little-borders"><FontAwesomeIcon icon={faPaperPlane} /> Message</button>
     </div>);
}