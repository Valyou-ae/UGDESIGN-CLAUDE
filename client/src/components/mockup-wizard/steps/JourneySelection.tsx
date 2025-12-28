import { motion } from "framer-motion";
import { Shirt, Grid, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMockupWizardStore } from "@/stores/mockupWizardStore";

export function JourneySelection() {
  const { setJourney } = useMockupWizardStore();

  const journeys = [
    {
      id: 'dtg' as const,
      title: 'DTG (Direct to Garment)',
      description: 'For designs printed on a specific area of a product',
      examples: 'Logo on chest, graphic on back, small emblem',
      icon: Shirt,
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      id: 'aop' as const,
      title: 'AOP (All-Over Print)',
      description: 'For seamless patterns covering the entire product',
      examples: 'Full print leggings, patterned blankets, all-over tees',
      icon: Grid,
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Choose Your Mockup Journey
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Select how you want to apply your design to products
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        {journeys.map((journey, index) => (
          <motion.button
            key={journey.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setJourney(journey.id)}
            className={cn(
              "group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300",
              "bg-card border border-border hover:border-primary/50",
              "hover:shadow-xl hover:scale-[1.02]"
            )}
            data-testid={`journey-${journey.id}`}
          >
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity",
              `bg-gradient-to-br ${journey.gradient}`
            )} />
            
            <div className="relative z-10">
              <div className={cn(
                "w-16 h-16 rounded-xl flex items-center justify-center mb-6",
                `bg-gradient-to-br ${journey.gradient}`
              )}>
                <journey.icon className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {journey.title}
              </h2>
              
              <p className="text-muted-foreground mb-4">
                {journey.description}
              </p>
              
              <p className="text-sm text-muted-foreground/70 mb-6">
                <span className="font-medium">Examples:</span> {journey.examples}
              </p>
              
              <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
