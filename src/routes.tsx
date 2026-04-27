import type { RouteRecord } from 'vite-react-ssg'
import { HelmetProvider } from 'react-helmet-async'
import { ScrollManager } from './components/ScrollManager'
import { MainLayout } from './components/layout/MainLayout'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ServicesPage } from './pages/ServicesPage'

function RootLayout() {
  return (
    <HelmetProvider>
      <ScrollManager />
      <MainLayout />
    </HelmetProvider>
  )
}

const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        entry: 'src/pages/HomePage.tsx',
      },
      {
        path: 'about',
        element: <AboutPage />,
        entry: 'src/pages/AboutPage.tsx',
      },
      {
        path: 'services',
        element: <ServicesPage />,
        entry: 'src/pages/ServicesPage.tsx',
      },
      {
        path: '*',
        element: <NotFoundPage />,
        entry: 'src/pages/NotFoundPage.tsx',
      },
    ],
  },
]

export default routes
