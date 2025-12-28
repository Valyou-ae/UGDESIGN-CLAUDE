import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Camera, 
  Film, 
  Building, 
  Square, 
  Sparkles, 
  Gem, 
  Leaf,
  Check 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMockupWizardStore } from "@/stores/mockupWizardStore";
import { BRAND_STYLES } from "@/lib/mockup-wizard/constants";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'shopping-cart': ShoppingCart,
  'camera': Camera,
  'film': Film,
  'building': Building,
  'square': Square,
  'sparkles': Sparkles,
  'gem': Gem,
  'leaf': Leaf
};

export function StepStyle() {
  const { selectedBrandStyle, setSelectedBrandStyle, updatePresetsFromContext } = useMockupWizardStore();

  const handleSelectStyle = (styleId: string) => {
    setSelectedBrandStyle(styleId);
    updatePresetsFromContext();
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Define Your Brand Style
        </h2>
        <p className="text-muted-foreground">
          Choose the photography style that best represents your brand
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BRAND_STYLES.map((style, index) => {
          const Icon = ICON_MAP[style.icon] || Square;
          const isSelected = selectedBrandStyle === style.id;

          return (
            <motion.button
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelectStyle(style.id)}
              className={cn(
                "group relative rounded-xl p-5 text-left transition-all duration-200",
                "border-2 bg-card hover:shadow-lg",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/30"
              )}
              data-testid={`style-${style.id}`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}

              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors",
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
              )}>
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="font-semibold text-foreground mb-1">
                {style.name}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {style.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {style.keywords.slice(0, 3).map((keyword) => (
                  <span
                    key={keyword}
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      isSelected
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      {selectedBrandStyle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 rounded-xl bg-muted/50 border border-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="font-medium text-foreground">
              {BRAND_STYLES.find(s => s.id === selectedBrandStyle)?.name} selected
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your mockups will be generated with {BRAND_STYLES.find(s => s.id === selectedBrandStyle)?.name.toLowerCase()} aesthetics, 
            including appropriate lighting, color grading, and atmospheric effects.
          </p>
        </motion.div>
      )}
    </div>
  );
}
