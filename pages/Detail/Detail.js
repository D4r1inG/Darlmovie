import React, { useEffect, useState } from 'react'
import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circle.css'
import { Tabs, Radio, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { SET_CHI_TIET_FILM } from '../../redux/actions/types/QuanLyRapTypes';
import { layThongTinChiTietFilm } from '../../redux/actions/QuanLyRapAction';
import moment from 'moment';
import parse from 'html-react-parser'
import { Rate } from 'antd';
import {
    ArrowRightOutlined,
    StarOutlined
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';



const { TabPane } = Tabs;

export default function Detail(props) {

    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer)
    const [moTa, setMoTa] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        let { id } = props.match.params
        dispatch(layThongTinChiTietFilm(id))
    }, [])


    return (
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, minHeight: '100vh', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '100%' }}>
            <CustomCard
                style={{ paddingTop: 200, minHeight: '100vh' }}
                effectColor="#000" // required
                color="#fff" // default color is white
                blur={20} // default blur value is 10px
                borderRadius={-1} >
                <div className='grid grid-cols-12' >
                    <div className='col-span-5 col-start-3 flex flex-col'>
                        <img className='w-2/3 rounded-lg' src={filmDetail.hinhAnh} alt={filmDetail.hinhAnh} />
                        <div className='mt-5' >
                            <p>Ngày khởi chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                            <p className='text-2xl'>{filmDetail.tenPhim}</p>
                            <div style={{ cursor: 'pointer' }} onClick={() => {
                                setMoTa(!moTa)
                            }}>
                                {moTa ? parse(filmDetail.moTa) : 
                                <div className='flex items-center text-green-400'>
                                    <p className='m-0 mr-2 '>Mô tả</p>
                                    <ArrowRightOutlined />
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className='col-span-4 col-start-8 flex-col flex items-center justify-center' >
                        <div className=' mb-4'>
                            <p className='m-0 text-center text-yellow-300 text-xl'>Đánh giá </p>
                            <Rate allowHalf value={filmDetail.danhGia / 2} /></div>
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span>{filmDetail.danhGia * 10} %</span>
                            <div className="slice">
                                <div className="bar" />
                                <div className="fill" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className='bg-white mx-52  rounded-md  mt-10'>
                    <Tabs defaultActiveKey="1" centered >
                        <TabPane tab="Lịch chiếu" key="1" >
                            <div className=' container my-3 '>
                                <Tabs tabPosition={'left'} className='w-full mx-auto  '>
                                    {filmDetail.heThongRapChieu?.map((heThongRap, index) => {
                                        return <TabPane key={index} tab={
                                            <div className='flex items-start flex-col justify-center text-black' >
                                                <img src={heThongRap.logo} alt={heThongRap.tenHeThongRap} width='50' />
                                                <p className='mt-3'>{heThongRap.tenHeThongRap}</p>
                                            </div>}>
                                            {heThongRap.cumRapChieu?.map((item, index) => {
                                                return <div key={index} className='mb-7'>
                                                    <div className='flex items-center '>
                                                        <img src={item.hinhAnh} alt={item.tenCumRap} width='50' className='mr-3 rounded-md' />
                                                        <div>
                                                            <p className='m-0 font-bold'>{item.tenCumRap}</p>
                                                            <p className='m-0 text-xs text-gray-400'>{item.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-4 gap-3 mt-2'>
                                                        {item.lichChieuPhim?.slice(0, 10).map((lichChieu, index) => {
                                                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}/${filmDetail.maPhim}`} key={index} className='text-green-500 font-semibold'>
                                                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                            </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            })}
                                        </TabPane>
                                    })}
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane disabled tab="Thông tin" key="2" >
                            
                        </TabPane>
                        <TabPane disabled tab="Đánh giá" key="3" >
                            
                        </TabPane>
                    </Tabs>
                </div>


            </CustomCard>
        </div>
    )
}
