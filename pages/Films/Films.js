import React, { Fragment, useEffect } from 'react'
import { Button, Popconfirm, Table } from 'antd';
import { Input, Space } from 'antd';
import { AudioOutlined, CalendarOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachFilmAction, xoaPhimAction } from '../../redux/actions/QuanLyFilmAction';
import parse from 'html-react-parser'
import { NavLink } from 'react-router-dom';
import { history } from '../../App';


const { Search } = Input;


export default function Films() {

  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer)
  // console.log(arrFilm)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(layDanhSachFilmAction())
  }, [])

  const columns = [
    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend'],
      defaultSortOrder: 'descend',
      width: 120
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      render: (text, films, index) => {
        return <Fragment >
          <img className='min-w-max h-20 rounded-lg' src={films.hinhAnh} alt={films.tenPhim} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
        </Fragment>
      },
      width: 200
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim()
        let tenPhimB = b.tenPhim.toLowerCase().trim()
        if (tenPhimA > tenPhimB) {
          return 1
        } else {
          return -1
        }
      },
      sortDirections: ['descend'],
      width: 300
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => {
        let moTaA = a.moTa.toLowerCase().trim()
        let moTaAB = b.moTa.toLowerCase().trim()
        if (moTaA > moTaAB) {
          return 1
        } else {
          return -1
        }
      },
      render: (text, films) => {
        return <Fragment>
          {films.moTa.length > 100 ? parse(films.moTa?.substr(0, 100)) + '...' : parse(films.moTa)}
        </Fragment>
      },
      sortDirections: ['descend'],
    },
    {
      title: 'Hành động',
      dataIndex: 'hanhDong',
      render: (text, film) => {
        return <Fragment>
          <NavLink to={`/admin/films/edit/${film.maPhim}`} className='rounded px-2 pt-1 pb-3 mr-2 bg-green-500 text-white' ><EditOutlined /></NavLink>
          <Popconfirm
            placement="topRight"
            title={`Bạn có chắc muốn xóa phim ${film.tenPhim}`}
            onConfirm={()=>{
              dispatch(xoaPhimAction(film.maPhim))
            }}  
            okText="Yes"
            cancelText="No"
          >
            <span className='rounded px-2 pt-1 pb-3 mr-2 bg-red-500 text-white'><DeleteOutlined /></span>
          </Popconfirm>
          <NavLink onClick={()=>{localStorage.setItem('filmParam', JSON.stringify(film))}} to={`/admin/films/showtimes/${film.maPhim}/${film.tenPhim}`} className='rounded px-2 pt-1 pb-3 mr-2 bg-blue-700 text-white' ><CalendarOutlined /></NavLink>
        </Fragment>
      },
      width: 150
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  const onSearch = value => {
    dispatch(layDanhSachFilmAction(value))
  }

  return (
    <div className=''>
      <h3 className='text-xl'>Quản lý phim</h3>
      <Button className='mb-3' onClick={() => {
        history.push('/admin/films/addnew')
      }}>Thêm phim</Button>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        className='mb-3'
        onSearch={onSearch}
      />
      <Table columns={columns} rowKey={'maPhim'} dataSource={arrFilm} onChange={onChange} />
    </div>
  )
}
