import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Card from './templates/Card'
import Dropdown from './templates/Dropdown'
import Sidenav from './templates/Sidenav'
import Topnav from './templates/Topnav'
import Loader from './templates/Loader'

const Popular = () => {
  document.title = 'SCSDB | Popular'
  const navigate = useNavigate()
  const [category, setCategory] = useState('tv')
  const [popular, setPopular] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular`, {
        params: { page },
      })

      if (data.results.length > 0) {
        setPopular((prev) => [...prev, ...data.results])
        setPage((prevPage) => prevPage + 1)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  useEffect(() => {
    setPopular([])
    setPage(1)
    setHasMore(true)
    getTrending()
  }, [category])



  return popular.length > 0 ? (
    <>
      <Sidenav />
      <div
        className="w-full h-full overflow-auto overflow-x-hidden scrollbar-custom"
        id="scrollableDiv"
      >
        <Topnav />
        <div className="w-full px-5 py-5 sm:px-10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex justify-between  w-[350px] mb-3">
              <div className="left">
                <button
                  className="text-1xl md:text-3xl font-semibold flex items-center md:items-end gap-1 bg-red-900 rounded-lg pr-2 pl-2"
                  onClick={() => navigate(-1)}
                >
                  <i className="ri-arrow-left-line text-xl md:text-2xl hover:text-[#7463df] cursor-pointer"></i>
                  Back
                </button>
              </div>
              <div className="right">
                {' '}
                <h1 className="text-1xl md:text-2xl font-semibold flex items-center md:items-end gap-3">
                  Popular {category.charAt(0).toUpperCase() + category.slice(1)}
                  s
                </h1>
              </div>
            </div>
            {/* <h1 className="text-2xl sm:text-3xl font-semibold flex items-end gap-3">
              <i
                className="ri-arrow-left-line text-xl sm:text-2xl hover:text-[#7463df]"
                onClick={() => navigate('/')}
              ></i>
            </h1> */}

            <div className="flex gap-2">
              <Dropdown
                options={['movie', 'tv']}
                func={(e) => setCategory(e.target.value)}
                title={'category'}
              />
            </div>
          </div>
        </div>
        <div>
          <InfiniteScroll
            loader={<h1>Loading...</h1>}
            dataLength={popular.length}
            next={getTrending}
            hasMore={hasMore}
            scrollableTarget="scrollableDiv"
          >
            <Card data={popular} title={category} />
          </InfiniteScroll>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  )
}

export default Popular
