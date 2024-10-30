import React, { useEffect, useState } from 'react'
import BlogForm from '../components/BlogForm'
import { useNavigate, useParams } from 'react-router-dom';
import service from '../Appwrite/service';
import Container from '../components/Container';

const EditBlog = () => {


  const [blog,setBlog] = useState(null);
  const {slug} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    if(slug){
      service.getBlog(slug).then(blog => {
        if(blog) setBlog(blog)
        else navigate("/")
      })
    }else navigate("/")

  },[slug,navigate])


  return blog ? (
    <div className='py-8'>
        <Container>
            <BlogForm blog={blog} />
        </Container>
    </div>
  ) : null
}

export default EditBlog
