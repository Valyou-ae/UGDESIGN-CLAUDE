import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Loader2, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useMockupWizardStore } from "@/stores/mockupWizardStore";
import { useToast } from "@/hooks/use-toast";

export function StepSeamless() {
  const { 
    designImage,
    seamlessVariations,
    setSeamlessVariations,
    selectedSeamlessVariation,
    setSelectedSeamlessVariation,
    patternScale,
    setPatternScale
  } = useMockupWizardStore();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGeneratePattern = async () => {
    if (!designImage) return;
    
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/mockup/generate-seamless', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ designImage })
      });

      if (!response.ok) {
        throw new Error('Failed to generate pattern');
      }

      const data = await response.json();
      
      if (data.patterns && data.patterns.length > 0) {
        setSeamlessVariations(data.patterns);
        setSelectedSeamlessVariation(data.patterns[0]);
        toast({
          title: "Pattern Generated",
          description: "Your seamless pattern is ready!"
        });
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again or check your design",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Create Seamless Pattern
        </h2>
        <p className="text-muted-foreground">
          Transform your design into a tileable pattern for all-over printing
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-3 border-b border-border bg-muted/50">
              <span className="text-sm font-medium text-muted-foreground">Original Design</span>
            </div>
            <div className="aspect-square bg-muted/30 flex items-center justify-center p-4">
              {designImage && (
                <img
                  src={designImage}
                  alt="Original design"
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </div>

          {!selectedSeamlessVariation && (
            <Button
              size="lg"
              className="w-full"
              onClick={handleGeneratePattern}
              disabled={isGenerating}
              data-testid="button-generate-pattern"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Pattern...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generate AI Pattern
                </>
              )}
            </Button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {selectedSeamlessVariation ? (
            <>
              <div className="rounded-xl border border-primary bg-card overflow-hidden">
                <div className="p-3 border-b border-border bg-muted/50 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Generated Pattern</span>
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <Check className="w-4 h-4" />
                    Ready
                  </div>
                </div>
                <div 
                  className="aspect-square bg-muted/30 flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${selectedSeamlessVariation})`,
                    backgroundSize: `${patternScale}%`,
                    backgroundRepeat: 'repeat'
                  }}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Pattern Scale</span>
                  <span className="text-sm text-muted-foreground">{patternScale}%</span>
                </div>
                <Slider
                  value={[patternScale]}
                  onValueChange={([value]) => setPatternScale(value)}
                  min={20}
                  max={100}
                  step={5}
                  data-testid="slider-pattern-scale"
                />
                <p className="text-xs text-muted-foreground">
                  Adjust how large the pattern appears on the product
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleGeneratePattern}
                disabled={isGenerating}
                data-testid="button-regenerate"
              >
                <RefreshCw className={cn("w-4 h-4 mr-2", isGenerating && "animate-spin")} />
                Regenerate Pattern
              </Button>
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-muted/20 aspect-square flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Wand2 className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Click "Generate AI Pattern" to create a seamless tileable version of your design
              </p>
            </div>
          )}

          {seamlessVariations.length > 1 && (
            <div className="space-y-3">
              <span className="text-sm font-medium text-foreground">Variations</span>
              <div className="grid grid-cols-3 gap-2">
                {seamlessVariations.map((variation, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSeamlessVariation(variation)}
                    className={cn(
                      "aspect-square rounded-lg border-2 overflow-hidden transition-all",
                      selectedSeamlessVariation === variation
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    )}
                    data-testid={`variation-${index}`}
                  >
                    <img
                      src={variation}
                      alt={`Variation ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
