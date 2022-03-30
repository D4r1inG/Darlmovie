import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datGheAction, datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction'
import './CheckOut.css'
import { CheckCircleOutlined, CheckOutlined, CloseOutlined, LeftOutlined, LoadingOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons'
import { CHANGE_DAT_VE_THANH_CONG, CHANGE_TAB_ACTIVE, DAT_GHE, DAT_VE } from '../../redux/actions/types/QuanLyDatVeTypes'
import _ from 'lodash'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe'
import { TOKEN, USER_LOGIN } from '../../util/settings/config'
import { Button, Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction'
import moment from 'moment'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { connection } from '../..'
import { history } from '../../App'
import { layThongTinPhim } from '../../redux/actions/QuanLyFilmAction'
import { KetQuaDatVe } from './KetQuaDatVe'

const { TabPane } = Tabs;

function Checkout(props) {

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
  const { chiTietphongVe, danhSachGheDangDat, danhSachGheKhachDat, datVeThanhCong } = useSelector(state => state.QuanLyDatVeReducer)
  const dispatch = useDispatch()
  const { thongTinPhim, danhSachGhe } = chiTietphongVe

  // console.log(danhSachGhe)

  useEffect(() => {
    dispatch(layChiTietPhongVeAction(props.match.params.id))

    dispatch({
      type: CHANGE_DAT_VE_THANH_CONG,
      datVe: false
    })

    connection.on('datVeThanhCong', () => {
      dispatch(layChiTietPhongVeAction(props.match.params.id))
    })

    connection.invoke('loadDanhSachGhe', props.match.params.id)

    //Load danh sách ghê đang đặt từ server về
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      // console.log(dsGheKhachDat)

      dsGheKhachDat = dsGheKhachDat.filter(user => user.taiKhoan !== userLogin.taiKhoan)

      let arrGheKhachDat = dsGheKhachDat.reduce((res, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe)
        return [...res, ...arrGhe]
      }, [])

      arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe')

      dispatch({
        type: DAT_GHE,
        arrGhe: arrGheKhachDat
      })
    })

    window.addEventListener('beforeunload', clearGhe)
    return () => {
      clearGhe()
      window.removeEventListener('beforeunload', clearGhe)

    }
  }, [])

  const clearGhe = function (e) {
    connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id)
  }

  const renderSeat = () => {
    return danhSachGhe?.map((item, index) => {

      let classSeatVip = item.loaiGhe === 'Vip' ? 'vip' : ''
      let classSeatOccupied = item.daDat ? 'occupied' : ''
      let classSeatSelected = ''
      let classMySeat = ''
      let classClientSeat = ''
      let indexGheKhachDat = danhSachGheKhachDat.findIndex(ghe => ghe.maGhe === item.maGhe)
      let indexGheDangDat = danhSachGheDangDat.findIndex(ghe => ghe.maGhe === item.maGhe)
      let innerHtlm = []

      if (indexGheDangDat !== -1) {
        classSeatSelected = 'selected'
      }

      if (indexGheKhachDat !== -1) {
        classClientSeat = 'clientSeat'
      }

      if (item.taiKhoanNguoiDat === userLogin.taiKhoan) {
        classMySeat = 'mySeat'
      }

      if (item.daDat && item.taiKhoanNguoiDat !== userLogin.taiKhoan) {
        innerHtlm.push(<CloseOutlined key={index} className='pb-1' />)
      } else if (!item.daDat && item.taiKhoanNguoiDat !== userLogin.taiKhoan && classClientSeat === '') {
        innerHtlm.push(item.stt)
      } else if (item.daDat && item.taiKhoanNguoiDat === userLogin.taiKhoan) {
        innerHtlm.push(<SafetyCertificateOutlined key={index} className='pb-1' />)
      } else if (classClientSeat !== '') {
        innerHtlm.push(!item.daDat && <LoadingOutlined key={index} className='' />)
      }

      return <Fragment key={index} >
        <button onClick={() => {
          dispatch(datGheAction(item, props.match.params.id))
        }} disabled={item.daDat || classClientSeat !== ''} className={`seat ${classClientSeat} ${classMySeat} ${classSeatVip} ${classSeatOccupied} ${classSeatSelected} text-gray-100 text-center text-xs`}>
          {innerHtlm}
        </button>
        {(index + 1) % 16 === 0 ? <br /> : ''}
      </Fragment>
    })
  }


  return (
    <div className='h-screen'>
      <div className='grid grid-cols-12 h-full'>
        <div className='col-span-9 relative mt-10'>
          <div className='bg-black h-3 mx-24 mt-5'></div>
          <div className={`trapezoid text-center text-black`}>
            <p className='pt-2 mb-0 text-xl'>Màn hình</p>
          </div>
          <div className='mx-auto w-max mt-5'>
            {renderSeat()}
          </div>
          <div className='absolute bottom-0 left-1/2 w-max' style={{ transform: 'translateX(-50%)' }}>
            <ul className="showcase">
              <li>
                <div className="seat" />
                <small>N/A</small>
              </li>
              <li>
                <div className="seat" style={{ backgroundColor: '#6feaf6' }} />
                <small>Đang chọn</small>
              </li>
              <li>
                <div className="seat occupied text-center text-white" >
                  <CloseOutlined className='pb-1' />
                </div>
                <small>Đã đặt</small>
              </li>
              <li>
                <div className="seat clientSeat text-center text-white" >
                  <LoadingOutlined />
                </div>
                <small>Ghế khách đang chọn</small>
              </li>
              <li>
                <div className="seat mySeat text-center text-white" >
                  <SafetyCertificateOutlined className='pb-1' />
                </div>
                <small>Ghế của bạn</small>
              </li>
            </ul>

          </div>
        </div>
        <div className='col-span-3  flex flex-col justify-between h-full shadow-2xl'>
          <div className='divide-y divide-light-blue-400 px-4 pb-4 mt-10'>
            <h3 className={`${danhSachGheDangDat.length > 0 ? 'text-green-500' : 'text-gray-400'}  text-center text-3xl mt-4`}>{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
              return tongTien += ghe.giaVe
            }, 0).toLocaleString()} đ</h3>
            <div className='pt-1'>
              <h3 className='text-xl'>{thongTinPhim.tenPhim}</h3>
              <p className='m-0'>{thongTinPhim.diaChi}</p>
              <p>{thongTinPhim.gioChieu}, {thongTinPhim.tenRap} - {thongTinPhim.ngayChieu}</p>
            </div>

            <div className='flex justify-between items-center py-2'>
              <div className='flex items-center'>
                <h4 className='text-red-500 m-0 text-xl'>Ghế</h4>
                <div className='grid grid-cols-4 gap-1 ml-3'>
                  {_.sortBy(danhSachGheDangDat, ['stt']).map((item, index) => {
                    return <span key={index} className='bg-gray-700 rounded-md text-center text-white p-2 text-sm '>{item.stt}</span>
                  })}
                </div>
              </div>
              <p className={` ${danhSachGheDangDat.length > 0 ? 'text-green-500' : 'text-gray-400'} m-0 text-xl`}>{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                return tongTien += ghe.giaVe
              }, 0).toLocaleString()} đ</p>
            </div>

            <div className='pt-1'>
              <p className='text-gray-400 mb-1'>Email</p>
              <p>{userLogin.email}</p>
            </div>

            <div className='pt-1'>
              <p className='text-gray-400 mb-1'>Phone</p>
              <p>{userLogin.soDT}</p>
            </div>

            <div className='flex justify-between items-center pt-1'>
              <div className='mb-2'>
                <p className='text-gray-400 mb-2'>Mã giảm giá</p>
                <p className='m-0'>a123123123</p>
                <input placeholder='Nhập tại đây...' />
              </div>
              <button className='bg-gray-400 text-white p-2 rounded-md'>Áp dụng</button>
            </div>

            <div className='pt-1'>
              <h4 className='text-xl'>Hình thức thanh toán</h4>
              <p className='text-red-500'>Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp</p>
            </div>
          </div>
          <div className=' w-full'>
            {/* <p className='pl-4'>Ve da mua ...</p> */}
            <button disabled={danhSachGheDangDat.length > 0 ? false : true} style={{ transition: 'all .3s' }} className={`text-3xl ${danhSachGheDangDat.length > 0 ? 'bg-green-500' : 'bg-gray-400'} text-white p-2 w-full`} onClick={() => {
              const thongTinDatVe = new ThongTinDatVe()
              thongTinDatVe.maLichChieu = props.match.params.id
              thongTinDatVe.danhSachVe = danhSachGheDangDat
              dispatch(datVeAction(thongTinDatVe))
            }}>Đặt vé</button>
          </div>
        </div>
      </div>
    </div>
  )

}

