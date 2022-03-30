import News from "../pages/News/News";
import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

class QuanLyNguoiDungService extends baseService {

  dangNhap = (thongTinDangNhap) => {
    return this.Post(`QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
  }

  dangky = (thongTinDangKy) => {
    return this.Post(`QuanLyNguoiDung/DangKy`, thongTinDangKy)
  }

  layThongTinNguoiDung = () => {
    return this.Post(`QuanLyNguoiDung/ThongTinTaiKhoan`)
  }

  layDanhSachNguoiDung = () => {
    return this.Get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
  }

  capNhatThongTinNguoiDung = (thongTinUpdate) => {
    return this.Post(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinUpdate)
  }
  
  timKiemNguoiDung = (key) => {
    if(key !== ''){
      return this.Get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${key}`)
    }else{
      return this.Get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}`)
    }
  }

  layDanhSachLoaiNguoiDung = () => {
    return this.Get(`QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
  }

  themNguoiDung = (newUser) => {
    return this.Post(`QuanLyNguoiDung/ThemNguoiDung`, newUser)
  }

  chinhSuaThongTinNguoiDung = (userEdit) => {
    return this.Post(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`,userEdit )
  }
  xoaNguoiDung = (taiKhoan) => {
    return this.Delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
  }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService()
