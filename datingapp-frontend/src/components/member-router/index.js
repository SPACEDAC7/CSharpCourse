import React from 'react';
import MemberDetailed from '../member-detailed/member-det'
import Member from '../members/members'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

export default function MemberRouter(props) {

    const {userId} = props;
    let {path} = useRouteMatch();

    return (<div>
        <Switch>
            <Route exact path={path}>
                <Member userId={userId}></Member>
            </Route>
            <Route path={`${path}/:memberId`}>
              <MemberDetailed></MemberDetailed>
            </Route>
          </Switch>
    </div>)
}