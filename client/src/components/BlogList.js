import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEntries } from '../actions'

import './BlogList.scss'

class BlogList extends React.Component {
    state = {
        width: 0,
        contentLength: 350
    }

    componentDidMount() {
        this.props.fetchEntries();
        window.addEventListener('resize', () => this.updateDimension())
    }

    updateDimension() {
        this.setState({ width: window.innerWidth })
        if(this.state.width <= 650 || this.state.width >= 870) {
            this.setState({ contentLength: 350 })
        }else {
            this.setState({ contentLength: 500 })
        }
    }

    readMore(id) {
        return (
            <Link to={`/entries/${id}`} className="lists__item-link">
                read more
            </Link>
        )      
    }

    renderList() {
        return this.props.entries.map(entry => {
            return (
                <div className="lists__item" key={entry.id}>
                    <h2 className="lists__item-title">{entry.title}</h2>
                    <p className="lists__item-content">{`${entry.content.substring(0,this.state.contentLength).trim()}... `}{this.readMore(entry.id)}</p>
                </div>
            )
        })
    }

    render() {
        if(!this.props.entries) {
            return <div>Loading...</div>
        }

        return (
            <div className="lists">
                <h1 className="heading-1 u-margin-bottom-small center">Entry List</h1>
                <div className="lists__items">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { entries: Object.values(state.entries) }
}

export default connect(mapStateToProps, { fetchEntries })(BlogList);