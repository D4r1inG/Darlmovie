import React, { useEffect, useState } from 'react'
import { Table, Tag, Space, Popconfirm } from 'antd';
import { layDanhSachNguoiDung, timKiemNguoiDungAction, xoaNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { EDIT_USER } from '../../redux/actions/types/QuanLyNguoiDungTypes';

const { Search } = Input;


export default function DashBoard() {

  const dispatch = useDispatch()
  const { danhSachNguoiDung, danhSachTimKiem } = useSelector(state => state.QuanLyNguoiDungReducer)


  useEffect(() => {
    dispatch(timKiemNguoiDungAction(''))
  }, [])

  const columns = [
    {
      title: 'Họ ten',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matKhau',
      key: 'matKhau',

    },
    {
      title: 'Mã loại người dùng',
      key: 'maLoaiNguoiDung',
      dataIndex: 'maLoaiNguoiDung',
      render: (text, record) => {
        let color = ''
        let innerText = ''
        if (record.maLoaiNguoiDung === "KhachHang") {
          color = "geekblue"
          innerText = "Khách hàng"
        } else {
          color = 'volcano'
          innerText = 'Quản trị'
        }
        return <Tag color={color} key={record.maLoaiNguoiDung}>
          {innerText.toUpperCase()}
        </Tag>
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <NavLink to={`/admin/users/edituser/:${record.taiKhoan}`} onClick={() => {
            dispatch({
              type: EDIT_USER,
              userEdit: record
            })
          }}>Edit</NavLink>
          <Popconfirm
            placement="left"
            title={`Bạn có chắc muốn xóa ${record.hoTen} ? `}
            onConfirm={() => {
              dispatch(xoaNguoiDungAction(record.taiKhoan))
            }}
            okText="Yes"
            cancelText="No"
          >
            <span style={{ cursor: 'pointer' }} className='text-red-500'>Delete</span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3 className='text-xl'>Danh sách người dùng</h3>
      <Search className='mb-2' placeholder="Tìm kiếm người dùng" loading enterButton onChange={(e) => {
        dispatch(timKiemNguoiDungAction(e.target.value))
      }} />
      <Table rowKey={'taiKhoan'} columns={columns} dataSource={danhSachTimKiem} />
    </div>
  )
}
