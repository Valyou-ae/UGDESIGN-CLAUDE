import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, X, Check, AlertCircle, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useMockupWizardStore } from "@/stores/mockupWizardStore";
import { imageValidator } from "@/lib/mockup-wizard/imageValidator";

export function StepUpload() {
  const { 
    journey,
    designImage, 
    setDesignImage, 
    isSeamlessUpload, 
    setIsSeamlessUpload 
  } = useMockupWizardStore();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);

    const result = await imageValidator.processFile(file);
    
    if ('error' in result) {
      setError(result.error);
      setIsProcessing(false);
      return;
    }

    setDesignImage(result.dataUrl, result.file);
    setIsProcessing(false);
  }, [setDesignImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleRemove = useCallback(() => {
    setDesignImage(null, null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [setDesignImage]);

  return (
    <div className="max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Upload Your Design
        </h2>
        <p className="text-muted-foreground">
          {journey === 'aop' 
            ? 'Upload your pattern or design to create all-over print mockups'
            : 'Upload your logo or graphic to place on products'}
        </p>
      </motion.div>

      {!designImage ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300",
            "flex flex-col items-center justify-center min-h-[300px]",
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
            isProcessing && "opacity-50 pointer-events-none"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          data-testid="upload-dropzone"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            data-testid="upload-input"
          />

          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Upload className="w-10 h-10 text-primary" />
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">
            {isProcessing ? 'Processing...' : 'Drop your design here'}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-6">
            or click to browse your files
          </p>

          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            data-testid="button-browse"
          >
            Browse Files
          </Button>

          <p className="text-xs text-muted-foreground mt-6">
            PNG, JPEG, or WebP • Max 10MB • 300-4096px
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-2xl border border-border bg-card overflow-hidden"
        >
          <div className="aspect-square relative bg-muted/50 flex items-center justify-center p-8">
            <img
              src={designImage}
              alt="Uploaded design"
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              data-testid="image-preview"
            />
          </div>

          <div className="p-4 flex items-center justify-between border-t border-border">
            <div className="flex items-center gap-2 text-green-600">
              <Check className="w-5 h-5" />
              <span className="font-medium">Design uploaded</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-muted-foreground hover:text-destructive"
              data-testid="button-remove"
            >
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </motion.div>
      )}

      {journey === 'aop' && designImage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl bg-muted/50 border border-border"
        >
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={isSeamlessUpload}
              onCheckedChange={(checked) => setIsSeamlessUpload(checked === true)}
              data-testid="checkbox-seamless"
            />
            <div>
              <p className="font-medium text-foreground">
                This design is already a seamless pattern
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Check this if your design can tile without visible seams. We'll skip the pattern generation step.
              </p>
            </div>
          </label>
        </motion.div>
      )}
    </div>
  );
}
