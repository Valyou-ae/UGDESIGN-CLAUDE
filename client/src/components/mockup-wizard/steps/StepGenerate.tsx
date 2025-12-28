import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Loader2, 
  Check, 
  Download, 
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Settings,
  Image as ImageIcon,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useMockupWizardStore } from "@/stores/mockupWizardStore";
import { useToast } from "@/hooks/use-toast";
import { BRAND_STYLES } from "@/lib/mockup-wizard/constants";

export function StepGenerate() {
  const {
    selectedProduct,
    selectedColors,
    selectedAngles,
    selectedBrandStyle,
    environmentPrompt,
    modelDetails,
    selectedPlatform,
    journey,
    isGenerating,
    generationProgress,
    generationStatus,
    generationResults,
    startGeneration,
    setGenerationProgress,
    addGenerationResult,
    setGenerationComplete,
    getTotalImages
  } = useMockupWizardStore();

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [refinementPrompt, setRefinementPrompt] = useState("");
  const [selectedResultIndex, setSelectedResultIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const totalImages = getTotalImages();
  const brandStyle = BRAND_STYLES.find(s => s.id === selectedBrandStyle);

  const handleGenerate = async () => {
    startGeneration();

    try {
      const colorCount = journey === 'aop' ? 1 : Math.max(selectedColors.length, 1);
      const angleCount = selectedAngles.length;
      const totalJobs = colorCount * angleCount;
      let completedJobs = 0;

      for (let c = 0; c < colorCount; c++) {
        for (let a = 0; a < angleCount; a++) {
          const color = journey === 'aop' ? null : selectedColors[c];
          const angle = selectedAngles[a];

          setGenerationProgress(
            Math.round((completedJobs / totalJobs) * 100),
            `Generating ${color?.name || 'pattern'} - ${angle.name}...`
          );

          await new Promise(resolve => setTimeout(resolve, 2000));

          addGenerationResult({
            id: `result-${c}-${a}`,
            src: `/api/placeholder/512/512?text=${encodeURIComponent(`${selectedProduct?.name} ${color?.name || ''} ${angle.name}`)}`,
            color: color?.name || 'Pattern',
            angle: angle.name,
            timestamp: new Date()
          });

          completedJobs++;
        }
      }

      setGenerationComplete();
      toast({
        title: "Mockups Generated!",
        description: `Successfully created ${totalJobs} mockup${totalJobs > 1 ? 's' : ''}`
      });
    } catch (error) {
      setGenerationComplete();
      toast({
        title: "Generation Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDownload = async (result: typeof generationResults[0]) => {
    try {
      const response = await fetch(result.src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mockup-${result.color}-${result.angle}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast({
        title: "Download Failed",
        description: "Unable to download image",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Generate Mockups
        </h2>
        <p className="text-muted-foreground">
          Review your selections and start generating
        </p>
      </motion.div>

      {!isGenerating && generationResults.length === 0 && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-6 mb-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Summary</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product:</span>
                <span className="font-medium text-foreground">{selectedProduct?.name || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Brand Style:</span>
                <span className="font-medium text-foreground">{brandStyle?.name || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Colors:</span>
                <span className="font-medium text-foreground">
                  {journey === 'aop' ? 'Pattern' : `${selectedColors.length} selected`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Angles:</span>
                <span className="font-medium text-foreground">{selectedAngles.length} selected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform:</span>
                <span className="font-medium text-foreground capitalize">{selectedPlatform || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Images:</span>
                <span className="font-bold text-primary">{totalImages}</span>
              </div>
            </div>
          </motion.div>

          <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors mb-6">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Advanced Options</span>
                </div>
                {advancedOpen ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 rounded-xl border border-border bg-muted/30 mb-6 space-y-4"
              >
                <p className="text-sm text-muted-foreground">
                  Advanced generation options will be available in a future update.
                </p>
              </motion.div>
            </CollapsibleContent>
          </Collapsible>

          <Button
            size="lg"
            className="w-full h-14 text-lg"
            onClick={handleGenerate}
            data-testid="button-generate"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate {totalImages} Mockup{totalImages !== 1 ? 's' : ''}
          </Button>
        </>
      )}

      {isGenerating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-border bg-card p-8 text-center"
        >
          <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
          <h3 className="font-semibold text-foreground mb-2">{generationStatus}</h3>
          <Progress value={generationProgress} className="mb-4" />
          <p className="text-sm text-muted-foreground">
            {generationProgress}% complete
          </p>
        </motion.div>
      )}

      {generationResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0. }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              Generated Mockups ({generationResults.length})
            </h3>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {generationResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "group relative rounded-xl border overflow-hidden transition-all",
                  selectedResultIndex === index
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/30"
                )}
              >
                <div className="aspect-square bg-muted">
                  <img
                    src={result.src}
                    alt={`${result.color} ${result.angle}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDownload(result)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setSelectedResultIndex(index)}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="p-3 border-t border-border bg-card">
                  <p className="text-sm font-medium text-foreground">{result.color}</p>
                  <p className="text-xs text-muted-foreground">{result.angle}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedResultIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-foreground">Refine This Image</h4>
                  <button
                    onClick={() => setSelectedResultIndex(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <Textarea
                  placeholder="Describe adjustments... e.g., 'Make the lighting a little brighter'"
                  value={refinementPrompt}
                  onChange={(e) => setRefinementPrompt(e.target.value)}
                  rows={3}
                  className="mb-4"
                />
                <Button disabled={!refinementPrompt.trim()}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate with Changes
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
