import React from 'react'
import { connect } from 'react-redux'
import { fetchEntry, editEntry } from '../actions'
import EntryForm from './EntryForm'

import './EntryEdit.scss'

class EntryEdit extends React.Component {
    componentDidMount() {
        this.props.fetchEntry(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.props.editEntry(this.props.match.params.id, formValues)
    }

    render() {
        if(!this.props.entry) {
            return <div>Loading...</div>
        }

        return (
            <div className="edit">
                <h1 className="heading-1 u-margin-bottom-small center">Edit a entry</h1>
                <EntryForm initialValues={{
                    title: this.props.entry.title,
                    content: this.props.entry.content,
                }} onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

const mapStateToProp = ( state, ownProps ) => {
    return {
        entry: state.entries[ownProps.match.params.id]
    }
}

export default connect(mapStateToProp, { fetchEntry, editEntry })(EntryEdit)