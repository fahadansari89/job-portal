import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobslice'

const Categorycarousel = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query))
    navigate('/browse')



  }
  const category = ["forntend developer", "backend developer", "MERN stack developer", "java developer"]
  return (
    <div>
      <Carousel className='w-full max-w-xl mx-auto my-20'>
        <CarouselContent>
          {
            category.map((category, ind) => {
              return <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
                <Button onClick={() => searchJobHandler(category)}>{category}</Button>
              </CarouselItem>
            })
          }
        </CarouselContent>
        <CarouselPrevious className='bg-black' />
        <CarouselNext className='bg-black' />
      </Carousel>
    </div>
  )
}

export default Categorycarousel