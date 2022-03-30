import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../redux/actions/QuanLyFilmAction';
import { GROUPID } from '../../../util/settings/config';


export default function AddNew() {

    const [imgSrc, setImgSrc] = useState(null)
    const [componentSize, setComponentSize] = useState('default');
    const dispatch = useDispatch()

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {}
        },
        onSubmit: (values) => {
            let formData = new FormData()   
            values.maNhom = GROUPID

            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    formData.append(key, values.hinhAnh, values.hinhAnh.name)
                }
            }

            dispatch(themPhimUploadHinhAction(formData))
        }
    })

    const handleChangeDatePicker = (value) => {
        formik.setFieldValue('ngayKhoiChieu', moment(value).format('DD/MM/YYYY'))
    }

    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    const handleChangeFile = (e) => {
        let file = e.target.files[0]

        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImgSrc(e.target.result)
        }


        formik.setFieldValue('hinhAnh', file)
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
                <Input name='tenPhim' onChange={formik.handleChange} />
            </Form.Item>

            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} />
            </Form.Item>

            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} />
            </Form.Item>

            <Form.Item label="Ngày khởi chiếu">
                <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} />
            </Form.Item>

            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('dangChieu')} />
            </Form.Item>

            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('sapChieu')} />
            </Form.Item>

            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('hot')} />
            </Form.Item>

            <Form.Item label="Đánh giá">
                <InputNumber onChange={handleChangeInputNum('danhGia')} min='0' max='10' />
            </Form.Item>

            <Form.Item label="Hình ảnh">
                <input type='file' accept='image/*' onChange={handleChangeFile} />
                {imgSrc === null ? '' : <img className='mt-3' src={imgSrc} width={150} height={150} alt='hinh anh' />}
            </Form.Item>

            <Form.Item className='justify-end'>
                <button className='bg-purple-500 text-white rounded-lg py-2 px-4' type='submit'>Thêm phim</button>
            </Form.Item>
        </Form>
    );

}