import { useState, useEffect, useCallback } from "react";
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
  Lightbulb,
  X,
  AlertCircle
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
import { mockupApi, MockupEvent } from "@/lib/api";

interface QueueItem {
  id: string;
  color: string;
  colorHex: string;
  angle: string;
  size: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  imageData?: string;
  mimeType?: string;
}

const DESIGN_INSIGHTS = [
  { icon: "🎨", text: "Light-colored designs pop best on dark garments" },
  { icon: "📐", text: "Keep important elements centered for best placement" },
  { icon: "🌟", text: "High contrast designs create stronger visual impact" },
  { icon: "🖼️", text: "Simpler designs often translate better to prints" },
  { icon: "💡", text: "Consider how your design will look at different sizes" },
  { icon: "🎯", text: "White or light outlines help designs stand out on any color" },
  { icon: "✨", text: "Metallic and gradient effects may appear differently when printed" },
  { icon: "🔲", text: "Leave breathing room around the edges of your design" },
  { icon: "📱", text: "Preview mockups on mobile to see how customers will view them" },
  { icon: "🎪", text: "Busy patterns work great for all-over prints" },
];

export function StepGenerate() {
  const {
    designImage,
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
    getTotalImages,
    patternScale,
    isSeamlessUpload,
    selectedSeamlessVariation
  } = useMockupWizardStore();

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [refinementPrompt, setRefinementPrompt] = useState("");
  const [selectedResultIndex, setSelectedResultIndex] = useState<number | null>(null);
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const { toast } = useToast();

  const totalImages = getTotalImages();
  const brandStyle = BRAND_STYLES.find(s => s.id === selectedBrandStyle);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setCurrentInsightIndex((prev) => (prev + 1) % DESIGN_INSIGHTS.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const initializeQueue = useCallback(() => {
    const items: QueueItem[] = [];
    const colorsToUse = journey === 'aop' ? [{ name: 'Pattern', hex: '#888888' }] : selectedColors;
    const sizeToUse = modelDetails.size;
    
    for (const color of colorsToUse) {
      for (const angle of selectedAngles) {
        items.push({
          id: `${color.name}-${angle.id}-${sizeToUse}`,
          color: color.name,
          colorHex: color.hex,
          angle: angle.name,
          size: sizeToUse,
          status: 'pending'
        });
      }
    }
    setQueueItems(items);
    return items;
  }, [journey, selectedColors, selectedAngles, modelDetails.size]);

  const handleGenerate = async () => {
    if (!designImage) {
      toast({
        title: "No design",
        description: "Please upload a design first",
        variant: "destructive"
      });
      return;
    }

    startGeneration();
    setHasStarted(true);
    const queue = initializeQueue();
    let currentGeneratingIndex = 0;

    if (queue.length > 0) {
      setQueueItems(prev => prev.map((item, i) => 
        i === 0 ? { ...item, status: 'generating' } : item
      ));
    }

    const imageToUse = journey === 'aop' && selectedSeamlessVariation 
      ? selectedSeamlessVariation 
      : designImage;

    try {
      await mockupApi.generateBatch(
        imageToUse,
        {
          productType: selectedProduct?.id || 't-shirt',
          productColors: journey === 'aop' ? ['White'] : selectedColors.map(c => c.name),
          productSizes: [modelDetails.size],
          angles: selectedAngles.map(a => a.id),
          scene: 'studio',
          style: selectedBrandStyle || 'minimal',
          modelDetails: {
            age: modelDetails.ageGroup,
            sex: modelDetails.sex,
            ethnicity: modelDetails.ethnicity,
            modelSize: modelDetails.size
          },
          journey: journey === 'aop' ? 'AOP' : 'DTG',
          patternScale: journey === 'aop' ? patternScale : undefined,
          isSeamlessPattern: journey === 'aop' ? isSeamlessUpload : undefined,
          outputQuality: 'high'
        },
        (event: MockupEvent) => {
          console.log("Generation event:", event.type, event.data);

          switch (event.type) {
            case 'batch_started':
              setGenerationProgress(5, 'Starting batch generation...');
              break;

            case 'status':
              const statusData = event.data as { stage: string; message: string; progress: number };
              setGenerationProgress(statusData.progress, statusData.message);
              break;

            case 'image':
              const imageData = event.data as { 
                jobId: string; 
                angle: string; 
                color: string; 
                imageData: string; 
                mimeType: string;
                size?: string;
              };
              
              setQueueItems(prev => {
                const updated = prev.map(item => {
                  if (item.angle.toLowerCase() === imageData.angle.toLowerCase() && 
                      (item.color === imageData.color || journey === 'aop')) {
                    return { 
                      ...item, 
                      status: 'completed' as const, 
                      imageData: imageData.imageData,
                      mimeType: imageData.mimeType
                    };
                  }
                  return item;
                });

                const completedCount = updated.filter(i => i.status === 'completed').length;
                const nextPending = updated.findIndex(i => i.status === 'pending');
                if (nextPending >= 0) {
                  updated[nextPending] = { ...updated[nextPending], status: 'generating' };
                }

                const progress = Math.round((completedCount / updated.length) * 100);
                setGenerationProgress(progress, `Generated ${completedCount} of ${updated.length}...`);

                return updated;
              });

              addGenerationResult({
                id: imageData.jobId,
                src: `data:${imageData.mimeType};base64,${imageData.imageData}`,
                color: imageData.color,
                angle: imageData.angle,
                timestamp: new Date()
              });
              break;

            case 'image_error':
              const errorData = event.data as { angle: string; color: string; error: string };
              setQueueItems(prev => prev.map(item => {
                if (item.angle.toLowerCase() === errorData.angle.toLowerCase() && 
                    (item.color === errorData.color || journey === 'aop')) {
                  return { ...item, status: 'failed' as const };
                }
                return item;
              }));
              break;

            case 'complete':
              setGenerationComplete();
              const completeData = event.data as { totalGenerated: number };
              toast({
                title: "Mockups Generated!",
                description: `Successfully created ${completeData.totalGenerated} mockup${completeData.totalGenerated !== 1 ? 's' : ''}`
              });
              break;

            case 'error':
              setGenerationComplete();
              const errData = event.data as { message: string };
              toast({
                title: "Generation Failed",
                description: errData.message || "An error occurred",
                variant: "destructive"
              });
              break;
          }
        }
      );
    } catch (error) {
      console.error("Generation error:", error);
      setGenerationComplete();
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "An error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDownload = async (item: QueueItem) => {
    if (!item.imageData) return;
    
    try {
      const byteCharacters = atob(item.imageData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: item.mimeType || 'image/png' });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mockup-${item.color}-${item.angle}.png`;
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

  const handleDownloadAll = async () => {
    const completedItems = queueItems.filter(i => i.status === 'completed' && i.imageData);
    for (const item of completedItems) {
      await handleDownload(item);
      await new Promise(r => setTimeout(r, 300));
    }
  };

  const ShimmerCard = ({ item }: { item: QueueItem }) => (
    <div className="relative rounded-xl border border-border bg-card overflow-hidden">
      <div className="aspect-square bg-muted relative overflow-hidden">
        {designImage && (
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div 
              className="w-1/3 h-1/3 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${designImage})` }}
            />
          </div>
        )}
        
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${item.colorHex}15 50%, transparent 100%)`,
            animation: 'shimmer 2s infinite'
          }}
        />
        
        {item.status === 'generating' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
            <span className="text-xs text-white font-medium">Generating...</span>
          </div>
        )}
        
        {item.status === 'pending' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-20 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl opacity-20">👕</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full border border-border shadow-sm"
            style={{ backgroundColor: item.colorHex }}
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{item.color}</p>
            <p className="text-xs text-muted-foreground">{item.angle} · Size {item.size}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const CompletedCard = ({ item, index }: { item: QueueItem; index: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="group relative rounded-xl border border-border overflow-hidden bg-card hover:border-primary/50 transition-colors"
    >
      <div className="aspect-square bg-muted relative">
        {item.imageData && (
          <img
            src={`data:${item.mimeType};base64,${item.imageData}`}
            alt={`${item.color} ${item.angle}`}
            className="w-full h-full object-cover"
          />
        )}
        
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleDownload(item)}
            data-testid={`button-download-${item.id}`}
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full border border-border shadow-sm"
            style={{ backgroundColor: item.colorHex }}
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{item.color}</p>
            <p className="text-xs text-muted-foreground">{item.angle} · Size {item.size}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const FailedCard = ({ item }: { item: QueueItem }) => (
    <div className="relative rounded-xl border border-destructive/50 bg-card overflow-hidden">
      <div className="aspect-square bg-muted flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
          <span className="text-xs text-muted-foreground">Failed</span>
        </div>
      </div>
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full border border-border shadow-sm"
            style={{ backgroundColor: item.colorHex }}
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{item.color}</p>
            <p className="text-xs text-muted-foreground">{item.angle} · Size {item.size}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4">
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Generate Mockups
        </h2>
        <p className="text-muted-foreground">
          {isGenerating ? 'Creating your mockups...' : 'Review your selections and start generating'}
        </p>
      </motion.div>

      {!hasStarted && (
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

      {(isGenerating || queueItems.length > 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {isGenerating && (
            <>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{generationStatus}</h3>
                    <p className="text-sm text-muted-foreground">
                      {queueItems.filter(i => i.status === 'completed').length} of {queueItems.length} complete
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">{generationProgress}%</span>
                  </div>
                </div>
                <Progress value={generationProgress} className="h-2" />
              </div>

              <motion.div
                key={currentInsightIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Design Tip</p>
                  <p className="text-sm text-muted-foreground">
                    {DESIGN_INSIGHTS[currentInsightIndex].icon} {DESIGN_INSIGHTS[currentInsightIndex].text}
                  </p>
                </div>
              </motion.div>
            </>
          )}

          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              {isGenerating ? 'Queue' : 'Generated Mockups'} ({queueItems.filter(i => i.status === 'completed').length}/{queueItems.length})
            </h3>
            {queueItems.some(i => i.status === 'completed') && (
              <Button variant="outline" size="sm" onClick={handleDownloadAll}>
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {queueItems.map((item, index) => {
              if (item.status === 'completed') {
                return <CompletedCard key={item.id} item={item} index={index} />;
              } else if (item.status === 'failed') {
                return <FailedCard key={item.id} item={item} />;
              } else {
                return <ShimmerCard key={item.id} item={item} />;
              }
            })}
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
