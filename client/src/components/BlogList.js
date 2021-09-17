import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEntries } from '../actions'

import './BlogList.scss'

class BlogList extends React.Component {
    constructor() {
        super()
        this.state = {
            currentPage: 1,
            width: 0,
            contentLength: 350
        }
    }

    componentDidMount() {
        this.props.fetchEntries('/entries?_page=1&_limit=4');
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

    readMore(id, text) {
        return (
            <Link onClick={this.onClick} to={`/entries/${id}`} className="lists__item-link">
                {text}
            </Link>
        )      
    }

    renderContent(content, id) {
        if(content.length >= this.state.contentLength) {
            return (
                <p className="lists__item-content">{content.substring(0,this.state.contentLength).trim()}... {this.readMore(id, 'read more')}</p>
            )  
        }

        return <p className="lists__item-content">{content} {this.readMore(id, 'show')}</p>
    }

    renderList() {
        return this.props.entries.map((entry) => {
            if(entry.title) {
                return (
                    <div className="lists__item" key={entry.id}>
                        <div className="lists__item-actions">
                            <Link to={`/entries/edit/${entry.id}`} className="lists__item-action">Edit</Link>
                            <Link to="" className="lists__item-action">Delete</Link>
                        </div>
                        <h2 className="lists__item-title">{entry.title}</h2>
                        {this.renderContent(entry.content, entry.id)}
                    </div> 
                )
            }
        })
    }

    links() {
        return this.props.link.split(', ')
            .map(link => link.split('; '))
            .map(link => [link[1].replace( /"/g, "").replace( "rel=", ""), link[0].slice(1, -1)] );
    }

    searchNumOfPage(element) {
        return element[1].match(/(e=.)/g)[0].replace('e=', '');
    }

    checkButton(element, lastPage) {
        return ((element[0] === 'first' && this.state.currentPage === 2) || (element[0] === 'last' && this.state.currentPage === lastPage-1))
    }

    renderPagination() {
        if(this.props.link) {
            const links = this.links();
            const lastPage = this.searchNumOfPage(links[links.length-1]);
            
            return links.map((el, index) => {
                const page = this.searchNumOfPage(el);
                if(+page !== this.state.currentPage && !this.checkButton(el, lastPage)){
                    return (
                        <button className="button" key={index} onClick={() => {
                            this.props.fetchEntries(el[1])
                            this.setState({ currentPage: +page }) }}>
                            {this.checkButton(el, lastPage) ? '' : `${el[0]}`}
                        </button>
                    )
                } 
            });
        } 
        
    }

    render() {
        return (
            <div className="lists">
                <h1 className="heading-1 u-margin-bottom-small center">Entry List</h1>
                <div className="lists__items">
                    {this.renderList()}
                </div>
                <div className="lists__pagination">
                    {this.renderPagination()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        entries: Object.values(state.entries),
        link: state.entries.link
    }
}

export default connect(mapStateToProps, { fetchEntries })(BlogList);