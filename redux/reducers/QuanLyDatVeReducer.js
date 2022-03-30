import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe"
import { CHANGE_DAT_VE_THANH_CONG, CHANGE_TAB_ACTIVE, CHUYEN_TAB, DAT_GHE, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../actions/types/QuanLyDatVeTypes"

const initialState = {
  chiTietphongVe: new ThongTinLichChieu(),
  danhSachGheDangDat: [],
  danhSachGheKhachDat: [],
  tabActive: '1',
  datVeThanhCong: false,
  arrGheDatThanhCong: []
}

export const QuanLyDatVeReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_CHI_TIET_PHONG_VE: {
      state.chiTietphongVe = action.chiTiet
      return { ...state }
    }

    case DAT_VE: {
      let danhSachGheUpdate = state.danhSachGheDangDat
      let index = danhSachGheUpdate.findIndex(item => item.maGhe === action.gheDuocChon.maGhe)
      if (index !== -1) {
        state.danhSachGheDangDat = danhSachGheUpdate.filter(item => item.maGhe !== action.gheDuocChon.maGhe)
      } else {
        state.danhSachGheDangDat.push(action.gheDuocChon)
      }
      return { ...state }
    }

    case DAT_VE_HOAN_TAT: {
      return { ...state, danhSachGheDangDat: [] }
    }

    case CHUYEN_TAB: {
      return { ...state, tabActive: '2' }
    }

    case CHANGE_TAB_ACTIVE: {
      return { ...state, tabActive: action.key.toString() }
    }

    case DAT_GHE: {
      return { ...state, danhSachGheKhachDat: action.arrGhe }
    }

    case CHANGE_DAT_VE_THANH_CONG: {
      state.datVeThanhCong = action.datVe
      return { ...state, arrGheDatThanhCong: action.danhSachVe }
    }


    default:
      return state
  }
}
