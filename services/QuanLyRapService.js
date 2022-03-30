import News from "../pages/News/News";
import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

class QuanLyRapService extends baseService {

    layDanhSachHeThongRap = () => {
        return this.Get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }

    layThongTinLichChieuPhim = (maFilm) => {
        return this.Get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maFilm}`)
    }

    layThongTinHeThongRap = () =>{
        return this.Get(`QuanLyRap/LayThongTinHeThongRap`)
    }

    layThongTinCumRap = (maHethong) => {
        return this.Get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHethong}`)
    }
}

export const quanLyRapService = new QuanLyRapService()
