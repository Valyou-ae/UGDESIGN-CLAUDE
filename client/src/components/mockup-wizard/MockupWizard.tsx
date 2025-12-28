import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMockupWizardStore } from "@/stores/mockupWizardStore";
import { STEP_LABELS, StepKey } from "@/lib/mockup-wizard/constants";

import { JourneySelection } from "./steps/JourneySelection";
import { StepUpload } from "./steps/StepUpload";
import { StepSeamless } from "./steps/StepSeamless";
import { StepStyle } from "./steps/StepStyle";
import { StepProduct } from "./steps/StepProduct";
import { StepModel } from "./steps/StepModel";
import { StepPlatform } from "./steps/StepPlatform";
import { StepEnvironment } from "./steps/StepEnvironment";
import { StepColors } from "./steps/StepColors";
import { StepAngles } from "./steps/StepAngles";
import { StepGenerate } from "./steps/StepGenerate";

const STEP_COMPONENTS: Record<StepKey, React.ComponentType> = {
  journey: JourneySelection,
  upload: StepUpload,
  seamless: StepSeamless,
  style: StepStyle,
  product: StepProduct,
  model: StepModel,
  platform: StepPlatform,
  environment: StepEnvironment,
  colors: StepColors,
  angles: StepAngles,
  generate: StepGenerate
};

export function MockupWizard() {
  const {
    journey,
    currentStep,
    getActiveSteps,
    getCurrentStepIndex,
    nextStep,
    prevStep,
    canProceed,
    resetWizard
  } = useMockupWizardStore();

  useEffect(() => {
    return () => {
      resetWizard();
    };
  }, [resetWizard]);

  const stepKeys = getActiveSteps();
  const currentIndex = getCurrentStepIndex();
  const isFirstStep = currentStep === 'journey';
  const isLastStep = currentStep === 'generate';
  const CurrentStepComponent = STEP_COMPONENTS[currentStep];

  const visibleSteps = stepKeys;

  return (
    <div className="min-h-screen bg-background">
      {!isFirstStep && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border"
        >
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  journey === 'dtg' 
                    ? "bg-amber-500/20 text-amber-600" 
                    : "bg-purple-500/20 text-purple-600"
                )}>
                  {journey === 'dtg' ? 'DTG' : 'AOP'}
                </span>
                <span className="text-sm text-muted-foreground">
                  Step {visibleSteps.indexOf(currentStep) + 1} of {visibleSteps.length}
                </span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {STEP_LABELS[currentStep]}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {visibleSteps.map((step, index) => {
                const stepIndex = visibleSteps.indexOf(step);
                const currentVisibleIndex = visibleSteps.indexOf(currentStep);
                const isCompleted = stepIndex < currentVisibleIndex;
                const isCurrent = step === currentStep;

                return (
                  <div key={step} className="flex-1 flex items-center">
                    <div className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium transition-colors",
                      isCompleted && "bg-primary text-primary-foreground",
                      isCurrent && "bg-primary/20 text-primary border-2 border-primary",
                      !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                    )}>
                      {isCompleted ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < visibleSteps.length - 1 && (
                      <div className={cn(
                        "flex-1 h-0.5 mx-1 transition-colors",
                        isCompleted ? "bg-primary" : "bg-muted"
                      )} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.header>
      )}

      <main className="py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {!isFirstStep && (
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border"
        >
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentIndex === 0 || currentStep === stepKeys[0]}
              data-testid="button-prev"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {!isLastStep && (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                data-testid="button-next"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </motion.footer>
      )}
    </div>
  );
}
