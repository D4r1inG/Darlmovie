import axios from 'axios'
import { quanLyPhimService } from '../../services/QuanLyPhimService'
import { DOMAIN } from '../../util/settings/config'
import { SET_CAROUSEL } from './types/CarouselTypes'

export const getCarouselAction = (thamSo)=>{

    return async (dispatch) => {
        try{
            const {data, status} = await quanLyPhimService.layDanhSachBanner()
            dispatch({
                type: SET_CAROUSEL,
                arrCarousel: data.content
            })
        }catch(err){
            console.log(err)
        }
    }
    
}