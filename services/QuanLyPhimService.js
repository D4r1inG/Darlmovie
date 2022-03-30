import News from "../pages/News/News";
import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

class QuanLyPhimService extends baseService {

    layDanhSachBanner = () => {
        return this.Get('QuanLyPhim/LayDanhSachBanner')
    }
    layDanhSachPhim = (tenPhim = '') => {
        if(tenPhim.trim() !== '') {
            return this.Get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }else{
            return this.Get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)

        }
    }
    themPhimUpLoadHinh = (formData) => {
        return this.Post(`QuanLyPhim/ThemPhimUploadHinh`, formData)
    }
    layThongTinPhim = (maPhim) => {
        return this.Get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }
    capNhatPhim = (formData) => {
        return this.Post(`QuanLyPhim/CapNhatPhimUpload`, formData)
    }
    xoaPhim = (maPhim) => {
        return this.Delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}

export const quanLyPhimService = new QuanLyPhimService()
