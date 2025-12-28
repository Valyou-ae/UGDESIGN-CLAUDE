import { create } from 'zustand';
import { 
  JourneyType, 
  StepKey, 
  DTG_STEP_KEYS, 
  AOP_STEP_KEYS,
  ModelDetails,
  DEFAULT_MODEL_DETAILS,
  ProductColor,
  MockupAngle,
  ProductItem,
  STANDARD_COLORS,
  GenerationJob,
  GenerationResult,
  PLATFORMS
} from '@/lib/mockup-wizard/constants';

export interface MockupWizardState {
  journey: JourneyType;
  currentStep: StepKey;
  
  designImage: string | null;
  designFile: File | null;
  isSeamlessUpload: boolean;
  
  seamlessPattern: string | null;
  seamlessVariations: string[];
  selectedSeamlessVariation: string | null;
  patternScale: number;
  
  selectedBrandStyle: string | null;
  
  selectedProduct: ProductItem | null;
  
  modelDetails: ModelDetails;
  
  selectedPlatform: string | null;
  recommendedLighting: string | null;
  recommendedMaterial: string | null;
  
  environmentPrompt: string;
  
  selectedColors: ProductColor[];
  
  selectedAngles: MockupAngle[];
  
  isGenerating: boolean;
  generationProgress: number;
  generationStatus: string;
  generationJobs: GenerationJob[];
  generationResults: GenerationResult[];
  
  personaLockImage: string | null;
  consistentDescription: string | null;
  
  setJourney: (journey: JourneyType) => void;
  setCurrentStep: (step: StepKey) => void;
  nextStep: () => void;
  prevStep: () => void;
  canProceed: () => boolean;
  getActiveSteps: () => StepKey[];
  getCurrentStepIndex: () => number;
  
  setDesignImage: (image: string | null, file: File | null) => void;
  setIsSeamlessUpload: (isSeamless: boolean) => void;
  
  setSeamlessPattern: (pattern: string | null) => void;
  setSeamlessVariations: (variations: string[]) => void;
  setSelectedSeamlessVariation: (variation: string | null) => void;
  setPatternScale: (scale: number) => void;
  
  setSelectedBrandStyle: (style: string | null) => void;
  
  setSelectedProduct: (product: ProductItem | null) => void;
  
  setModelDetails: (details: Partial<ModelDetails>) => void;
  
  setSelectedPlatform: (platform: string | null) => void;
  updatePresetsFromContext: () => void;
  
  setEnvironmentPrompt: (prompt: string) => void;
  
  toggleColor: (color: ProductColor) => void;
  setSelectedColors: (colors: ProductColor[]) => void;
  
  toggleAngle: (angle: MockupAngle) => void;
  setSelectedAngles: (angles: MockupAngle[]) => void;
  
  startGeneration: () => void;
  setGenerationProgress: (progress: number, status: string) => void;
  addGenerationResult: (result: GenerationResult) => void;
  setGenerationComplete: () => void;
  
  setPersonaLockImage: (image: string | null) => void;
  setConsistentDescription: (description: string | null) => void;
  
  resetWizard: () => void;
  
  getTotalImages: () => number;
  isAllPrerequisitesMet: () => boolean;
}

const initialState = {
  journey: null as JourneyType,
  currentStep: 'journey' as StepKey,
  designImage: null,
  designFile: null,
  isSeamlessUpload: false,
  seamlessPattern: null,
  seamlessVariations: [],
  selectedSeamlessVariation: null,
  patternScale: 50,
  selectedBrandStyle: null,
  selectedProduct: null,
  modelDetails: DEFAULT_MODEL_DETAILS,
  selectedPlatform: null,
  recommendedLighting: null,
  recommendedMaterial: null,
  environmentPrompt: '',
  selectedColors: [] as ProductColor[],
  selectedAngles: [] as MockupAngle[],
  isGenerating: false,
  generationProgress: 0,
  generationStatus: '',
  generationJobs: [] as GenerationJob[],
  generationResults: [] as GenerationResult[],
  personaLockImage: null,
  consistentDescription: null
};

