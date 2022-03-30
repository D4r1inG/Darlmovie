import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getCarouselAction } from '../../../../redux/actions/CarouselAction';
import './HomeCarousel.css'

const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat'
};


export default function HomeCarousel(props) {

    const dispatch = useDispatch()
    const { arrCarousel } = useSelector(state => state.CarouselReducer)

    useEffect(() => {
        dispatch(getCarouselAction())
    }, [])

    return (
        <Carousel effect="fade" className='w-full pt-20 m-0 z-20'>
            {arrCarousel.map((item, index) => {

                return <div key={index}>
                    <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                        <img src={item.hinhAnh} className='w-full opacity-0' alt={index} />
                    </div>
                </div>
            })}
        </Carousel>
    )
}
