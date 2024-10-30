import React from 'react'
import { Link } from 'react-router-dom'
import service from '../Appwrite/service'

const BlogCard = ({$id,title,blogImage}) => {
  return (
    <Link to={`/blog/${$id}`}>
    <div className='w-full shadow-lg border-gray-700 border-2 bg-bg-card rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={service.getFilePreview(blogImage)} alt={title}
            className='rounded-xl' />
        </div>
        <h2
        className='text-md'
        >{title}</h2>
    </div>
</Link>
  )
}

export default BlogCard