export const useMockupWizardStore = create<MockupWizardState>((set, get) => ({
  ...initialState,

  setJourney: (journey) => {
    set({ 
      journey, 
      currentStep: 'upload'
    });
  },
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  getActiveSteps: () => {
    const { journey, isSeamlessUpload, selectedProduct } = get();
    
    let baseSteps: StepKey[];
    
    if (journey === 'aop') {
      baseSteps = [...AOP_STEP_KEYS];
      if (isSeamlessUpload) {
        baseSteps = baseSteps.filter(s => s !== 'seamless');
      }
    } else {
      baseSteps = [...DTG_STEP_KEYS];
    }
    
    if (selectedProduct && !selectedProduct.isWearable) {
      baseSteps = baseSteps.filter(s => s !== 'model');
    }
    
    return baseSteps;
  },
  
  getCurrentStepIndex: () => {
    const { currentStep } = get();
    const steps = get().getActiveSteps();
    const index = steps.indexOf(currentStep);
    return index >= 0 ? index : 0;
  },
  
  nextStep: () => {
    const { currentStep } = get();
    const steps = get().getActiveSteps();
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex >= 0 && currentIndex < steps.length - 1) {
      set({ currentStep: steps[currentIndex + 1] });
    }
  },
  
  prevStep: () => {
    const { currentStep } = get();
    const steps = get().getActiveSteps();
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex > 0) {
      set({ currentStep: steps[currentIndex - 1] });
    }
  },
  
  canProceed: () => {
    const state = get();
    switch (state.currentStep) {
      case 'journey':
        return state.journey !== null;
      case 'upload':
        return state.designImage !== null;
      case 'seamless':
        return state.selectedSeamlessVariation !== null;
      case 'style':
        return state.selectedBrandStyle !== null;
      case 'product':
        return state.selectedProduct !== null;
      case 'model':
        return true;
      case 'platform':
        return state.selectedPlatform !== null;
      case 'environment':
        return state.environmentPrompt.trim().length > 0;
      case 'colors':
        if (state.journey === 'aop') {
          return true;
        }
        return state.selectedColors.length > 0;
      case 'angles':
        return state.selectedAngles.length > 0;
      case 'generate':
        return state.isAllPrerequisitesMet();
      default:
        return false;
    }
  },
  
  isAllPrerequisitesMet: () => {
    const state = get();
    
    if (!state.designImage) return false;
    if (!state.selectedBrandStyle) return false;
    if (!state.selectedProduct) return false;
    if (!state.selectedPlatform) return false;
    if (!state.environmentPrompt.trim()) return false;
    if (state.selectedAngles.length === 0) return false;
    
    if (state.journey !== 'aop' && state.selectedColors.length === 0) {
      return false;
    }
    
    if (state.journey === 'aop' && !state.isSeamlessUpload && !state.selectedSeamlessVariation) {
      return false;
    }
    
    return true;
  },
  
  setDesignImage: (image, file) => set({ designImage: image, designFile: file }),
  
  setIsSeamlessUpload: (isSeamless) => set({ isSeamlessUpload: isSeamless }),
  
  setSeamlessPattern: (pattern) => set({ seamlessPattern: pattern }),
  
  setSeamlessVariations: (variations) => set({ seamlessVariations: variations }),
  
  setSelectedSeamlessVariation: (variation) => set({ selectedSeamlessVariation: variation }),
  
  setPatternScale: (scale) => set({ patternScale: scale }),
  
  setSelectedBrandStyle: (style) => set({ selectedBrandStyle: style }),
  
  setSelectedProduct: (product) => {
    const state = get();
    const update: Partial<MockupWizardState> = { selectedProduct: product };
    
    if (product && state.journey !== 'aop') {
      if (product.availableColors.length > 0) {
        update.selectedColors = [product.availableColors[0]];
      } else {
        update.selectedColors = [STANDARD_COLORS[0]];
      }
    }
    
    set(update);
  },
  
  setModelDetails: (details) => set((state) => ({
    modelDetails: { ...state.modelDetails, ...details }
  })),
  
  setSelectedPlatform: (platform) => {
    set({ selectedPlatform: platform });
    get().updatePresetsFromContext();
  },
  
  updatePresetsFromContext: () => {
    const { selectedPlatform, selectedBrandStyle } = get();
    
    const platform = PLATFORMS.find(p => p.id === selectedPlatform);
    
    let lighting = platform?.recommendedLighting || 'studio';
    let material = platform?.recommendedMaterial || 'brand_new';
    
    if (selectedBrandStyle === 'VINTAGE_RETRO') {
      material = 'slightly_worn';
      lighting = 'natural';
    } else if (selectedBrandStyle === 'STREET_URBAN') {
      lighting = 'natural';
      material = 'lightly_worn';
    } else if (selectedBrandStyle === 'EDITORIAL_FASHION') {
      lighting = 'dramatic';
    }
    
    set({ recommendedLighting: lighting, recommendedMaterial: material });
  },
  
  setEnvironmentPrompt: (prompt) => set({ environmentPrompt: prompt }),
  
  toggleColor: (color) => set((state) => {
    const exists = state.selectedColors.some(c => c.hex === color.hex);
    if (exists) {
      return { selectedColors: state.selectedColors.filter(c => c.hex !== color.hex) };
    }
    return { selectedColors: [...state.selectedColors, color] };
  }),
  
  setSelectedColors: (colors) => set({ selectedColors: colors }),
  
  toggleAngle: (angle) => set((state) => {
    const exists = state.selectedAngles.some(a => a.id === angle.id);
    if (exists) {
      return { selectedAngles: state.selectedAngles.filter(a => a.id !== angle.id) };
    }
    return { selectedAngles: [...state.selectedAngles, angle] };
  }),
  
  setSelectedAngles: (angles) => set({ selectedAngles: angles }),
  
  startGeneration: () => set({ 
    isGenerating: true, 
    generationProgress: 0, 
    generationStatus: 'Initializing...',
    generationJobs: [],
    generationResults: []
  }),
  
  setGenerationProgress: (progress, status) => set({ 
    generationProgress: progress, 
    generationStatus: status 
  }),
  
  addGenerationResult: (result) => set((state) => ({
    generationResults: [...state.generationResults, result]
  })),
  
  setGenerationComplete: () => set({ 
    isGenerating: false, 
    generationProgress: 100, 
    generationStatus: 'Complete!' 
  }),
  
  setPersonaLockImage: (image) => set({ personaLockImage: image }),
  
  setConsistentDescription: (description) => set({ consistentDescription: description }),
  
  getTotalImages: () => {
    const { selectedColors, selectedAngles, journey } = get();
    const colorCount = journey === 'aop' ? 1 : Math.max(selectedColors.length, 1);
    const angleCount = Math.max(selectedAngles.length, 1);
    return colorCount * angleCount;
  },
  
  resetWizard: () => set(initialState)
}));
