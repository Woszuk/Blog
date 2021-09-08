import React from 'react';
import { connect } from 'react-redux';
import { fetchEntry } from '../actions';
import history from '../history'

import './EntryShow.scss';

class EntryShow extends React.Component {
    componentDidMount() {
        this.props.fetchEntry(this.props.match.params.id)
    }

    componentDidUpdate() {
        document.querySelector('.show').addEventListener('click', () => this.backHistory())
    }

    backHistory() {
        history.push('/')
    }

    renderContent() {
        return this.props.entry.content.split('\n').map((str, index) => {
            if(str.trim().length > 0) {
                return (
                    <p className="show__content" key={index}>{str}</p>
                )
            }
        });
    }

    render() {
        if(!this.props.entry) {
            return <div>Loading...</div>
        }
        return (
            <div className="show">
                <span className="show__arrow">&larr;</span>
                <h1 className="heading-1 u-margin-bottom-small center">{this.props.entry.title}</h1>
                <div className="show__container">{this.renderContent()}</div>
            </div>
        )
    } 
}

const mapStateToProp = (state, ownProps) => {
    return {
        entry: state.entries[ownProps.match.params.id]
    }
}

export default connect(mapStateToProp, { fetchEntry })(EntryShow);