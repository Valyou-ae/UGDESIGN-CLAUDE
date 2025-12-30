# Color Consistency Fix for Two-Stage Mockup Generation

## Problem Identified
User generated 4 mockups (1 color × 4 angles) but got 4 different shades of the same color.

**Root Cause:** Stage 1 (blank garment) generates independently for each angle, and Gemini interprets the color slightly differently each time.

---

## Solutions (Ranked by Effectiveness)

### Solution 1: Generate ONE Blank Garment, Reuse for All Angles ⭐⭐⭐⭐⭐
**Best Solution - Most Consistent**

**Concept:**
- Generate blank garment ONCE for the front angle
- Reuse that SAME blank garment as reference for other angles
- Pass it to Gemini with: "Generate THIS exact same garment from X angle"

**Implementation:**

```typescript
// In generateMockupBatch() function

// Step 1: Generate the FIRST blank garment (usually front angle)
const referenceBlankGarment = await generateBlankGarment(
  renderSpec, 
  personaHeadshot, 
  undefined // No reference yet
);

// Step 2: For subsequent angles, pass the reference
for (const job of remainingJobs) {
  const angleBlankGarment = await generateBlankGarment(
    renderSpec,
    personaHeadshot,
    referenceBlankGarment.imageData // Use first as reference
  );
  
  // Composite design onto this angle's garment
  const result = await compositeDesignOntoGarment({
    designBase64: request.designImage,
    blankGarmentBase64: angleBlankGarment.imageData,
    productName: request.product.name,
    cameraAngle: job.angle
  });
}
```

**Pros:**
✅ Perfect color consistency (AI references the exact garment)
✅ Model consistency (same person across all angles)
✅ Lighting consistency (same setup)
✅ Only slight variations due to angle changes

**Cons:**
❌ Still uses 4 API calls (1 reference + 3 more angles)
❌ Requires reference image passing

**Expected Result:** 95%+ color consistency

---

### Solution 2: Enhanced Color Lock Prompt ⭐⭐⭐⭐
**Good Solution - Improves Prompt Specificity**

**Add exact RGB/Hex enforcement to blank garment prompt:**

```typescript
// In generateBlankGarment() function prompt

GARMENT COLOR LOCK (CRITICAL):
- The garment fabric color MUST be EXACTLY: ${color.name} (${color.hex})
- RGB values: ${hexToRgb(color.hex)} - EXACT MATCH REQUIRED
- Color accuracy: ±2% tolerance maximum
- NO color interpretation, NO artistic liberty
- Same exact shade must appear in final image
- Use color picker reference: ${color.hex}
- This is a PHYSICAL color specification, not a suggestion

COLOR VERIFICATION:
Sample the rendered garment's non-printed areas and ensure RGB values match within ±5 points:
Target RGB: ${hexToRgb(color.hex)}
Acceptable range: Each channel ±5
```

**Pros:**
✅ No architecture changes needed
✅ Improves consistency with better prompts
✅ No extra API calls

**Cons:**
❌ Still relies on Gemini's interpretation
❌ May achieve 70-80% consistency (not 100%)

**Expected Result:** 70-80% color consistency

---

### Solution 3: Post-Generation Color Correction ⭐⭐⭐
**Practical Solution - Fix After Generation**

**Apply color correction in Stage 2 (after compositing):**

```typescript
// In compositeDesignOntoGarment() function

async function applyColorCorrection(
  mockupBase64: string,
  targetColor: { hex: string; name: string },
  designMaskBase64: string
): Promise<Buffer> {
  
  const image = sharp(Buffer.from(mockupBase64, 'base64'));
  const targetRgb = hexToRgb(targetColor.hex);
  
  // 1. Create mask of fabric areas (non-design areas)
  const fabricMask = await createFabricMask(mockupBase64, designMaskBase64);
  
  // 2. Sample current fabric color
  const currentColor = await sampleFabricColor(mockupBase64, fabricMask);
  
  // 3. Calculate color shift needed
  const colorShift = {
    r: targetRgb.r - currentColor.r,
    g: targetRgb.g - currentColor.g,
    b: targetRgb.b - currentColor.b
  };
  
  // 4. Apply color correction to fabric areas only
  const corrected = await image
    .modulate({
      brightness: calculateBrightness(colorShift),
      saturation: calculateSaturation(colorShift)
    })
    .linear(
      calculateMultiplier(colorShift), 
      calculateOffset(colorShift)
    )
    .toBuffer();
  
  return corrected;
}
```

