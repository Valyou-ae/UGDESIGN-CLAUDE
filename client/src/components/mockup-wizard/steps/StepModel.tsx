import { motion } from "framer-motion";
import { User, Users, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMockupWizardStore } from "@/stores/mockupWizardStore";
import { 
  AgeGroup, 
  Sex, 
  Ethnicity, 
  ModelSize, 
  SIZES_BY_AGE_GROUP 
} from "@/lib/mockup-wizard/constants";

const AGE_GROUPS: { id: AgeGroup; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'ADULT', label: 'Adult (25-45)', icon: UserCheck },
  { id: 'YOUNG_ADULT', label: 'Young Adult (18-24)', icon: Users },
  { id: 'TEEN', label: 'Teen (13-17)', icon: User }
];

const SEXES: { id: Sex; label: string }[] = [
  { id: 'FEMALE', label: 'Female' },
  { id: 'MALE', label: 'Male' }
];

const ETHNICITIES: { id: Ethnicity; label: string }[] = [
  { id: 'Diverse', label: 'Diverse / Any' },
  { id: 'White', label: 'White / Caucasian' },
  { id: 'Black', label: 'Black / African' },
  { id: 'Hispanic', label: 'Hispanic / Latino' },
  { id: 'Asian', label: 'East Asian' },
  { id: 'Indian', label: 'South Asian / Indian' },
  { id: 'Southeast Asian', label: 'Southeast Asian' },
  { id: 'Middle Eastern', label: 'Middle Eastern' },
  { id: 'Indigenous', label: 'Indigenous' }
];

export function StepModel() {
  const { modelDetails, setModelDetails, selectedProduct } = useMockupWizardStore();

  const availableSizes = SIZES_BY_AGE_GROUP[modelDetails.ageGroup];

  const handleAgeGroupChange = (value: AgeGroup) => {
    const newSizes = SIZES_BY_AGE_GROUP[value];
    const currentSizeValid = newSizes.includes(modelDetails.size);
    
    setModelDetails({
      ageGroup: value,
      size: currentSizeValid ? modelDetails.size : newSizes[Math.floor(newSizes.length / 2)]
    });
  };

  if (!selectedProduct?.isWearable) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center mb-6">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Model Customization Not Available
          </h2>
          <p className="text-muted-foreground">
            This step is skipped for non-wearable products like {selectedProduct?.name}.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Customize the Model
        </h2>
        <p className="text-muted-foreground">
          Define the characteristics of the model wearing your product
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Age Group</label>
          <div className="grid grid-cols-3 gap-3">
            {AGE_GROUPS.map((age) => {
              const isSelected = modelDetails.ageGroup === age.id;
              return (
                <button
                  key={age.id}
                  onClick={() => handleAgeGroupChange(age.id)}
                  className={cn(
                    "flex flex-col items-center p-4 rounded-xl border-2 transition-all",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  )}
                  data-testid={`age-${age.id}`}
                >
                  <age.icon className={cn(
                    "w-6 h-6 mb-2",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className="text-sm font-medium text-foreground">{age.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Sex</label>
            <Select
              value={modelDetails.sex}
              onValueChange={(value: Sex) => setModelDetails({ sex: value })}
            >
              <SelectTrigger data-testid="select-sex">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SEXES.map((sex) => (
                  <SelectItem key={sex.id} value={sex.id}>
                    {sex.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Ethnicity</label>
            <Select
              value={modelDetails.ethnicity}
              onValueChange={(value: Ethnicity) => setModelDetails({ ethnicity: value })}
            >
              <SelectTrigger data-testid="select-ethnicity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ETHNICITIES.map((eth) => (
                  <SelectItem key={eth.id} value={eth.id}>
                    {eth.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Model Wears Size</label>
          <Select
            value={modelDetails.size}
            onValueChange={(value: ModelSize) => setModelDetails({ size: value })}
          >
            <SelectTrigger data-testid="select-size">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            This affects how the garment fits on the model in the mockup
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 p-4 rounded-xl bg-muted/50 border border-border"
      >
        <h4 className="font-medium text-foreground mb-2">Model Preview</h4>
        <p className="text-sm text-muted-foreground">
          {modelDetails.ageGroup === 'ADULT' ? 'Adult' : modelDetails.ageGroup === 'YOUNG_ADULT' ? 'Young adult' : 'Teenage'} {modelDetails.sex.toLowerCase()}, 
          {' '}{modelDetails.ethnicity === 'Diverse' ? 'diverse ethnicity' : modelDetails.ethnicity.toLowerCase()}, 
          {' '}wearing size {modelDetails.size}
        </p>
      </motion.div>
    </div>
  );
}
