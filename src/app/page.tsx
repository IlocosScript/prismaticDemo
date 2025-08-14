import Header from '@/components/Header'
import About from '@/components/About'
import ClientSuccess from '@/components/ClientSuccess'
import CoreProcess from '@/components/CoreProcess'
import Services from '@/components/Services'
import Partners from '@/components/Partners'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <ClientSuccess />
      <About />
      <CoreProcess />
      <Services />
      <Partners />
      <Testimonials />
      <Footer />
    </main>
  )
}
