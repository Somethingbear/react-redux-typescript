import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './features/common/NotFound';
import Login from './features/common/Login';
import App from './App';

export default () => (
    <Router>
        <Switch>
            {/* <Route exact path="/" render={() => <Redirect to="/app" push />} /> */}
            <Route exact path="/" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route path="*" render={() => <Redirect to="/404" push/>}  />
        </Switch>
    </Router>
);