import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, Check, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useMockupWizardStore } from "@/stores/mockupWizardStore";
import { DTG_PRODUCTS, AOP_PRODUCTS, ProductCategory, ProductItem } from "@/lib/mockup-wizard/constants";

export function StepProduct() {
  const { journey, selectedProduct, setSelectedProduct } = useMockupWizardStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);

  const products = journey === 'aop' ? AOP_PRODUCTS : DTG_PRODUCTS;

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    const query = searchQuery.toLowerCase();
    return products.map(category => ({
      ...category,
      subcategories: category.subcategories.map(sub => ({
        ...sub,
        products: sub.products.filter(p => 
          p.name.toLowerCase().includes(query)
        )
      })).filter(sub => sub.products.length > 0)
    })).filter(cat => cat.subcategories.length > 0);
  }, [products, searchQuery]);

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Select Your Product
        </h2>
        <p className="text-muted-foreground">
          Choose the product you want to create a mockup for
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-6"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="input-search-products"
        />
      </motion.div>

      <div className="space-y-4">
        {filteredProducts.map((category, catIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.05 }}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <button
              onClick={() => setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              data-testid={`category-${category.id}`}
            >
              <span className="font-semibold text-foreground">{category.name}</span>
              <ChevronRight className={cn(
                "w-5 h-5 text-muted-foreground transition-transform",
                expandedCategory === category.id && "rotate-90"
              )} />
            </button>

            <AnimatePresence>
              {expandedCategory === category.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id}>
                        <button
                          onClick={() => setExpandedSubcategory(
                            expandedSubcategory === subcategory.id ? null : subcategory.id
                          )}
                          className="w-full px-5 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors border-b border-border/50"
                          data-testid={`subcategory-${subcategory.id}`}
                        >
                          <span className="text-sm font-medium text-muted-foreground">
                            {subcategory.name}
                          </span>
                          <ChevronRight className={cn(
                            "w-4 h-4 text-muted-foreground transition-transform",
                            expandedSubcategory === subcategory.id && "rotate-90"
                          )} />
                        </button>

                        <AnimatePresence>
                          {expandedSubcategory === subcategory.id && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              className="overflow-hidden bg-muted/20"
                            >
                              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {subcategory.products.map((product) => {
                                  const isSelected = selectedProduct?.id === product.id;
                                  
                                  return (
                                    <button
                                      key={product.id}
                                      onClick={() => handleSelectProduct(product)}
                                      className={cn(
                                        "relative p-4 rounded-lg text-left transition-all",
                                        "border-2",
                                        isSelected
                                          ? "border-primary bg-primary/5 shadow-sm"
                                          : "border-transparent bg-card hover:border-primary/30"
                                      )}
                                      data-testid={`product-${product.id}`}
                                    >
                                      {isSelected && (
                                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                          <Check className="w-3 h-3 text-primary-foreground" />
                                        </div>
                                      )}
                                      
                                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-2">
                                        <Package className="w-5 h-5 text-muted-foreground" />
                                      </div>
                                      
                                      <span className="text-sm font-medium text-foreground block">
                                        {product.name}
                                      </span>
                                      
                                      {product.isWearable && (
                                        <span className="text-xs text-muted-foreground">
                                          Wearable
                                        </span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Check className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">{selectedProduct.name}</p>
            <p className="text-sm text-muted-foreground">
              {selectedProduct.isWearable ? 'Wearable product - model customization available' : 'Non-wearable product'}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
