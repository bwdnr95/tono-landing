import Hero from '../components/home/Hero.tsx'
import PainPoints from '../components/home/PainPoints.tsx'
import BeforeAfter from '../components/home/BeforeAfter.tsx'
import Results from '../components/home/Results.tsx'
import Solution from '../components/home/Solution.tsx'
import Process from '../components/home/Process.tsx'
import ServiceTiers from '../components/home/ServiceTiers.tsx'
import Testimonials from '../components/home/Testimonials.tsx'
import About from '../components/home/About.tsx'
import CTA from '../components/home/CTA.tsx'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <BeforeAfter />
      <Results />
      <Solution />
      <Process />
      <ServiceTiers />
      <Testimonials />
      <About />
      <CTA />
    </>
  )
}
