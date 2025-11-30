'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

interface TestimonialSliderProps {
  testimonials: Array<{
    name: string
    role: string
    content: string
    rating: number
  }>
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function TestimonialSlider({ 
  testimonials, 
  autoPlay = false,
  autoPlayInterval = 5000 
}: TestimonialSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Initialisation côté client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Configuration responsive - version simplifiée et stable
  const updateSlidesPerView = useCallback(() => {
    if (typeof window === 'undefined') return
    
    const width = window.innerWidth
    let newSlidesPerView = 1
    
    if (width >= 1280) {
      newSlidesPerView = 3
    } else if (width >= 1024) {
      newSlidesPerView = 3
    } else if (width >= 768) {
      newSlidesPerView = 2
    } else if (width >= 640) {
      newSlidesPerView = 1.5
    }
    
    setSlidesPerView(newSlidesPerView)
  }, []) // Dépendances vides - fonction stable

  useEffect(() => {
    if (!isClient) return
    
    updateSlidesPerView()
    
    const handleResize = () => {
      updateSlidesPerView()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isClient, updateSlidesPerView]) // Supprimé testimonials.length et slidesPerView des dépendances

  // Auto-play functionality
  useEffect(() => {
    if (!isClient || !autoPlay || testimonials.length <= slidesPerView) return

    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        const maxSlide = Math.max(0, testimonials.length - slidesPerView)
        return prev >= maxSlide ? 0 : prev + 1
      })
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isClient, autoPlay, autoPlayInterval, testimonials.length, slidesPerView])

  // Gestion du swipe tactile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      nextSlide()
    } else if (distance < -minSwipeDistance) {
      prevSlide()
    }
    
    setTouchStart(null)
    setTouchEnd(null)
  }

  const totalSlides = testimonials.length
  const maxSlide = Math.max(0, totalSlides - slidesPerView)

  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev >= maxSlide ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentSlide(prev => 
      prev <= 0 ? maxSlide : prev - 1
    )
  }

  const goToSlide = (index: number) => {
    const safeIndex = Math.min(index, maxSlide)
    setCurrentSlide(safeIndex)
  }

  // Calcul du décalage pour le slide partiel sur mobile - version safe
  const getSlideOffset = () => {
    if (!isClient || typeof window === 'undefined') return 0
    
    if (window.innerWidth < 640 && slidesPerView === 1.5) {
      return 8 // padding pour le slide partiel
    }
    return 0
  }

  // Ajuster le slide courant quand slidesPerView change
  useEffect(() => {
    if (!isClient) return
    
    const newMaxSlide = Math.max(0, totalSlides - slidesPerView)
    if (currentSlide > newMaxSlide) {
      setCurrentSlide(newMaxSlide)
    }
  }, [isClient, slidesPerView, totalSlides, currentSlide])

  // Éviter le rendu côté serveur avec des valeurs incorrectes
  if (!isClient) {
    return (
      <div className="mx-auto mt-16 w-full px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex space-x-4 overflow-hidden">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex-shrink-0 w-1/3">
              <Card className="border border-gray-200 shadow-sm h-full bg-white rounded-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-4 w-4 fill-gray-200 text-gray-200" 
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-24 bg-gray-100 rounded animate-pulse"></div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-16 w-full px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Slider Container */}
      <div className="relative">
        {/* Slides */}
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
            paddingLeft: getSlideOffset(),
            paddingRight: getSlideOffset()
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="flex-shrink-0 px-2 lg:px-3"
              style={{ 
                width: `${100 / slidesPerView}%`,
                minWidth: `${100 / slidesPerView}%`
              }}
            >
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full bg-white rounded-xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-1 flex-wrap">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          i < testimonial.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'fill-gray-200 text-gray-200'
                        }`} 
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">
                      ({testimonial.rating}/5)
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <blockquote className="text-base sm:text-lg font-normal leading-7 sm:leading-8 text-gray-900">
                    "{testimonial.content}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">
                        {testimonial.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </figcaption>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {totalSlides > slidesPerView && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-200 z-10 group"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 group-hover:text-primary" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-200 z-10 group"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 group-hover:text-primary" />
            </button>
          </>
        )}
      </div>

      {/* Indicators améliorés */}
      {totalSlides > slidesPerView && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(totalSlides / slidesPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index * slidesPerView)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === Math.floor(currentSlide / slidesPerView)
                  ? 'bg-primary scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller au groupe de témoignages ${index + 1}`}
              aria-current={index === Math.floor(currentSlide / slidesPerView) ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Compteur de slides */}
      {totalSlides > slidesPerView && (
        <div className="text-center mt-4 text-sm text-gray-500">
          {Math.min(Math.floor(currentSlide + slidesPerView), totalSlides)} / {totalSlides}
        </div>
      )}
    </div>
  )
}