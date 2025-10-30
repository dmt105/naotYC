// components/landing/Testimonials.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { testimonials } from '@/constants/constant'
import { TestimonialSlider } from '../ui/TestimonialSliders'

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading font-bold tracking-tight sm:text-4xl">
            Témoignages
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Découvrez ce que les membres de Youth Computing pensent de NaotY
          </p>
        </div>
        <TestimonialSlider testimonials={testimonials} />
      </div>
    </section>
  )
}