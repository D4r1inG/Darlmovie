import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_NHAP_ACTION, SET_DANH_SACH_NGUOI_DUNG, SET_DANH_SACH_TIM_KIEM, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungTypes"
import { history } from '../../App'
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions"


export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.dangNhap(thongTinDangNhap)
            if (status === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: data.content
                })
            }
            history.push('/home')
        } catch (err) {
            console.log(err)
        }
    }
}

export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.dangky(thongTinDangKy)
            if (status === 200) {
                alert('Đăng ký tài khoản thành công!')
            }
            history.push('/login')
        } catch (err) {
            console.log(err.response?.data)
        }
    }
}

export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        dispatch(displayLoadingAction)
        try {
            const { data, status } = await quanLyNguoiDungService.layThongTinNguoiDung()
            if (status === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: data.content
                })
                dispatch(hideLoadingAction)
            }
        } catch (err) {
            dispatch(displayLoadingAction)
            console.log(err)
        }
    }
}

export const layDanhSachNguoiDung = () => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.layDanhSachNguoiDung()
            if (status === 200) {
                dispatch({
                    type: SET_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: data.content
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const capNhatThongTinNguoiDungAction = (thongTinUpdate) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.capNhatThongTinNguoiDung(thongTinUpdate)
            if (status === 200) {
                dispatch(layThongTinNguoiDungAction())
                alert('Cập nhật người dùng thành công!')
            }
        } catch (err) {
            console.log(err.response?.data)
        }
    }
}

export const timKiemNguoiDungAction = (key) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.timKiemNguoiDung(key)
            if (status === 200) {
                dispatch({
                    type: SET_DANH_SACH_TIM_KIEM,
                    data: data.content
                })
            }
        } catch (err) {
            console.log(err.response?.data)
        }
    }
}

export const themNguoiDungAction = (newUser) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.themNguoiDung(newUser)
            if (status === 200) {
                alert('Thêm người dùng thành công!')
                history.push('/admin/users')
            }
        } catch (err) {
            console.log(err.response?.data)
        }
    }
} 

export const chinhSuaThongTinNguoiDungAction = (userEdit) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.chinhSuaThongTinNguoiDung(userEdit)
            if (status === 200) {
                alert('Chỉnh sửa người dùng thành công!')
                history.push('/admin/users')
            }
        } catch (err) {
            console.log(err.response?.data)
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan)
            if (status === 200) {
                alert('Xoá người dùng thành công!')
                dispatch(timKiemNguoiDungAction(''))
            }
        } catch (err) {
            console.log(err.response?.data)
        }
    }
}