import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import service from '../Appwrite/service';
import Container from '../components/Container';
import Button from '../components/Button';
import parse from "html-react-parser";
const Blog = () => {

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

  const deleteBlog = () =>{

    if(confirm("Do You Want to delete ?")){
      service.deleteBlog(blog.$id).then(blog => {
        if(blog){
          service.deleteFile(blog.blogImage);
          navigate("/")
        }
      })
    }
  }

  return blog ? (
    <div className="py-8">
        <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={service.getFilePreview(blog.blogImage)}
                    alt={blog.title}
                    className="rounded-xl"
                />
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-blog/${blog.$id}`}>
                            <Button className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button onClick={deleteBlog}>
                            Delete
                        </Button>
                    </div>
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{blog.title}</h1>
            </div>
            <div className="browser-css">
                {parse(blog.content)}
                </div>
        </Container>
    </div>
) : null;
}

export default Blog
