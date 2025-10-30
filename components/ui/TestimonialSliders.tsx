'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

interface TestimonialSliderProps {
  testimonials: Array<{
    name: string
    role: string
    content: string
    rating: number
  }>
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)

  // Calcul du nombre de slides visibles selon la largeur d'écran
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3)
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(1)
      }
    }

    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)
    return () => window.removeEventListener('resize', updateSlidesPerView)
  }, [])

  const totalSlides = testimonials.length
  const maxSlide = Math.max(0, totalSlides - slidesPerView)

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.min(index, maxSlide))
  }

  return (
    <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
      {/* Slider Container */}
      <div className="relative">
        {/* Slides */}
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)` 
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / slidesPerView}%` }}
            >
              <Card className="border-2 shadow-lg h-full">
                <CardHeader>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-lg font-normal leading-8 text-gray-900">
                    "{testimonial.content}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-4">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </figcaption>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {currentSlide > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors z-10"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
        )}

        {currentSlide < maxSlide && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors z-10"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* Indicators */}
      {totalSlides > slidesPerView && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide 
                  ? 'bg-primary' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}