import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, Cascader, DatePicker, InputNumber } from 'antd';
import { quanLyRapService } from '../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../services/QuanLyDatVeService';

export default function ShowTime(props) {

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: []
  })

  useEffect(async () => {
    try {
      let { data, status } = await quanLyRapService.layThongTinHeThongRap()
      setState({
        ...state,
        heThongRapChieu: data.content
      })
    } catch (err) {

    }
  }, [])

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: ''
    },
    onSubmit: async (values) => {
      try {
        const { data, status } = await quanLyDatVeService.taoLichChieu(values)
        console.log(data)
      } catch (err) {
        console.log(err.response?.data)
      }
    }
  })

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangeHeThongRap = async (value) => {
    try {
      let { data, status } = await quanLyRapService.layThongTinCumRap(value)
      setState({
        ...state,
        cumRapChieu: data.content
      })
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  const handleChangeCumRap = (value) => {
    let maRap = value[0]
    formik.setFieldValue('maRap', maRap)
  }

  const onChange = (value, dateString) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
  }

  const onOk = (value) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))

  }

  const handleChangeInputNum = (value) => {
    formik.setFieldValue('giaVe', value)
  }

  let film = {}

  if (localStorage.getItem('filmParam')) {
    film = JSON.parse(localStorage.getItem('filmParam'))
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onSubmitCapture={formik.handleSubmit}
      autoComplete="off"
    >
      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <h3 className='text-lg'>Tạo lịch chiếu - {props.match.params.tenphim}</h3>
        <img src={film.hinhAnh} alt={film.tenphim} width={200} height={200} className='rounded-lg ' />
      </Form.Item>

      <Form.Item
        label="Hệ thống rạp"
      >
        <Cascader options={state.heThongRapChieu?.map((item, index) => ({ label: item.tenHeThongRap, value: item.tenHeThongRap }))}
          onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
      </Form.Item>

      <Form.Item
        label="Cụm rạp"
      >
        <Cascader options={state.cumRapChieu?.map((item, index) => ({ label: item.tenCumRap, value: item.maCumRap }))}
          onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
      </Form.Item>

      <Form.Item
        label="Chọn ngày-giờ chiếu"
      >
        <DatePicker format={'DD/MM/YYYY hh:mm:ss'} showTime onChange={onChange} onOk={onOk} />
      </Form.Item>

      <Form.Item
        label="Giá vé"
      >
        <InputNumber min={75000} max={150000} onChange={handleChangeInputNum} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <Button type="primary" htmlType="submit">
          Tạo lịch chiếu
        </Button>
      </Form.Item>
    </Form>
  )
}
