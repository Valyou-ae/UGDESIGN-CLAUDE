import { motion } from "framer-motion";
import { 
  Package, 
  Heart, 
  Store, 
  Instagram, 
  BookOpen, 
  Globe,
  Check,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMockupWizardStore } from "@/stores/mockupWizardStore";
import { PLATFORMS } from "@/lib/mockup-wizard/constants";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'package': Package,
  'heart': Heart,
  'store': Store,
  'instagram': Instagram,
  'book': BookOpen,
  'globe': Globe
};

export function StepPlatform() {
  const { 
    selectedPlatform, 
    setSelectedPlatform,
    recommendedLighting,
    recommendedMaterial
  } = useMockupWizardStore();

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Choose Your Platform
        </h2>
        <p className="text-muted-foreground">
          Where will these mockups be used? This helps us optimize the output.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLATFORMS.map((platform, index) => {
          const Icon = ICON_MAP[platform.icon] || Package;
          const isSelected = selectedPlatform === platform.id;

          return (
            <motion.button
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedPlatform(platform.id)}
              className={cn(
                "group relative p-6 rounded-xl text-left transition-all",
                "border-2",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
              )}
              data-testid={`platform-${platform.id}`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}

              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
              )}>
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="font-semibold text-foreground text-lg">
                {platform.name}
              </h3>
            </motion.button>
          );
        })}
      </div>

      {selectedPlatform && recommendedLighting && recommendedMaterial && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 rounded-xl bg-amber-500/10 border border-amber-500/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">
                Smart Recommendations Applied
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Based on your platform selection, we've automatically set optimal presets:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-background border border-border text-sm">
                  <span className="text-muted-foreground mr-1">Lighting:</span>
                  <span className="font-medium text-foreground capitalize">{recommendedLighting}</span>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-background border border-border text-sm">
                  <span className="text-muted-foreground mr-1">Material:</span>
                  <span className="font-medium text-foreground capitalize">{recommendedMaterial.replace('_', ' ')}</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
