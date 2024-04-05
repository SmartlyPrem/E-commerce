import React from 'react';
import { MdAccountCircle } from "react-icons/md";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='w-full bg-white shadow rounded p-2 sticky top-0 z-9999 flex justify-between'>
            Header
            <Link to="/admin/profile">
                <MdAccountCircle className='text-3xl cursor-pointer' />
            </Link>
        </div>
    );
}

export default Header;
