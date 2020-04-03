import React, {useState, useEffect}  from 'react';

export default function Thread(props){

    const {userId} = props;
    let {path} = useRouteMatch();

    console.log("Path: ", path)
    console.log("UserID: ", userId)

    return (<div>This is the thread</div>)
}