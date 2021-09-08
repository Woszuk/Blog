import React from 'react';
import { connect } from 'react-redux';
import { createEntry } from '../actions';

import EntryForm from './EntryForm';
import './BlogCreate.scss'

class BlogCreate extends React.Component {
    onSubmit = (formValues) => {
        this.props.createEntry(formValues)
    }

    render() {
        return (
            <div className="create">
                <h1 className="heading-1 u-margin-bottom-small center">New Entry</h1>
                <EntryForm onSubmit={this.onSubmit}/>
            </div>
        )
    } 
}

export default connect(null, { createEntry })(BlogCreate);