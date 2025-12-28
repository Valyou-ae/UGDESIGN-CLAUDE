import { motion } from "framer-motion";
import { 
  User, 
  RotateCw, 
  ScanLine, 
  Search, 
  ArrowLeft,
  Check,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMockupWizardStore } from "@/stores/mockupWizardStore";
import { MOCKUP_ANGLES, MockupAngle } from "@/lib/mockup-wizard/constants";

const ANGLE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'front': User,
  'three-quarter': RotateCw,
  'side': ScanLine,
  'closeup': Search,
  'back': ArrowLeft
};

export function StepAngles() {
  const { selectedAngles, toggleAngle, selectedColors, journey, getTotalImages } = useMockupWizardStore();

  const totalImages = getTotalImages();

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Choose Mockup Angles
        </h2>
        <p className="text-muted-foreground">
          Select the camera angles for your product mockups
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCKUP_ANGLES.map((angle, index) => {
          const Icon = ANGLE_ICONS[angle.id] || User;
          const isSelected = selectedAngles.some(a => a.id === angle.id);

          return (
            <motion.button
              key={angle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => toggleAngle(angle)}
              className={cn(
                "group relative p-6 rounded-xl text-left transition-all",
                "border-2",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card hover:border-primary/30"
              )}
              data-testid={`angle-${angle.id}`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}

              {angle.recommended && (
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 text-xs font-medium">
                  <Star className="w-3 h-3" />
                  Recommended
                </div>
              )}

              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors",
                "mt-4",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
              )}>
                <Icon className="w-7 h-7" />
              </div>

              <h3 className="font-semibold text-foreground mb-1">
                {angle.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {angle.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 p-6 rounded-xl bg-muted/50 border border-border"
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Generation Summary
            </h4>
            <p className="text-sm text-muted-foreground">
              {journey === 'aop' ? '1 pattern' : `${Math.max(selectedColors.length, 1)} color${selectedColors.length !== 1 ? 's' : ''}`} × {selectedAngles.length || 0} angle{selectedAngles.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{totalImages}</div>
            <div className="text-sm text-muted-foreground">total images</div>
          </div>
        </div>

        {selectedAngles.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {selectedAngles.map((angle) => (
                <span
                  key={angle.id}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {angle.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
