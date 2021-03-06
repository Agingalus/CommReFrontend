import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import Home from './home';
import newProperty from './newProperty';

const Webpages = () => {
    return (
        <Router>
            <Route exact path="/" component={Home} />
            <Route path="/newProperty" component={newProperty} />

        </Router>
    );
};
export default Webpages;