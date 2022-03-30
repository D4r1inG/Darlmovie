import { quanLyRapService } from "../../services/QuanLyRapService"
import { SET_CHI_TIET_FILM, SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapTypes"


export const layDanhSachHeThongRapAction = () => {
    return async (dispatch) => {
        try {

            const { data, status } = await quanLyRapService.layDanhSachHeThongRap()

            if (status === 200) {
                dispatch({
                    type: SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu: data.content
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const layThongTinChiTietFilm = (id) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyRapService.layThongTinLichChieuPhim(id)
            if (status === 200) {
                dispatch({
                    type: SET_CHI_TIET_FILM,
                    filmDetail: data.content
                })
            }
        } catch(err) {
            console.log(err)
        }
    }
}