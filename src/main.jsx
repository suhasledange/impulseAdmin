import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AddBlog from './pages/AddBlog.jsx'
import EditBlog from './pages/EditBlog.jsx'
import Blog from './pages/Blog.jsx'


const router = createBrowserRouter([

{
  path:'/',
  element:<App/>,
  children:[
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/add-blog',
      element:<AddBlog/>
    },
    {
      path:'/edit-blog/:slug',
      element:<EditBlog/>
    },
    {
      path:"/blog/:slug",
      element:<Blog/>
    }
  ]
}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
