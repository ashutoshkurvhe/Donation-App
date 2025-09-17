import React from 'react'
import Header from '../components/common/Header';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
      <Header>
          <main>
              <Outlet/>
          </main>
    </Header>
  )
}

export default AuthLayout