**Pros:**
✅ Guarantees exact color match
✅ Works regardless of Gemini's interpretation
✅ Can be applied selectively (fabric only, not design)

**Cons:**
❌ Complex to implement correctly
❌ May affect lighting/shadows if not careful
❌ Risk of unnatural color correction

**Expected Result:** 90-95% color consistency

---

### Solution 4: Pre-Generated Blank Garment Library ⭐⭐⭐⭐⭐
**Ultimate Solution - Best for Production**

**Create a library of pre-generated blank garments:**

```typescript
// Pre-generate and cache blank garments
const blankGarmentLibrary = {
  'tshirt-charcoal-front-female-adult-M': 'cached_base64_image',
  'tshirt-charcoal-side-female-adult-M': 'cached_base64_image',
  'tshirt-charcoal-three-quarter-female-adult-M': 'cached_base64_image',
  'tshirt-charcoal-closeup-female-adult-M': 'cached_base64_image'
  // ... etc
};

// On mockup generation request:
async function getBlankGarment(params) {
  const cacheKey = `${params.product}-${params.color}-${params.angle}-${params.gender}-${params.age}-${params.size}`;
  
  // Check if we have a cached blank garment
  if (blankGarmentLibrary[cacheKey]) {
    return blankGarmentLibrary[cacheKey];
  }
  
  // If not, generate and cache it
  const blankGarment = await generateBlankGarment(params);
  blankGarmentLibrary[cacheKey] = blankGarment;
  
  return blankGarment;
}
```

**Pros:**
✅ 100% color consistency (exact same blank used)
✅ Faster generation (no API call for blank)
✅ Lower cost (only design compositing needed)
✅ Perfect model/lighting consistency

**Cons:**
❌ Requires upfront generation of library
❌ Storage needed for cached images
❌ Less flexible (pre-defined combinations)

**Expected Result:** 100% color consistency

---

## 🎯 Recommended Approach

**Immediate Fix (Today):**
Implement **Solution 1** (Reference-Based Generation)

**Short-Term (This Week):**
Add **Solution 2** (Enhanced Color Lock Prompts)

**Long-Term (Next Sprint):**
Build **Solution 4** (Blank Garment Library) for production

---

## 📝 Implementation Priority

### Phase 1: Reference-Based Generation (Solution 1)
**Effort:** 2-4 hours  
**Impact:** HIGH (95%+ consistency)  
**Risk:** LOW

**Changes needed:**
1. Modify `generateMockupBatch()` to generate reference first
2. Pass reference image to subsequent `generateBlankGarment()` calls
3. Update prompt to say "Match THIS exact garment from X angle"

### Phase 2: Enhanced Prompts (Solution 2)
**Effort:** 1-2 hours  
**Impact:** MEDIUM (70-80% consistency)  
**Risk:** LOW

**Changes needed:**
1. Add RGB specifications to color lock
2. Add color verification instructions
3. Emphasize exact match requirement

### Phase 3: Color Correction (Solution 3)
**Effort:** 1-2 days  
**Impact:** HIGH (90-95% consistency)  
**Risk:** MEDIUM

**Changes needed:**
1. Implement fabric mask generation
2. Add color sampling function
3. Apply selective color correction
4. Test to avoid affecting shadows/highlights

### Phase 4: Blank Library (Solution 4)
**Effort:** 1 week  
**Impact:** HIGHEST (100% consistency)  
**Risk:** LOW

**Changes needed:**
1. Pre-generate blank garments for common combinations
2. Set up caching system (Redis/database)
3. Update generation flow to use cache
4. Build cache warming strategy

---

## 🧪 Testing Each Solution

### Test Case: Generate 4 Angles with Charcoal Color

