import { FileText, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <FileText className="h-8 w-8" />
              <span className="ml-2 text-xl font-heading font-bold">NaotY</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-gray-300">
              Solution de gestion des notes internes développée spécifiquement pour Youth Computing. 
              Centralisation, validation et diffusion optimisées.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold leading-6">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#features" className="text-sm text-gray-300 hover:text-white">Fonctionnalités</a></li>
              <li><a href="#workflow" className="text-sm text-gray-300 hover:text-white">Workflow</a></li>
              <li><a href="#testimonials" className="text-sm text-gray-300 hover:text-white">Témoignages</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold leading-6">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                contact@youthcomputing.org
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                +261 34 95 520 13
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                Fianarantsoa, Mahamanina
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs text-gray-400">
            &copy; 2025 Youth Computing. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}