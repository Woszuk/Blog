import React from 'react';
import Header from './Header';
import { Route, Router, Switch } from 'react-router-dom'
import BlogList from './BlogList';
import BlogCreate from './BlogCreate';
import EntryShow from './EntryShow';
import EntryEdit from './EntryEdit';
import history from '../history';

import '../sass/base/_base.scss';
import '../sass/base/_typography.scss';
import '../sass/base/_utilities.scss';
import '../sass/components/_button.scss';
import './App.scss';

const App = () => {
    return (
        <div className="container">
            <Router history={history}>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={BlogList}/>
                        <Route path="/entries/new" exact component={BlogCreate}/>
                        <Route path="/entries/:id" exact component={EntryShow}/>
                        <Route path="/entries/edit/:id" exact component={EntryEdit}/>
                    </Switch>
            </Router>
        </div>
    )
}

export default App;