import React, { Fragment } from 'react'
import { Tabs, Radio, Space } from 'antd';
import { NavLink } from 'react-router-dom'
import moment from 'moment';

const { TabPane } = Tabs;

function HomeMenu(props) {

    const { heThongRapChieu } = props

    const renderHeThongRapChieu = () => {
        return heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane tab={<img src={heThongRap.logo} className='rounded-full w-12' alt='img' />} key={index}>
                <Tabs tabPosition={'left'} className='w-full mx-auto'>
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        // console.log(cumRap)
                        return <TabPane tab={
                            <div className='flex items-center' style={{ width: 300 }}>
                                <img className='rounded-lg' src={cumRap.hinhAnh} width='50' alt='img' />
                                <div className='text-left ml-3'>
                                    <p className='text-black m-0'>{cumRap.tenCumRap}</p>
                                    <sub className='text-red-600'>Chi tiết</sub>
                                </div>
                            </div>
                        } key={index}>
                            {cumRap?.danhSachPhim.map((phim, index) => {
                                return <Fragment key={index}>
                                    <div className='flex my-5'>
                                        <img width='75' height='75' className='rounded-lg' src={phim.hinhAnh} alt={phim.tenPhim} />
                                        <div className='ml-4 w-full'>
                                            <div className=' font-semibold'>{phim.tenPhim}</div>
                                            <sub>{cumRap.diaChi}</sub>
                                            <div className='grid grid-cols-6 gap-5 mt-3'>
                                                {phim.lstLichChieuTheoPhim?.splice(0,12).map((lich, index) =>{
                                                    return <NavLink to={`/checkout/${lich.maLichChieu}/${phim.maPhim}`} key={index} > 
                                                        {moment(lich.ngayChieuGioChieu).format('hh:mm A')}
                                                    </NavLink>
                                                }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }

    return (
        <Tabs tabPosition={'left'} className='w-full mx-auto '>
            {renderHeThongRapChieu()}
        </Tabs>
    )
}

export default React.memo(HomeMenu)