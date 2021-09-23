import React from 'react';
import { AnimatePresence } from 'framer-motion'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEntries, deleteEntry } from '../actions'
import history from '../history';

import './BlogList.scss'
import Modal from './Modal';

class BlogList extends React.Component {
    constructor() {
        super()
        this.state = {
            currentPage: 1,
            contentLength: 350,
            modalOpen: false,
            entry: null
        }
        this.listener = () => {
            if(this.state.modalOpen) {
                this.close();
            }
        }     
    }

    numOfPage() {
        return this.props.location.search.slice(6);
    }

    close = () => {
        this.setState({ modalOpen: false })
    }

    open = () => {
        this.setState({ modalOpen: true })
    }

    async componentDidMount() {
        this._isMounted = true;
        await this.props.fetchEntries(this.numOfPage() === '' ? 1 : +this.numOfPage());
        this.setState({ currentPage: this.numOfPage() === '' ? 1 : +this.numOfPage()})
        document.addEventListener('click',  this.listener)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.listener)
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
                            <span onClick={(e) => this.onClickDelete(e, entry)} className="lists__item-action">Delete</span>
                        </div>
                        <h2 className="lists__item-title">{entry.title}</h2>
                        {this.renderContent(entry.content, entry.id)}
                    </div> 
                )
            }
        })
    }

    onClickDelete(e, entry) {
        e.stopPropagation();
        this.setState({ entry })
        this.state.modalOpen ? this.close() : this.open()
    }

    delete = async () => {
        this.close();
        await this.props.deleteEntry(this.state.entry.id)
        await this.props.fetchEntries(this.state.currentPage)
        this.setState({ currentPage: +this.numOfPage() })
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
                            this.setState({ currentPage: +page })
                            this.props.fetchEntries(page)
                            history.push(`/?page=${page}`)
                            }}>
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
                <h1 className="heading-1 u-margin-bottom-small center">{this.props.entries.length !== 1 ? 'Entry List' : 'Empty, add a new entry!'}</h1>
                <div className="lists__items">
                    {this.renderList()}
                </div>
                <div className="lists__pagination">
                    {this.renderPagination()}
                </div>
                <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={() => null}
                >
                    {this.state.modalOpen && <Modal handleClose={this.close} handleDelete={this.delete} text={this.state.entry.title}/>}
                </AnimatePresence>
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

export default connect(mapStateToProps, { fetchEntries, deleteEntry })(BlogList);