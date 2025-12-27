import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Palette, Camera, Film, Sun, Cloud, Users, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { knowledgeApi, type KnowledgeConfig, type KnowledgeOption } from "@/lib/api";

interface KnowledgeSelectorProps {
  value: KnowledgeConfig;
  onChange: (config: KnowledgeConfig) => void;
  compact?: boolean;
}

type CategoryKey = 'style' | 'colorPalette' | 'filmStock' | 'lighting' | 'subject';

interface CategoryConfig {
  key: CategoryKey;
  label: string;
  icon: typeof Palette;
  dataKey: 'styles' | 'palettes' | 'filmStocks' | 'lighting' | 'subjects';
  color: string;
}

const CATEGORIES: CategoryConfig[] = [
  { key: 'style', label: 'Artistic Style', icon: Palette, dataKey: 'styles', color: 'from-purple-500 to-pink-500' },
  { key: 'colorPalette', label: 'Color Palette', icon: Sparkles, dataKey: 'palettes', color: 'from-amber-500 to-orange-500' },
  { key: 'filmStock', label: 'Film Stock', icon: Film, dataKey: 'filmStocks', color: 'from-emerald-500 to-teal-500' },
  { key: 'lighting', label: 'Lighting', icon: Sun, dataKey: 'lighting', color: 'from-yellow-500 to-amber-500' },
  { key: 'subject', label: 'Subject Type', icon: Users, dataKey: 'subjects', color: 'from-blue-500 to-indigo-500' },
];

export function KnowledgeSelector({ value, onChange, compact = false }: KnowledgeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<CategoryKey | null>(null);

  const { data: knowledgeData, isLoading } = useQuery({
    queryKey: ['knowledge-all'],
    queryFn: () => knowledgeApi.getAll(),
    staleTime: 1000 * 60 * 30,
  });

  const activeCount = Object.values(value).filter(Boolean).length;

  const handleSelect = (category: CategoryKey, id: string | null) => {
    if (id === null) {
      const newConfig = { ...value };
      delete newConfig[category];
      onChange(newConfig);
    } else {
      onChange({ ...value, [category]: id });
    }
    setOpenCategory(null);
  };

  const clearAll = () => {
    onChange({});
  };

  const getOptionsForCategory = (dataKey: string): KnowledgeOption[] => {
    if (!knowledgeData) return [];
    const data = knowledgeData as Record<string, KnowledgeOption[]>;
    return data[dataKey] || [];
  };

  const getSelectedName = (category: CategoryKey, dataKey: string): string | null => {
    const selectedId = value[category];
    if (!selectedId) return null;
    const options = getOptionsForCategory(dataKey);
    const option = options.find(o => o.id === selectedId);
    return option?.name || null;
  };

  if (compact) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "gap-2 h-8 text-xs",
              activeCount > 0 && "border-purple-500/50 bg-purple-500/10"
            )}
            data-testid="knowledge-selector-trigger"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Enhance
            {activeCount > 0 && (
              <Badge variant="secondary" className="h-4 px-1 text-[10px] bg-purple-500 text-white">
                {activeCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3" align="start">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Knowledge Base Enhancement</h4>
              {activeCount > 0 && (
                <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearAll}>
                  Clear All
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Apply professional techniques to enhance your generation
            </p>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <CategorySelector
                  key={cat.key}
                  category={cat}
                  selectedId={value[cat.key]}
                  selectedName={getSelectedName(cat.key, cat.dataKey)}
                  options={getOptionsForCategory(cat.dataKey)}
                  isLoading={isLoading}
                  onSelect={(id) => handleSelect(cat.key, id)}
                  isOpen={openCategory === cat.key}
                  onOpenChange={(open) => setOpenCategory(open ? cat.key : null)}
                />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between p-3 h-auto",
            activeCount > 0 && "bg-purple-500/10"
          )}
          data-testid="knowledge-selector-trigger"
        >
          <div className="flex items-center gap-2">
            <div className={cn("p-1.5 rounded-md bg-gradient-to-r", "from-purple-500/20 to-pink-500/20")}>
              <Sparkles className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium">AI Knowledge Enhancement</div>
              <div className="text-xs text-muted-foreground">
                {activeCount > 0 ? `${activeCount} enhancement${activeCount > 1 ? 's' : ''} active` : 'Apply professional techniques'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <Badge variant="secondary" className="bg-purple-500 text-white">
                {activeCount}
              </Badge>
            )}
            <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 px-1">
        {activeCount > 0 && (
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearAll}>
              Clear All
            </Button>
          </div>
        )}
        {CATEGORIES.map((cat) => (
          <CategorySelector
            key={cat.key}
            category={cat}
            selectedId={value[cat.key]}
            selectedName={getSelectedName(cat.key, cat.dataKey)}
            options={getOptionsForCategory(cat.dataKey)}
            isLoading={isLoading}
            onSelect={(id) => handleSelect(cat.key, id)}
            isOpen={openCategory === cat.key}
            onOpenChange={(open) => setOpenCategory(open ? cat.key : null)}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

interface CategorySelectorProps {
  category: CategoryConfig;
  selectedId?: string;
  selectedName: string | null;
  options: KnowledgeOption[];
  isLoading: boolean;
  onSelect: (id: string | null) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function CategorySelector({
  category,
  selectedId,
  selectedName,
  options,
  isLoading,
  onSelect,
  isOpen,
  onOpenChange,
}: CategorySelectorProps) {
  const Icon = category.icon;

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-full justify-between h-9 text-left font-normal",
            selectedId && "border-purple-500/50 bg-purple-500/5"
          )}
          data-testid={`knowledge-category-${category.key}`}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs">{category.label}</span>
          </div>
          <div className="flex items-center gap-1">
            {selectedName ? (
              <>
                <span className="text-xs text-purple-400 truncate max-w-[100px]">{selectedName}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 hover:bg-destructive/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(null);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </>
            ) : (
              <span className="text-xs text-muted-foreground">None</span>
            )}
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <ScrollArea className="h-[250px]">
          <div className="p-2 space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start h-8 text-xs",
                !selectedId && "bg-muted"
              )}
              onClick={() => onSelect(null)}
            >
              None (Default)
            </Button>
            {isLoading ? (
              <div className="text-xs text-muted-foreground p-2">Loading...</div>
            ) : options.length === 0 ? (
              <div className="text-xs text-muted-foreground p-2">No options available</div>
            ) : (
              options.map((option) => (
                <Button
                  key={option.id}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start h-auto py-1.5 px-2 text-left",
                    selectedId === option.id && "bg-purple-500/20 text-purple-400"
                  )}
                  onClick={() => onSelect(option.id)}
                  data-testid={`knowledge-option-${option.id}`}
                >
                  <div>
                    <div className="text-xs font-medium">{option.name}</div>
                    {option.description && (
                      <div className="text-[10px] text-muted-foreground truncate max-w-[200px]">
                        {option.description}
                      </div>
                    )}
                  </div>
                </Button>
              ))
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

export default KnowledgeSelector;
