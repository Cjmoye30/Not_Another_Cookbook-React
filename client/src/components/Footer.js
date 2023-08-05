import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Footer.css'

const Footer = () => {
    return (
    <footer>
        <h2>Made with ❤️ and hunger in Charlotte, NC </h2>
        <p>Created by: <Link target='_blank' to='https://github.com/Cjmoye30'>Cambric Moye</Link> </p>
    </footer>
    )
}

export default Footer;