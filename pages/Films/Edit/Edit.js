import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhim, layThongTinPhim, themPhimUploadHinhAction } from '../../../redux/actions/QuanLyFilmAction';
import { GROUPID } from '../../../util/settings/config';


export default function Edit(props) {


    const [imgSrc, setImgSrc] = useState('')
    const [componentSize, setComponentSize] = useState('default');
    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layThongTinPhim(props.match.params.id))
    }, [])

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            dangChieu: thongTinPhim.dangChieu,
            sapChieu: thongTinPhim.sapChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            hinhAnh: null
        },
        onSubmit: (values) => {

            let formData = new FormData()
            values.maNhom = GROUPID

            for (let key in values) {
                if (key !== 'hinhAnh') {
                    if(key === 'ngayKhoiChieu'){
                        values[key] = moment(values[key]).format('DD/MM/YYYY')
                    }
                    formData.append(key, values[key])
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append(key, values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }

            dispatch(capNhatPhim(formData))
        }
    })

    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value);
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
    
    }

    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    const handleChangeFile = async (e) => {
        let file = e.target.files[0]

        await formik.setFieldValue('hinhAnh', file)
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImgSrc(e.target.result)
        }


    }

    const handleChangeInputNum = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: 'default',
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
        >
            <h3 className='text-xl'>Thêm mới phim</h3>
            <Form.Item label="Tên phim">
                <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
            </Form.Item>

            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
            </Form.Item>

            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
            </Form.Item>

            <Form.Item label="Ngày khởi chiếu">
                <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
            </Form.Item>

            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
            </Form.Item>

            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
            </Form.Item>

            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
            </Form.Item>

            <Form.Item label="Đánh giá">
                <InputNumber onChange={handleChangeInputNum('danhGia')} min='0' max='10' value={formik.values.danhGia} />
            </Form.Item>

            <Form.Item label="Hình ảnh">
                <input type='file' accept='image/*' onChange={handleChangeFile} />
                {imgSrc === null ? '' : <img className='mt-3' src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} width={150} height={150} alt='hinh anh' />}
            </Form.Item>

            <Form.Item className='justify-end'>
                <button className='bg-purple-500 text-white rounded-lg py-2 px-4' type='submit'>Cập nhật</button>
            </Form.Item>
        </Form>
    );

}