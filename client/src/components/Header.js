import React from 'react';
import { Link } from 'react-router-dom'
import './Header.scss'

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="header__item">
                Entries
            </Link>
            <Link to="/entries/new" className="header__item">
                New Entry
            </Link>
        </div>
    )
}

export default Header;