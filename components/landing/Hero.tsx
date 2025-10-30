import { Button } from '@/components/ui/button'
import { ArrowRight, PlayCircle } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-blue-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
            Simplifiez la gestion de {' '} 
            vos documents internes
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 text-gray-300 max-w-3xl mx-auto">
            NaotY centralise la création, validation et diffusion des documents internes pour Youth Computing. 
            Workflow collaboratif, planification intelligente et archivage sécurisé.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 w-full max-w-md sm:max-w-none mx-auto">
            <Link href='auth/register' className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-yc-fuschia hover:bg-[#953038] hover:cursor-pointer text-white text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10 text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              Voir la démo
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mx-auto mt-12 sm:mt-16 max-w-2xl">
          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">100%</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">Traçabilité complète</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">5x</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">Plus rapide</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">0</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">Note perdue</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}