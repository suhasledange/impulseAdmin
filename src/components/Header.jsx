import React from 'react'
import Container from './Container'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

    const navItems = [
        {
          name: 'Home',
          slug: "/",
        }, 
      {
          name: "Add Blog",
          slug: "/add-blog",
      },
      ]

  return (
    <header className='py-4 shadow-lg sticky top-0 z-50'>
    <Container>
      <nav className='flex items-center justify-between'>
        <div className='mr-4'>
          <Link to='/'>
            <h1 className='text-4xl'>ImpulseAcademy</h1>
            </Link>
        </div>
        <ul className='flex ml-auto'>
          {navItems.map((item) => 
            <li key={item.name}>
              <button
              onClick={() => navigate(item.slug)}
              className='inline-bock px-6 py-2 duration-200 mx-2 hover:bg-black rounded-full'
              >{item.name}</button>
            </li>
          )}
        </ul>
      </nav>
      </Container>
  </header>
  )
}

export default Header
