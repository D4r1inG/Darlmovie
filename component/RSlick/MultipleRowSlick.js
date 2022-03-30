import React from 'react'
import Slider from "react-slick";
import Films from '../Films/Films';
import styleSlick from './MultipleRoeSlick.module.css'
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../redux/actions/types/QuanLyFilmTypes';

const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "90px",
    slidesToShow: 3,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
};

function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return <div className={`${className} ${styleSlick['slick-next']}`} style={{ ...style, display: 'block' }} onClick={onClick}></div>
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return <div className={`${className} ${styleSlick['slick-prev']}`} style={{ ...style, display: 'block', left: '-50px' }} onClick={onClick}></div>
}


export default function MultipleRowSlick(props) {
    const dispatch = useDispatch()

    const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer)

    const renderFilm = () => {
        return props.arrFilm.map((item, index) => {
            return <div className={`${styleSlick['width-item']}`} key={index}>
                <Films item={item} />
            </div>
        })
    }

    let activeClassDC = dangChieu ? 'active_Film' : 'none_active_Film'
    let activeClassSC = sapChieu ? 'active_Film' : 'none_active_Film'

    return (
        <div>
            <button type="button" className={`px-8 py-3 font-semibold rounded shadow-2xl	 bg-gray-100 text-gray-900 ${styleSlick[activeClassDC]}`} onClick={() => {
                dispatch({
                    type: SET_FILM_DANG_CHIEU
                })
            }}>Phim đang chiếu</button>
            <button type="button" className={`relative px-8 py-3 ml-4 overflow-hidden shadow-2xl font-semibold rounded bg-gray-100 text-gray-900 ${styleSlick[activeClassSC]}`} onClick={() => {
                dispatch({
                    type: SET_FILM_SAP_CHIEU
                })
            }}>Phim sắp chiếu
                <span className="absolute top-0 right-0 px-5 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 bg-purple-400">New</span>
            </button>
            <Slider {...settings}>
                {renderFilm()}
            </Slider>
        </div>
    )
}
