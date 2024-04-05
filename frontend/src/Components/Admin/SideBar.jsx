import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";
import { FaBoxOpen } from "react-icons/fa6";
import { IoIosColorPalette } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";
import { CiMoneyBill } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { signOut } from '../../reducer/AdminSlice';

const SideBar = () => {
    const dispatcher = useDispatch();
    const navigator = useNavigate();
    return (
        <>
            <div className='bg-gray-600 hidden tablet:block h-screen sticky top-0 left-0'>
                <h2 className='text-2xl desktop:text-3xl text-center text-white py-4 font-semibold'>iShop Admin</h2>
                <hr />

                <ul className='text-white pl-6 mt-4'>
                    <li className='py-2'>
                        <Link to='/admin' className='flex items-center gap-3 text-lg'>
                            <MdDashboard /> Dashboard
                        </Link>
                    </li>
                    <li className='py-2'>
                        <Link to='/admin/category' className='flex items-center gap-3 text-lg'>
                            <TfiAgenda /> Category
                        </Link>
                    </li>
                    <li className='py-2'>
                        <Link to='/admin/color' className='flex items-center gap-3 text-lg'>
                            <IoIosColorPalette className='text-2xl' /> Color
                        </Link>
                    </li>
                    <li className='py-2'>
                        <Link to='/admin/product' className='flex items-center gap-3 text-lg'>
                            <FaBoxOpen /> Product
                        </Link>
                    </li>
                    <li className='py-2'>
                        <Link to='/admin/orders' className='flex items-center gap-3 text-lg'>
                            <BsCart4 /> Orders
                        </Link>
                    </li>
                    <li className='py-2'>
                        <Link to='/admin/transition' className='flex items-center gap-3 text-lg'>
                            <CiMoneyBill /> Transition
                        </Link>
                    </li>
                    <li className='py-2'>
                        <Link to='/admin/author' className='flex items-center gap-3 text-lg'>
                            <RiAdminFill /> Author
                        </Link>
                    </li>
                    <li className='py-2'>
                        <Link onClick={()=> {
                            dispatcher(signOut());
                            navigator("/admin/sign-in")
                        }} className='flex items-center gap-3 text-lg'>
                            <FaSignOutAlt /> Sign out
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='flex items-center bg-white text-2xl w-full p-2 text-black justify-around fixed left-0 bottom-0 border border-top rounded tablet:hidden'>
                <Link to='/admin' >
                    <MdDashboard />
                </Link>
                <Link to='/admin/category' >
                    <TfiAgenda />
                </Link>
                <Link to='/admin/color' >
                    <IoIosColorPalette />
                </Link>
                <Link to='/admin/product' >
                    <FaBoxOpen />
                </Link>
            </div>
        </>
    );
}

export default SideBar;
