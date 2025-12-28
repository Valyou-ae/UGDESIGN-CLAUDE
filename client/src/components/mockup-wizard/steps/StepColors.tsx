import { motion } from "framer-motion";
import { Palette, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMockupWizardStore } from "@/stores/mockupWizardStore";
import { ProductColor, STANDARD_COLORS } from "@/lib/mockup-wizard/constants";

export function StepColors() {
  const { 
    journey,
    selectedProduct, 
    selectedColors, 
    toggleColor 
  } = useMockupWizardStore();

  const availableColors = selectedProduct?.availableColors?.length 
    ? selectedProduct.availableColors 
    : STANDARD_COLORS;

  if (journey === 'aop') {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center mb-6">
            <Palette className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Color Selection Not Available
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            All-Over Print products use the colors from your pattern design. 
            The product base will be white to showcase your design accurately.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Select Colors
        </h2>
        <p className="text-muted-foreground">
          Choose one or more product colors for your mockups
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3"
      >
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Each color you select will generate a separate set of mockup images. 
          Selecting 3 colors with 2 angles = 6 total images.
        </p>
      </motion.div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {availableColors.map((color, index) => {
          const isSelected = selectedColors.some(c => c.hex === color.hex);
          
          return (
            <motion.button
              key={color.hex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              onClick={() => toggleColor(color)}
              className={cn(
                "group relative aspect-square rounded-xl transition-all",
                "border-2 hover:scale-105",
                isSelected
                  ? "border-primary ring-2 ring-primary/20 scale-105"
                  : "border-border hover:border-primary/50"
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              data-testid={`color-${color.hex.replace('#', '')}`}
            >
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    color.category === 'light' ? "bg-gray-800" : "bg-white"
                  )}>
                    <Check className={cn(
                      "w-4 h-4",
                      color.category === 'light' ? "text-white" : "text-gray-800"
                    )} />
                  </div>
                </div>
              )}
              
              <div className={cn(
                "absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100",
                "transition-opacity text-xs font-medium text-foreground whitespace-nowrap",
                "bg-popover px-2 py-1 rounded shadow-lg border border-border"
              )}>
                {color.name}
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 p-4 rounded-xl bg-muted/50 border border-border"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium text-foreground">
              {selectedColors.length} color{selectedColors.length !== 1 ? 's' : ''} selected
            </span>
            {selectedColors.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                {selectedColors.map((color) => (
                  <div
                    key={color.hex}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-background border border-border text-xs"
                  >
                    <div
                      className="w-3 h-3 rounded-full border border-border"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {selectedColors.length > 0 && (
            <button
              onClick={() => selectedColors.forEach(c => toggleColor(c))}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