// function callback(key) {
//   console.log(key);
// }

export const CheckOutCom = function (props) {


  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
  const { tabActive, datVeThanhCong } = useSelector(state => state.QuanLyDatVeReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch({
        type: CHANGE_TAB_ACTIVE,
        key: '1'
      })
    }
  }, [])

  const operation = <Fragment>
    {!_.isEmpty(userLogin) ? <Fragment>
      <Button className='mr-2' onClick={() => { history.push('/home') }}>
        Home
      </Button>
      <Button className='mr-2' onClick={() => {
        history.push('/profile')
      }}>
        Profile
      </Button>

    </Fragment> : ''}
  </Fragment>

  return <div className='tabCheckOut'>
    <Tabs tabBarExtraContent={operation} defaultActiveKey='1' activeKey={tabActive} onChange={(key) => {
      dispatch({
        type: CHANGE_TAB_ACTIVE,
        key
      })
    }}>
      <TabPane tab={<span className='flex items-center'>
        {!datVeThanhCong ? <LoadingOutlined /> : <CheckOutlined />}
        Chọn ghế và thanh toán
      </span>} key="1">
        <Checkout {...props} />
      </TabPane>

      <TabPane disabled={!datVeThanhCong ? true : false} tab={<span className='flex items-center'>
        <CheckCircleOutlined />
        Kết quả đặt vé
      </span>}
        key="2">
        <KetQuaDatVe {...props} />
      </TabPane>

    </Tabs>
  </div>
}

 