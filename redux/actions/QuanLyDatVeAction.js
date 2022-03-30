import { connection } from "../.."
import { quanLyDatVeService } from "../../services/QuanLyDatVeService"
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe"
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions"
import { DISPLAY_LOADING, HIDE_LOADING } from "./types/LoadingType"
import { CHANGE_DAT_VE_THANH_CONG, CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeTypes"


export const layChiTietPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {
        dispatch(displayLoadingAction)

        try {
            const { data, status } = await quanLyDatVeService.layChiTietPhongVe(maLichChieu)
            if (status === 200) {
                // console.log(data)
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTiet: data.content
                })
            }

            dispatch(hideLoadingAction)
        } catch (err) {
            dispatch(hideLoadingAction)
            console.log(err)
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch, getState) => {
        try {
            const { data, status } = await quanLyDatVeService.datVe(thongTinDatVe)
            let { userLogin } = getState().QuanLyNguoiDungReducer
            if (status === 200) {
                await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
                dispatch({ type: DAT_VE_HOAN_TAT })
                dispatch({
                    type: CHANGE_DAT_VE_THANH_CONG,
                    datVe: true,
                    danhSachVe: thongTinDatVe.danhSachVe
                })
            }
            
            connection.invoke('datGheThanhCong', userLogin.taiKhoan, thongTinDatVe.maLichChieu)
            dispatch({ type: CHUYEN_TAB })
        } catch (err) {
            dispatch(hideLoadingAction)
            console.log(err)
        }
    }
}

export const datGheAction = (ghe, maLichChieu) => {

    return async (dispatch, getState) => {
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        })
        let { danhSachGheDangDat } = getState().QuanLyDatVeReducer
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)
        // console.log(maLichChieu, danhSachGheDangDat, taiKhoan )
        connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu)
    }
}