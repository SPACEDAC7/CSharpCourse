import React, {useState, useEffect} from 'react';
import {getUserById} from '../../util/apiFunctions'

export default function MemberEdit(props){

    const [member, setMember] = useState({});
    const [knownAs, setKnownAs] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [lookingFor, setLookingFor] = useState("");
    const [interests, setInterests] = useState("");
    const [city, setCity] = useState("");
    let {userId} = props;

    useEffect(() => {
        if (member.Username === undefined) {
            getUserById(userId).then(res => {
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
        Let's edit {member?.Username}
        
        <div>
            Introduction: <input type="text" value={introduction} onChange={(event) => setIntroduction(event.target.value)}></input>
        </div>
        <div>
            KnownAs: <input type="text" value={knownAs} onChange={(event) => setKnownAs(event.target.value)}></input>
        </div>
        <div>
            LookingFor: <input type="text" value={lookingFor} onChange={(event) => setLookingFor(event.target.value)}></input>
        </div>
        <div>
            Interests: <input type="text" value={interests} onChange={(event) => setInterests(event.target.value)}></input>
        </div>
        <div>
            City: <input type="text" value={city} onChange={(event) => setCity(event.target.value)}></input>
        </div>
    </div>)
}