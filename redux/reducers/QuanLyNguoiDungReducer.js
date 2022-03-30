import { TOKEN, USER_LOGIN } from "../../util/settings/config"
import { DANG_NHAP_ACTION, EDIT_USER, SET_DANH_SACH_NGUOI_DUNG, SET_DANH_SACH_TIM_KIEM, SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungTypes"

let user = {}
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin: user,
    thongTinNguoiDung: {},
    danhSachNguoiDung: [],
    danhSachTimKiem: [],
    userEdit: {}
}

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
    switch (action.type) {

        case DANG_NHAP_ACTION: {
            const { thongTinDangNhap } = action
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap))
            localStorage.setItem(TOKEN,thongTinDangNhap.accessToken)
            return  {...state, userLogin: thongTinDangNhap}
        }

        case SET_THONG_TIN_NGUOI_DUNG:{
            state.thongTinNguoiDung = action.thongTinNguoiDung
            return {...state}
        }
        
        case SET_DANH_SACH_NGUOI_DUNG: {
            return {...state, danhSachNguoiDung: action.danhSachNguoiDung}
        }

        case SET_DANH_SACH_TIM_KIEM: {
            return {...state, danhSachTimKiem: action.data}
        }

        case EDIT_USER: {
            return {...state, userEdit: action.userEdit}
        }

        default:
            return { ...state }
    }
}
