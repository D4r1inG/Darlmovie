import React from 'react'
import parse from 'html-react-parser'
import './Film.css'
import { NavLink } from 'react-router-dom'
import moment from 'moment'


export default function Films(props) {

    const { item } = props

    return (
        <div className="max-w-xs my-5 p-6 rounded-md shadow-md dark:bg-coolGray-900 dark:text-coolGray-50" >
            <div className="flip-card ">
                <div className="flip-card-inner h-72 rounded-md">
                    <div className="flip-card-front">
                        <img src={item.hinhAnh} alt="" className="object-cover object-center w-full rounded-md h-full" />
                    </div>
                    <div className="flip-card-back relative">
                        <div className="dark:text-coolGray-100 p-5" >{item.moTa.length > 300 ? parse(item.moTa.slice(0, 300).concat('...')) : parse(item.moTa)}</div>
                        <span  className="block text-xs font-medium tracking-widest uppercase dark:text-violet-400 absolute bottom-5 left-14">Khởi chiếu: {moment(item.ngayKhoiChieu).format('DD-MM-YYYY')}</span>
                    </div>
                </div>
            </div>
            <h2 className="text-xl font-semibold tracking-wide mt-2 text-center" style={{ height: 56 }}>{item.tenPhim}</h2>
            <NavLink to={`/detail/${item.maPhim}`} className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-purple-400 text-gray-900">Đặt vé</NavLink>
        </div>
    )
}
