import { DownOutlined, LockOutlined, PaperClipOutlined, PhoneOutlined, ScheduleOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Input } from 'antd'
import { useFormik } from 'formik'
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capNhatThongTinNguoiDungAction, layDanhSachNguoiDung, layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction'
import { GROUPID } from '../../util/settings/config'
import * as Yup from 'yup'

export default function Profile() {

  const { thongTinNguoiDung, danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
  const dispatch = useDispatch()
  const [editUser, setEditUser] = useState(false)
  const [errors, setErrors] = useState('')

  useEffect(() => {
    dispatch(layThongTinNguoiDungAction())
    dispatch(layDanhSachNguoiDung())
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinNguoiDung.taiKhoan,
      matKhau: thongTinNguoiDung.matKhau,
      email: thongTinNguoiDung.email,
      soDT: thongTinNguoiDung.soDT,
      maNhom: GROUPID,
      hoTen: thongTinNguoiDung.hoTen,
      maLoaiNguoiDung: "KhachHang",
    },
    validationSchema: Yup.object({
      hoTen: Yup.string()
        .min(2, "Họ tên tối thiểu 2 ký tự")
        .max(15, "Họ tên tối thiểu 15 ký tự")
        .required("Họ tên không được bỏ trống!"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được bỏ trống!"),
      matKhau: Yup.string()
        .min(8, "Mật khẩu tối thiểu 8 ký tự")
        .required("Mật khẩu không được bỏ trống!"),
      soDT: Yup.number()
        .typeError("Số điện thoại không hợp lệ")
        .positive("Số điện thoại không hợp lệ")
        .integer("Số điện thoại không hợp lệ")
        .min(8, "Số điện thoại tối thiểu 8 ký tự")
        .required('Số điện thoại không được bỏ trống!'),
    }),
    onSubmit: values => {
      let indexEmail = danhSachNguoiDung.findIndex(item => item.email === formik.values.email && item.email !== thongTinNguoiDung.email)
      if (indexEmail !== -1) {
        setErrors("Email đã có người sử dụng")
      }else{
        setErrors('')
      }
      if(errors === '') {
        dispatch(capNhatThongTinNguoiDungAction(values))
      }
    },
  });

  const renderTicketItem = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((item, index) => {
      const seats = _.first(item.danhSachGhe)
      if (index % 2 !== 0) {
        return <div className="flex flex-row-reverse md:contents" key={index}>
          <div className="bg-white text-black col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-xl border border-gray-100">
            <h3 className="font-semibold text-lg mb-1">{item.tenPhim}</h3>
            <div className="leading-tight text-justify">
              <p className='text-gray-400'>
                Giờ chiếu: {moment(item.ngayDat).format('hh:mm A')} - Ngày chiếu: {moment(item.ngayDat).format('DD/MM/YYYY')}
              </p>

              <p className='m-0'>Địa điểm: {seats.tenHeThongRap}</p>
              <p>Rạp: {seats.tenCumRap}</p>
              <div className='grid grid-cols-12'>
                <p className='col-span-2 mr-3'>Số ghế:</p>
                <div className='grid grid-cols-6 col-span-10 gap-2'>
                  {item.danhSachGhe.map((ghe, index) => {
                    return <span key={index} className='bg-gray-700 rounded-md p-2 text-white text-center'>
                      {ghe.tenGhe}
                    </span>
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-start-5 col-end-6 md:mx-auto relative mr-10 z-0">
            <div className="h-full w-6 flex items-center justify-center">
              <div className="h-full w-1 bg-purple-600 pointer-events-none" />
            </div>
            <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-purple-800 shadow" />
          </div>
        </div>
      } else {
        return <div className="flex md:contents" key={index}>
          <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative z-0">
            <div className="h-full w-6 flex items-center justify-center">
              <div className="h-full w-1 bg-purple-600 pointer-events-none" />
            </div>
            <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-purple-800 shadow" />
          </div>
          <div className="bg-white text-black col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-xl border border-gray-100">
            <h3 className="font-semibold text-lg m-0">{item.tenPhim}</h3>
            <div className="leading-tight text-justify">
              <p className='text-gray-400'>
                Giờ chiếu: {moment(item.ngayDat).format('hh:mm A')} - Ngày chiếu: {moment(item.ngayDat).format('DD/MM/YYYY')}
              </p>

              <p className='m-0'>Địa điểm: {seats.tenHeThongRap}</p>
              <p>Rạp: {seats.tenCumRap}</p>
              <div className='grid grid-cols-12'>
                <p className='col-span-2 mr-3'>Số ghế:</p>
                <div className='grid grid-cols-6 col-span-10 gap-2'>
                  {item.danhSachGhe.map((ghe, index) => {
                    return <span key={index} className='bg-gray-700 rounded-md p-2 text-white text-center'>
                      {ghe.tenGhe}
                    </span>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    })
  }

  return <div className='min-h-screen' >
    <div className=" grid grid-cols-12 gap-32 ">
      <div className='col-span-3 ml-5'>
        <form onSubmit={formik.handleSubmit} className=' top-1/4 fixed shadow-2xl min-w-max px-10 rounded-lg p-6 border-t-2 border-purple-400 z-0'>
          <h1 className='text-center text-xl mb-5 flex items-center'><UserOutlined className='mr-3' /> <span>Thông tin người dùng</span></h1>
          <div className='grid grid-cols-2'>
            <div>
              <p className='font-bold mb-6'>Tài khoản: </p>
              <div className='relative'>
                <p className='font-bold mb-6'>Mật khẩu: </p>
                {formik.errors.matKhau && formik.touched.matKhau && (
                  <span style={{whiteSpace: 'nowrap'}} className='text-red-600 absolute -bottom-5'>{formik.errors.matKhau}</span>
                )}
              </div>
              <div className='relative'>
                <p className='font-bold mb-6'>Email: </p>
                {errors !== '' ? <span style={{whiteSpace: 'nowrap'}} className='text-red-600 absolute -bottom-5'>{errors}</span> : ''}
                {formik.errors.email && formik.touched.email && (
                  <span style={{whiteSpace: 'nowrap'}} className='text-red-600 absolute -bottom-5'>{formik.errors.email}</span>
                )}
              </div >
              <p className='font-bold mb-6'>Họ và tên:</p>
              <div className='relative'>
                <p className='font-bold mb-6'>Số điện thoại:</p>
                {formik.errors.soDT && formik.touched.soDT && (
                  <span style={{whiteSpace: 'nowrap'}} className='text-red-600 absolute -bottom-5'>{formik.errors.soDT}</span>
                )}
              </div>
            </div>
            <div>
              {editUser ?
                <div className='flex-col flex'>
                  <Input className='mb-3' name='taiKhoan' disabled defaultValue={formik.values.taiKhoan} prefix={<UserOutlined />} onChange={formik.handleChange} />
                  <Input className='mb-3' name='matKhau' defaultValue={formik.values.matKhau} prefix={<LockOutlined />} onChange={formik.handleChange} />
                  <Input className='mb-3' name='email' status={errors !== '' ? 'error' : ''} defaultValue={formik.values.email} prefix={<PaperClipOutlined />} onChange={formik.handleChange} />
                  <Input className='mb-3' name='hoTen' defaultValue={formik.values.hoTen} prefix={<ScheduleOutlined />} onChange={formik.handleChange} />
                  <Input className='mb-3' name='soDT' defaultValue={formik.values.soDT} prefix={<PhoneOutlined />} onChange={formik.handleChange} />
                </div>
                :
                <div>
                  <p className='mb-6'>{thongTinNguoiDung.taiKhoan}</p>
                  <p className='mb-6'>{thongTinNguoiDung.matKhau}</p>
                  <p className='mb-6'>{thongTinNguoiDung.email}</p>
                  <p className='mb-6'>{thongTinNguoiDung.hoTen}</p>
                  <p className='mb-6'>{thongTinNguoiDung.soDT}</p>
                </div>
              }

            </div>
          </div>
          {!editUser ? <button type='button' className='text-white text-xl w-full bg-purple-600 p-2 mt-3 rounded-lg' onClick={() => {
            setEditUser(!editUser)
          }}>Cập nhật thông tin</button> : ''}
          {editUser ?
            <div className='flex'>
              <button type='submit' className='text-white text-xl w-full bg-green-600 p-2 mt-3 rounded-lg' onClick={() => {
                // setEditUser(!editUser)
              }}>Lưu thay đổi</button>
              <button type='button' className='text-white text-xl w-full bg-red-600 p-2 mt-3 rounded-lg ml-4' onClick={() => {
                setEditUser(!editUser)
              }}>Hủy bỏ</button>
            </div> : ''}
        </form>
      </div>
      <div className='col-span-9 pt-24 ml-16'>
        <h3 className='text-2xl text-center'>Lịch sử đặt vé</h3>
        <div className="flex flex-col md:grid grid-cols-9 mx-auto p-2 text-blue-50 ">
          {renderTicketItem()}
        </div>
      </div>
    </div>
  </div>
}
