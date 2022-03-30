import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';

const { Option } = Select;

export default function Header() {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    const { t, i18n } = useTranslation();

    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button onClick={() => {
                    history.push('/login')
                }} className="self-center px-5 py-2 font-medium hover:text-gray-900 shadow-md rounded-lg mr-3 ">{t('signin')}</button>
                <button onClick={() => {
                    history.push('/register')
                }} className="self-center px-6 py-2 rounded-lg font-medium hover:bg-purple-800 bg-purple-700 text-white mr-3 shadow-md">{t('signup')}</button>

            </Fragment>
        } else {
            return <Fragment>

                <button onClick={() => {
                    history.push('/profile')
                }} className="self-center px-6 py-2 rounded-lg font-medium hover:bg-purple-800 bg-purple-700 text-white mr-3 shadow-md">Profile</button>
                <button className='mr-6 font-medium px-4 py-2 rounded-lg hover:text-gray-900 shadow-md' onClick={() => {
                    localStorage.removeItem(USER_LOGIN)
                    localStorage.removeItem(TOKEN)
                    history.push('/home')
                    window.location.reload()
                }}>
                    Đăng xuất
                </button>
            </Fragment>
        }
    }

    return (
        <header className="p-2 dark:bg-coolGray-800 dark:text-coolGray-100 bg-white fixed w-full text-gray-500 z-30 shadow-lg">
            <div className="flex justify-between h-16 items-center">
                <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <svg fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 text-purple-800">
                        <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
                        <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>
                    </svg>
                    <span className='text-purple-800 ml-3 text-xl'>
                        DarlMovie
                    </span>
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex mb-0 ml-24">

                    <li className="flex">
                        <NavLink to="/contact" style={{ cursor: 'pointer' }} rel="noopener noreferrer" className="flex shadow-md py-2 mx-2 items-center hover:text-gray-900 font-medium rounded-lg px-4 -mb-1 dark:border-transparent text-gray-500" activeClassName='border-4 border-purple-400'>{t('contact')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/home" rel="noopener noreferrer" className="flex shadow-md py-2 mx-2 items-center hover:text-gray-900 font-medium rounded-lg px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-gray-500" activeClassName='border-4 border-purple-400'>{t('home')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/admin/users" style={{ cursor: 'pointer' }} rel="noopener noreferrer" className="flex shadow-md py-2 mx-2 items-center hover:text-gray-900 font-medium rounded-lg px-4 -mb-1 dark:border-transparent text-gray-500" activeClassName='border-4 border-purple-400'>Admin</NavLink>
                    </li>

                </ul>
                <div className='flex items-center'>
                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        {renderLogin()}
                    </div>
                    <button className="p-4 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    <>
                        <Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
                            <Option value="en">English</Option>
                            <Option value="chi">Chinese</Option>
                            <Option value="vi">VietNam</Option>
                        </Select>
                    </>
                </div>
            </div>
        </header>

    )
}
