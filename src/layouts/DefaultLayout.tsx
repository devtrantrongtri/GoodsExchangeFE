import  { ReactNode } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

function DefaultLayout({children} : {children: ReactNode} ) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div>
      <Header />

      </div>

      {/* Main content */}
      <main className="flex-grow pt-32 bg-cyan-50">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default DefaultLayout