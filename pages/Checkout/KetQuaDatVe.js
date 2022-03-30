import moment from "moment"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { layThongTinPhim } from "../../redux/actions/QuanLyFilmAction"
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction"

export function KetQuaDatVe(props) {

    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer)
    const { arrGheDatThanhCong } = useSelector(state => state.QuanLyDatVeReducer)
    const dispatch = useDispatch()

    console.log(thongTinPhim)

    useEffect(() => {
        dispatch(layThongTinPhim(props.match.params.idphim))
    }, [])


    return <div className='p-5 mt-10'>
        <h3 className='text-2xl text-center text-purple-600'>Kết quả đặt vé</h3>
        <div className="container">
            <div className='w-3/4 mx-auto shadow-lg border-t-2 rounded-lg border-purple-400 flex justify-between'>
                <img className='w-1/2 h-1/2 rounded-lg m-4' src={thongTinPhim.hinhAnh} alt={thongTinPhim.tenPhim} />
                <div className='grid grid-cols-12 m-4 flex-1'>
                    <div className='col-span-4'>
                        <p className='font-bold'>Tên Phim:</p>
                        <p className='font-bold'>Ngày đặt:</p>
                        <p className='font-bold'>Danh sách ghế:</p>
                    </div>
                    <div className='col-span-8'>
                        <p>{thongTinPhim.tenPhim}</p>
                        <p>{moment(thongTinPhim.ngayDat).format('DD/MM/YYYY')}</p>
                        <div className='grid grid-cols-6 gap-2'>{arrGheDatThanhCong.map((item, index) => {
                            return <span key={index} className='bg-gray-600 text-center text-white p-2 rounded-md'>{item.tenGhe}</span>
                        })}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}