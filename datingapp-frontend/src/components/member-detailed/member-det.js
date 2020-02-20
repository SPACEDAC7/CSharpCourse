import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'


export default function MemberDetailed(){
    let {memberUsername} = useParams();
  
    return (<div>Detailed {memberUsername}</div>);
}