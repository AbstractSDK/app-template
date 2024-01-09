import React from 'react'
import type { PathRouteProps } from 'react-router-dom'

const Home = React.lazy(() => import('~/lib/pages/home'))
const AccountHome = React.lazy(() => import('~/lib/pages/account'))

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
]

export const accountRoutes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <AccountHome />,
  },
]

export const privateRoutes: Array<PathRouteProps> = []
