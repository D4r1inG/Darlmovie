import { SET_CAROUSEL } from "../actions/types/CarouselTypes"

const initialState = {
    arrCarousel: [
        {
            "maBanner": 2,
            "maPhim": 1283,
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/lat-mat-48h.png"
        }
    ]
}

export const CarouselReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_CAROUSEL: {
        state.arrCarousel = action.arrCarousel
        return {...state}
    }

  default:
    return {...state}
  }
}
