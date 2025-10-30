import { Header } from '@/components/landing/Header';
import './globals.css';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Workflow } from '@/components/landing/Workflow';
import { Testimonials } from '@/components/landing/Testimonials';
import { Footer } from '@/components/landing/Footer';


export default function Home() {
  return (
   <main className='min-h-screen"'>
      <Header/>
      <Hero/>
      <Features/>
      <Workflow/>
      <Testimonials/>
      <Footer/>
   </main>
  );
}
