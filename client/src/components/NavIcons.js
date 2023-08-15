import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const NavIcons = () => {

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const goForward = () => {
        navigate(1);
    }

    return (
        <>
            <div className='navIcons'>
                <div onClick={goBack}>
                    <ArrowBackIcon className='navIcon' />
                </div>
                <div onClick={goForward}>
                    <ArrowForwardIcon className='navIcon' />
                </div>
            </div>
        </>
    )
}

export default NavIcons;