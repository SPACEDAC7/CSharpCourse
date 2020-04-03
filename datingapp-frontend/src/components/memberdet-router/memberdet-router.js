import React from 'react';
import MemberDetRouter from '../member-detailed/member-det'
import Member from '../members/members'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

export default function MemberDetRouter(props) {

    const {userId} = props;
    let {path} = useRouteMatch();

    console.log("Memberdet Path: ", path);
    console.log("Memberdet UserId: ", userId);

    return (<div>
        <Switch>
            <Route exact path={path}>
              <MemberDetailed></MemberDetailed>
            </Route>
            <Route path={`${path}/:memberId`}>
              <MemberDetRouter userId={this.userId}></MemberDetRouter>
            </Route>
          </Switch>
    </div>)
}