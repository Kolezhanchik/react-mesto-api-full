import React from 'react';

function Footer() {
    const today = new Date();
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy;2020 - {today.getFullYear()} Mesto Russia</p>
        </footer>
    )
}

export default Footer;