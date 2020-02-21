import React from 'react';
import MemberDetailed from '../member-detailed/member-det'
import Member from '../members/members'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

export default function MemberRouter() {

    let {path} = useRouteMatch();

    return (<div>
        <Switch>
            <Route exact path={path}>
                <Member></Member>
            </Route>
            <Route path={`${path}/:memberId`}>
              <MemberDetailed></MemberDetailed>
            </Route>
          </Switch>
    </div>)
}