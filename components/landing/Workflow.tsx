// components/landing/Workflow.tsx
import { steps } from "@/constants/constant"

export function Workflow() {
  return (
    <section id="workflow" className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading font-bold tracking-tight sm:text-4xl">
            Workflow Intégré
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Un processus complet et fluide de la création à l'archivage des notes
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl lg:max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step.name} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full -ml-4 w-full h-0.5"/>
                )}
                <div className="relative text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yc-fuschia shadow-lg">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900">{step.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}