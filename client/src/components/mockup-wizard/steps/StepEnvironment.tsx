import { motion } from "framer-motion";
import { MapPin, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useMockupWizardStore } from "@/stores/mockupWizardStore";
import { ENVIRONMENT_SUGGESTIONS } from "@/lib/mockup-wizard/constants";

export function StepEnvironment() {
  const { environmentPrompt, setEnvironmentPrompt } = useMockupWizardStore();

  const handleSuggestionClick = (suggestion: string) => {
    setEnvironmentPrompt(suggestion);
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Describe the Scene
        </h2>
        <p className="text-muted-foreground">
          Tell us about the background and setting for your mockup
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <MapPin className="w-4 h-4" />
            Scene Description
          </label>
          <Textarea
            placeholder="Describe the environment... e.g., 'Modern coffee shop with warm ambient lighting and exposed brick walls'"
            value={environmentPrompt}
            onChange={(e) => setEnvironmentPrompt(e.target.value)}
            rows={4}
            className="resize-none"
            data-testid="textarea-environment"
          />
          <p className="text-xs text-muted-foreground">
            Be specific about the location, lighting, and atmosphere you want
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Sparkles className="w-4 h-4" />
            Quick Suggestions
          </div>
          <div className="flex flex-wrap gap-2">
            {ENVIRONMENT_SUGGESTIONS.map((suggestion, index) => {
              const isSelected = environmentPrompt === suggestion;
              
              return (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm transition-all",
                    "border",
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card hover:border-primary/30 text-foreground"
                  )}
                  data-testid={`suggestion-${index}`}
                >
                  {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                  {suggestion}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {environmentPrompt.trim().length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 rounded-xl bg-green-500/10 border border-green-500/20"
        >
          <div className="flex items-center gap-2 text-green-600">
            <Check className="w-5 h-5" />
            <span className="font-medium">Scene description ready</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {environmentPrompt.length} characters
          </p>
        </motion.div>
      )}
    </div>
  );
}
