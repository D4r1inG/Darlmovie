import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { dangKyAction, dangNhapAction, layDanhSachNguoiDung } from '../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../util/settings/config';
import * as Yup from 'yup'

export default function Register() {

  const dispatch = useDispatch()
  const { userLogin, danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
  let [errors, setErrors] = useState({
    taiKhoan: '',
    email: ''
  })

  useEffect(() => {
    dispatch(layDanhSachNguoiDung())
  }, [])

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUPID,
      hoTen: "",

    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string(),
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
      soDt: Yup.number()
        .typeError("Số điện thoại không hợp lệ")
        .positive("Số điện thoại không hợp lệ")
        .integer("Số điện thoại không hợp lệ")
        .min(8, "Số điện thoại tối thiểu 8 ký tự")
        .required('Số điện thoại không được bỏ trống!'),
    }),
    onSubmit: values => {
      let indexTaiKhoan = danhSachNguoiDung.findIndex(item => item.taiKhoan === formik.values.taiKhoan)
      let indexEmail = danhSachNguoiDung.findIndex(item => item.email === formik.values.email)
      let flag = true
      if (indexTaiKhoan !== -1) {
        setErrors({
          ...errors,
          taiKhoan: "Tài khoản đã có người sử dụng"
        })
        flag = false
      } else {
        setErrors({
          ...errors,
          taiKhoan: ""
        })
      }
      if (indexEmail !== -1) {
        setErrors({
          ...errors,
          email: "Email đã có người sử dụng"
        })
        flag = false
      } else {
        setErrors({
          ...errors,
          email: ""
        })
      }

      if (flag) {
        // console.log(values)
        dispatch(dangKyAction(values))
      }

    },
  });


  return (
    <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm">
      <div className="py-4 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <svg fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 text-purple-800">
            <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
            <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>
          </svg>
          <span className='text-purple-800 ml-3 text-xl'>
            DarlMovie
          </span>
        </div>
      </div>
      <div className="mt-5 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-8 xl:px-16 xl:max-w-2xl">
        <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">Đăng ký</h2>
        <div className="mt-12">
          <div className='grid grid-cols-2 gap-10'>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
              <input name='taiKhoan' onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Nhập tài khoản..." />
              <span className='text-red-600'>{errors.taiKhoan}</span>
            </div>
            <div >
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">Mật Khẩu</div>
              </div>
              <input name='matKhau' onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='password' placeholder="Điền mật khẩu..." />
              {formik.errors.matKhau && formik.touched.matKhau && (
                <span className='text-red-600'>{formik.errors.matKhau}</span>
              )}
            </div>
            <div >
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
              </div>
              <input name='email' onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="mike@gmail.com" />
              <span className='text-red-600'>
                {formik.errors.email && formik.touched.email && (
                  <span >{formik.errors.email}</span>
                )}
                {errors.email}
              </span>
            </div>
            <div >
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">Số điện thoại</div>
              </div>
              <input name='soDt' onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Nhập số điện thoại..." />
              {formik.errors.soDt && formik.touched.soDt && (
                <span className='text-red-600'>{formik.errors.soDt}</span>
              )}
            </div>
            <div className='col-span-2'>
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">Họ tên</div>
              </div>
              <input name='hoTen' onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Điền họ tên..." />
              {formik.errors.hoTen && formik.touched.hoTen && (
                <span className='text-red-600'>{formik.errors.hoTen}</span>
              )}
            </div>
          </div>
          <div className="mt-10">
            <button type='submit' className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
        shadow-lg">
              Đăng Ký
            </button>
          </div>
          <div className="mt-6 text-sm font-display font-semibold text-gray-700 text-center">
            Đã có tài khoản? <NavLink to='/login' className="cursor-pointer text-indigo-600 hover:text-indigo-800">Đăng nhập ngay!</NavLink>
          </div>
        </div>
      </div>
    </form>
  )
}
