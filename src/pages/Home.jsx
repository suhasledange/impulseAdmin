import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import service from '../Appwrite/service'
import BlogCard from '../components/BlogCard'

const Home = () => {

  const [blogs,setBlogs] = useState([])

  useEffect(()=>{
    service.getBlogs().then((blog)=>{
      if(blog) setBlogs(blog.documents)
    })
  },[])


  if (blogs.length === 0) {
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold">
                            No Blogs Found
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
}
  return (
    <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {blogs.map((blog) => (
                        <div key={blog.$id} className='p-2 w-1/4'>
                            <BlogCard {...blog} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
  )
}

export default Home