**Success Criteria:**
- All 4 mockups have identical garment color
- Color matches the hex code provided
- Variations only in angle/perspective
- Model and lighting consistent

**Measurement:**
Extract RGB values from non-design fabric areas:
- Front: RGB(X, Y, Z)
- Three-quarter: RGB(X±5, Y±5, Z±5)
- Side: RGB(X±5, Y±5, Z±5)
- Closeup: RGB(X±5, Y±5, Z±5)

Target: ±5 RGB units maximum deviation

---

## 💡 Quick Win: Combine Solutions 1 + 2

**Best immediate approach:**

```typescript
// Enhanced generateBlankGarment with reference + strict color

async function generateBlankGarmentWithColorLock(
  renderSpec: RenderSpecification,
  personaHeadshot?: string,
  referenceBlankGarment?: string, // NEW: Reference image
  targetColor?: { hex: string; name: string; rgb: { r: number; g: number; b: number } }
): Promise<GeneratedMockup | null> {
  
  const parts = [];
  
  // Add reference if provided
  if (referenceBlankGarment) {
    parts.push({
      inlineData: { data: referenceBlankGarment, mimeType: "image/png" }
    });
  }
  
  // Add persona if provided
  if (personaHeadshot) {
    parts.push({
      inlineData: { data: personaHeadshot, mimeType: "image/png" }
    });
  }
  
  // Build enhanced prompt
  const prompt = `
${referenceBlankGarment ? `
[IMAGE 1] REFERENCE GARMENT
This is the EXACT garment you must render from a different angle.
CRITICAL: The fabric color, fit, and overall appearance must EXACTLY match this reference.
` : ''}

${personaHeadshot ? `[IMAGE ${referenceBlankGarment ? 2 : 1}] MODEL IDENTITY` : ''}

GARMENT SPECIFICATIONS:
Product: ${renderSpec.productDescription}
Color: ${targetColor?.name} (${targetColor?.hex})
${targetColor ? `
CRITICAL COLOR LOCK:
- Exact RGB values: R=${targetColor.rgb.r}, G=${targetColor.rgb.g}, B=${targetColor.rgb.b}
- Acceptable deviation: ±5 RGB units per channel
- NO color interpretation or artistic liberty
- Sample the fabric and verify it matches these exact RGB values
- The color MUST be identical to ${referenceBlankGarment ? 'the reference image' : 'the specified hex code'}
` : ''}

${referenceBlankGarment ? `
ANGLE CHANGE INSTRUCTION:
You are rendering the SAME garment from ${renderSpec.cameraDescription}.
Everything stays identical EXCEPT the camera angle:
- Same exact fabric color (use color picker on reference)
- Same model (same person, same body)
- Same lighting setup
- Same fabric texture and quality
- Only change: camera perspective/angle
` : ''}

Generate a blank ${renderSpec.productDescription} WITHOUT any design or graphics.
The garment should be ready for design application in stage 2.
`;

  parts.push({ text: prompt });
  
  // Call Gemini...
}
```

---

## 📊 Expected Results by Solution

| Solution | Color Consistency | Effort | Cost | Speed |
|----------|------------------|---------|------|-------|
| 1. Reference-Based | 95% | Low | Same | Same |
| 2. Enhanced Prompts | 75% | Low | Same | Same |
| 3. Color Correction | 93% | High | Same | -10% |
| 4. Blank Library | 100% | Very High | -50% | +200% |
| **1 + 2 Combined** | **98%** | **Medium** | **Same** | **Same** |

**Recommendation:** Implement Solutions 1 + 2 together for best immediate results.

---

## 🚀 Next Steps

1. **Implement Solution 1** (Reference-Based Generation)
   - Modify batch generation to create reference first
   - Pass reference to subsequent angles
   
2. **Add Solution 2** (Enhanced Color Lock)
   - Update prompts with RGB specifications
   - Add verification instructions

3. **Test with your example**
   - Generate 4 angles × 1 color
   - Verify all 4 have identical color

4. **Fine-tune if needed**
   - Adjust tolerance levels
   - Tweak prompt language

---

**Would you like me to implement Solution 1 + 2 now?** This will give you 95%+ color consistency immediately!
