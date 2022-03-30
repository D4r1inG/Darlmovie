import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { quanLyNguoiDungService } from '../../services/QuanLyNguoiDungService';
import { useFormik } from 'formik';
import { GROUPID } from '../../util/settings/config';
import * as Yup from 'yup'
import { chinhSuaThongTinNguoiDungAction, layDanhSachNguoiDung, themNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';

const { Option } = Select;

export default function EditUser() {

    const dispatch = useDispatch()
    const { danhSachNguoiDung, userEdit } = useSelector(state => state.QuanLyNguoiDungReducer)
    const [arrLoaiNguoiDung, setArrLoaiNguoiDung] = useState([])
    let [errors, setErrors] = useState({
        taiKhoan: '',
        email: ''
    })


    useEffect(async () => {
        dispatch(layDanhSachNguoiDung())

        try {
            const { data, status } = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung()
            if (status === 200) {
                setArrLoaiNguoiDung(data.content)
            }
        } catch (err) {
            console.log(err.response?.data)
        }
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: userEdit.taiKhoan,
            matKhau: userEdit.matKhau,
            email: userEdit.email,
            soDt: userEdit.soDt,
            maNhom: GROUPID,
            hoTen: userEdit.hoTen,
            maLoaiNguoiDung: userEdit.maLoaiNguoiDung,
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
            let indexTaiKhoan = danhSachNguoiDung.filter(item => item.taiKhoan !== userEdit.taiKhoan).findIndex(item => item.taiKhoan === formik.values.taiKhoan )
            let indexEmail = danhSachNguoiDung.filter(item => item.email !== userEdit.email).findIndex(item => item.email === formik.values.email)
            let flag = true
            setErrors({
                email: "",
                taiKhoan: ""
            })
            if (indexTaiKhoan !== -1) {
                setErrors({
                    ...errors,
                    taiKhoan: "Tài khoản đã có người sử dụng"
                })
                flag = false
            }

            if (indexEmail !== -1) {
                setErrors({
                    ...errors,
                    email: "Email đã có người sử dụng"
                })
                flag = false
            }

              if (flag) {
                // console.log(values)
                dispatch(chinhSuaThongTinNguoiDungAction(values))
              }

        },
    });

    const handleChangeLoaiNguoiDung = (value) => {
        formik.setFieldValue("maLoaiNguoiDung", value)
    }

    return (

        <div className=" bg-gray-100 flex py-10 justify-center ">
            <div className=" max-w-screen-lg mx-auto">
                <div>
                    <h2 className="font-semibold text-xl text-gray-600">Chỉnh sửa người dùng</h2>
                    <div className="bg-white rounded shadow-lg  px-8  pt-20 pb-8">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Thông tin cá nhân</p>
                                <p>Điền đủ tất cả các trường để tiếp tục.</p>
                            </div>
                            <div className="lg:col-span-2">
                                <form onSubmit={formik.handleSubmit} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-3">
                                        <label className='font-semibold' htmlFor="hoTen">Họ tên</label>
                                        <input type="text" name="hoTen" id="hoTen" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formik.values.hoTen} onChange={formik.handleChange} />
                                        {formik.errors.hoTen && formik.touched.hoTen && (
                                            <span className='text-red-600'>{formik.errors.hoTen}</span>
                                        )}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className='font-semibold' htmlFor="email">Email</label>
                                        <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" value={formik.values.email} onChange={formik.handleChange} />
                                        {formik.errors.email && formik.touched.email && (
                                            <span className='text-red-600 mr-3'>{formik.errors.email}</span>
                                        )}
                                        <span className='text-red-600'>{errors.email}</span>
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className='font-semibold' htmlFor="taiKhoan">Tài khoản</label>
                                        <input type="text" name="taiKhoan" id="taiKhoan" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formik.values.taiKhoan} onChange={formik.handleChange} />
                                        {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                                            <span className='text-red-600 mr-3'>{formik.errors.taiKhoan}</span>
                                        )}
                                        <span className='text-red-600'>{errors.taiKhoan}</span>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className='font-semibold' htmlFor="matKhau">Mật khẩu</label>
                                        <input type="text" name="matKhau" id="matKhau" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formik.values.matKhau} onChange={formik.handleChange} />
                                        {formik.errors.matKhau && formik.touched.matKhau && (
                                            <span className='text-red-600'>{formik.errors.matKhau}</span>
                                        )}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className='font-semibold' htmlFor="soDt">Số điện thoại</label>
                                        <input type="text" name="soDt" id="soDt" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formik.values.soDt} onChange={formik.handleChange} />
                                        {formik.errors.soDt && formik.touched.soDt && (
                                            <span className='text-red-600'>{formik.errors.soDt}</span>
                                        )}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className='font-semibold' htmlFor="maLoaiNguoiDung">Loại người dùng</label>
                                        <Select defaultValue={formik.values.maLoaiNguoiDung} style={{ width: 120, display: 'block', marginTop: '.5rem' }} onChange={handleChangeLoaiNguoiDung} >
                                            {arrLoaiNguoiDung.map((item, index) => {
                                                return <Option key={index} value={item.maLoaiNguoiDung}>{item.tenLoai}</Option>
                                            })}
                                        </Select>
                                    </div>
                                    <div className="md:col-span-5">
                                        <div className="inline-flex items-center">
                                            <label className='font-semibold' >Mã nhóm: GP00</label>
                                        </div>
                                    </div>

                                    <div className="md:col-span-5 text-right mt-8">
                                        <div className="inline-flex items-end">
                                            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Thêm người dùng</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
