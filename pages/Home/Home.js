import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Films from '../../component/Films/Films'
import MultipleRowSlick from '../../component/RSlick/MultipleRowSlick'
import { layDanhSachFilmAction } from '../../redux/actions/QuanLyFilmAction'
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'
import HomeMenu from './HomeMenu/HomeMenu'

export default function Home() {

  const dispatch = useDispatch()

  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer)

  const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)

  useEffect(() => {
    dispatch(layDanhSachFilmAction())
    dispatch(layDanhSachHeThongRapAction())
  }, [])

  return (
    <div >
      <HomeCarousel  />
      <div className='container px-36 py-24 mx-auto'>
        <MultipleRowSlick arrFilm={arrFilm} />
        <div className='mx-24 mt-16'>
          <HomeMenu heThongRapChieu={heThongRapChieu} />

        </div>
      </div>
    </div>
  )
}
