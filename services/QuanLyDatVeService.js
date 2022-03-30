import News from "../pages/News/News";
import { GROUPID } from "../util/settings/config";
import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { baseService } from "./baseService";

class QuanLyDatVeService extends baseService {

    layChiTietPhongVe = (maLichChieu) => {
        return this.Get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }
    datVe = (thongTinDatVe = new ThongTinDatVe) => {
        return this.Post(`QuanLyDatVe/DatVe`, thongTinDatVe)
    }
    taoLichChieu = (thongTinLichChieu) => {
        return this.Post(`QuanLyDatVe/TaoLichChieu`, thongTinLichChieu)
    }
}

export const quanLyDatVeService = new QuanLyDatVeService()
