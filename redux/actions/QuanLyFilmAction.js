import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyFilmTypes"
import { history } from '../../App'

export const layDanhSachFilmAction = (tenPhim = '') => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyPhimService.layDanhSachPhim(tenPhim)

            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: data.content
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const themPhimUploadHinhAction = (fromData) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyPhimService.themPhimUpLoadHinh(fromData)
            if (status === 200) {
                alert('Thêm phim thành công')
                console.log(data)
            }
        } catch (err) {
            console.log(err)
        }
    }
}


export const layThongTinPhim = (maPhim) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyPhimService.layThongTinPhim(maPhim)
            if (status === 200) {
                dispatch({
                    type: SET_THONG_TIN_PHIM,
                    thongTinPhim: data.content
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const capNhatPhim = (formData) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyPhimService.capNhatPhim(formData)
            alert('Cập nhật phim thành công')
            history.push('/admin/films')
        } catch (err) {
            console.log(err)
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyPhimService.xoaPhim(maPhim)
            if (status === 200) {

                alert('Xóa phim thành công')
                dispatch(layDanhSachFilmAction())
            }
        } catch (err) {

        }
    }
}