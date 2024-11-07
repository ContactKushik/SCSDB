import React, { useEffect, useState } from 'react'
import Topnav from './templates/Topnav'
import Sidenav from './templates/Sidenav'
import { useNavigate } from 'react-router-dom'
import Dropdown from './templates/Dropdown'
import axios from '../utils/axios'
import Card from './templates/Card'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from './templates/Loader'

const Trending = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState('all')
  const [duration, setDuration] = useState('day')
  const [trending, setTrending] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getTrending = async () => {
    document.title = 'SCSDB | Trending'
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`, {
        params: { page },
      })

      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results])
        setPage((prevPage) => prevPage + 1)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  useEffect(() => {
    setTrending([])
    setPage(1)
    setHasMore(true)
    getTrending()
  }, [category, duration])

  return trending ? (
    <>
      <Sidenav />
      <div
        className="w-full md:w-[80%] h-full overflow-auto overflow-x-hidden scrollbar-custom"
        id="scrollableDiv"
      >
        <Topnav />
        <div className="w-full px-4 md:px-10 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <div className="flex justify-between md:justify-normal  w-[300px]">
              <div className="left">
                <button
                  className="text-1xl md:text-3xl font-semibold flex items-center md:items-end gap-1  rounded-lg pr-2 pl-0 md:pl-2"
                  onClick={() => navigate(-1)}
                >
                  <i className="ri-arrow-left-line text-xl md:text-2xl hover:text-[#7463df] cursor-pointer"></i>
                  
                </button>
              </div>
              <div className="right">
                {' '}
                <h1 className="text-1xl md:text-3xl font-semibold flex items-center md:items-end gap-3">
                  Trending
                </h1>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end">
              <Dropdown
                options={['all', 'movie', 'tv']}
                func={(e) => setCategory(e.target.value)}
                title={'category'}
              />
              <Dropdown
                options={['day', 'week']}
                func={(e) => setDuration(e.target.value)}
                title={'duration'}
              />
            </div>
          </div>
        </div>
        <div className="px-2 md:px-0">
          <InfiniteScroll
            loader={
              <div className="text-center py-4">
                <Loader />
              </div>
            }
            dataLength={trending.length}
            next={getTrending}
            hasMore={hasMore}
            scrollableTarget="scrollableDiv"
          >
            <Card data={trending} title={category} />
          </InfiniteScroll>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  )
}

export default Trending
