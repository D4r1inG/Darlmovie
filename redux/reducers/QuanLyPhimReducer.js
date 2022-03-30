import { SET_DANH_SACH_PHIM, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../actions/types/QuanLyFilmTypes"
import { SET_CHI_TIET_FILM } from "../actions/types/QuanLyRapTypes"

const initialState = {
  arrFilm: [
      {
        "maPhim": 9590,
        "tenPhim": "Guardians of the Galaxy 1 (2024) ",
        "biDanh": "guardians-of-the-galaxy-1-2024-",
        "trailer": "https://www.youtube.com/embed/2LIQ2-PZBC8",
        "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/guardians-of-the-galaxy-1-2014-_gp00.jpg",
        "moTa": "Năm 1980, sau khi mẹ qua đời, Peter Quill bị bắt khỏi Tr&aacute;i đất bởi Tộc Yondu Ravager, từ đ&oacute; anh trở th&agrave;nh đạo ch&iacute;ch với biệt danh Star-Lord. Quill t&igrave;m được một quả cầu, b&ecirc;n trong l&agrave; Vi&ecirc;n đ&aacute; Sức mạnh, nhưng rồi anh lại bị bắt ở h&agrave;nh tinh Xandar của Nova Corps. Tại đ&oacute; Quill gặp Gamora, Rocket Racoon, Groot, Drax v&agrave; c&ugrave;ng tho&aacute;t ra. Họ c&ugrave;ng nhau ngăn cản &acirc;m mưu của t&ecirc;n chiến binh Kree l&agrave; Ronan, kẻ muốn d&ugrave;ng quả cầu để hủy diệt Xandar.",
        "maNhom": "GP00",
        "ngayKhoiChieu": "2022-03-18T14:35:56.63",
        "danhGia": 5,
        "hot": true,
        "dangChieu": true,
        "sapChieu": true
      },
      
  ],
  dangChieu: true,
  sapChieu: true,
  arrFilmDefault: [],
  filmDetail: [],
  thongTinPhim: []
}

export const QuanLyPhimReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case SET_DANH_SACH_PHIM: {
        state.arrFilm = action.arrFilm
        state.arrFilmDefault = action.arrFilm
        return {...state}
    }

    case SET_FILM_DANG_CHIEU: {
        state.dangChieu = !state.dangChieu
        state.arrFilm = state.arrFilmDefault.filter(item => item.dangChieu === state.dangChieu)
        return {...state}
    }

    case SET_FILM_SAP_CHIEU: {
        state.sapChieu = !state.sapChieu
        state.arrFilm = state.arrFilmDefault.filter(item => item.sapChieu === state.sapChieu)
        return {...state}
    }

    case SET_CHI_TIET_FILM: {
      state.filmDetail = action.filmDetail
      return {...state}
    }

    case SET_THONG_TIN_PHIM: {
      return {...state, thongTinPhim: action.thongTinPhim}
    }
 
  default:
    return state
  }
}
