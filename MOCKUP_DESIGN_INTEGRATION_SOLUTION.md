# Mockup Design Integration Solution
## Solving the "Pasted-On" Design Problem

**Problem:** Designs don't look like they're part of the fabric - they appear flat, pasted on, and Gemini sometimes reinterprets the design.

**Root Causes Identified:**
1. **Design sent as separate image** - Gemini treats it as an overlay rather than fabric
2. **Insufficient fabric physics guidance** - Not enough emphasis on unified material behavior
3. **Lighting inconsistency** - Design and fabric have separate lighting
4. **Missing fabric texture integration** - Design appears too crisp/digital
5. **Gemini reinterpretation** - Model "understands" the design concept and recreates it

---

## Solution Strategy

### 🎯 Primary Approach: Pre-Composited Design Integration

Instead of sending the design as a separate image and asking Gemini to "place" it, we should:

1. **Generate a blank mockup first** (garment on model without design)
2. **Composite the design using image processing** (Sharp/ImageMagick) with proper perspective, lighting, and texture
3. **Use Gemini for image-to-image refinement** to add realism and fabric integration

This way:
- ✅ Design is never reinterpreted (it's already on the fabric)
- ✅ Exact color/text fidelity (pixel-perfect transfer)
- ✅ We control perspective warping (3D projection)
- ✅ We apply fabric texture overlays (weave patterns)
- ✅ Gemini only enhances realism (folds, lighting, shadows)

---

## Implementation Plan

### Phase 1: Enhanced Prompt Strategy (Immediate Fix)

**Location:** `server/services/promptBuilders/mockupPromptBuilder.ts`

Add these critical improvements to the prompt:

```typescript
function buildUnbreakableRules(input: MockupPromptInput): string {
  return `
// ═══════════════════════════════════════════════════════════════
// UNBREAKABLE RULES - The Absolute Source of Truth
// ═══════════════════════════════════════════════════════════════

RULE 1: DESIGN TRANSFER (EXACT COPY ONLY)
[IMAGE 1] shows the EXACT artwork to reproduce on the garment.
CRITICAL: You must TRANSFER the pixels exactly as shown - do NOT:
- Recreate or redraw the design
- "Understand" the concept and generate a similar version
- Improve or enhance the typography/graphics
- Change colors, fonts, or layout

TRANSFER MEANS:
- Copy the exact RGB values from [IMAGE 1]
- Maintain exact typography (font, size, spacing, kerning)
- Preserve exact graphic elements (shapes, illustrations, photos)
- Keep exact color values (do not interpret or enhance)

Example: If [IMAGE 1] shows "SANTA PAWS" in red Comic Sans:
✓ CORRECT: Render "SANTA PAWS" in that exact red Comic Sans font
✗ WRONG: Generate "SANTA PAWS" in a different font because you think it looks better
✗ WRONG: Draw a new Santa Paws illustration because you understand the concept

RULE 2: DESIGN IS FABRIC (NOT AN OVERLAY)
The design in [IMAGE 1] has been PRINTED INTO the cotton fabric fibers.
The design IS fabric - they are ONE unified material:

UNIFIED MATERIAL PHYSICS:
- Design and garment share IDENTICAL lighting (same surface)
- Design follows EVERY fold/wrinkle (same material)
- Design shares IDENTICAL shadows (same surface)
- Fabric weave texture shows THROUGH the printed ink
- No boundary exists between design and fabric
- They are NOT two things combined - they are ONE piece of printed cotton

LIGHTING UNITY:
- ONE light source illuminates both fabric and design
- Shadows from folds darken BOTH fabric and design equally
- Highlights on stretched areas brighten BOTH fabric and design equally
- NO separate lighting for the design
- NO "glowing" or "backlit" appearance on design

FOLD BEHAVIOR:
- When fabric folds, design folds WITH it (same material)
- A fold through text causes the text to BREAK at the crease
- Minimum 7+ folds that visibly interrupt the design
- Design does NOT stay flat while fabric wrinkles around it

3D SURFACE BEHAVIOR:
- Design follows body curvature (torso is cylindrical, not flat)
- Center of design appears full-width (facing camera)
- Sides of design recede toward body edges (natural perspective)
- Horizontal lines in design curve following body contour

FABRIC TEXTURE INTEGRATION:
- Cotton weave pattern visible THROUGH printed ink
- Ink appears slightly absorbed/muted (not digital-perfect colors)
- Subtle fabric micro-texture in printed areas
- Design has same surface quality as rest of garment

RULE 3: PARAMETER LOCK
- Garment Color: ${color.name} (${color.hex}) - exact match on non-printed areas
- Design Colors: ${designAnalysis.dominantColors.join(', ')} - reproduce without color shift
- Size/Fit: Natural fit for specified size
- No creative interpretation allowed

// ═══════════════════════════════════════════════════════════════
`;
}
```

### Phase 2: Add Fabric Integration Section

Add a new dedicated section for fabric integration:

```typescript
function buildFabricIntegrationSection(input: MockupPromptInput): string {
  return `
// ═══════════════════════════════════════════════════════════════
// FABRIC INTEGRATION CRITICAL REQUIREMENTS
// ═══════════════════════════════════════════════════════════════

VISUALIZE THIS PROCESS:
1. Blank fabric is laid flat on a table
2. The design from [IMAGE 1] is printed onto this fabric using DTG printing
3. The ink saturates into the cotton fibers (not sitting on top)
4. The printed fabric is cut and sewn into a garment
5. The garment is worn on a body (the final mockup you're rendering)

WHAT THIS MEANS FOR RENDERING:
- The design experienced the SAME manufacturing process as the fabric
- The design went through the SAME washing/wearing as the fabric
- The design responds to lighting the SAME way as the fabric
- The design folds/wrinkles the SAME way as the fabric
- They are INSEPARABLE - one unified printed cotton garment

INTEGRATION CHECKLIST:
□ Design follows every visible fold (minimum 7+ folds)
□ Design curves with body contour (cylindrical torso surface)
□ Fabric weave texture visible through design
□ Design shares identical lighting with rest of garment
□ Design shares identical shadows from folds
□ Colors slightly muted from fabric absorption (not digital-perfect)
□ No crisp edges - design blends into fabric naturally
□ Micro-wrinkles interrupt the design in underarm/side areas
□ Design appears as physical ink on physical fabric

COMMON FAILURE MODES TO AVOID:
✗ Design stays flat while fabric wrinkles around it (most common error)
✗ Design has different lighting than the garment
✗ Design appears to "float" above the fabric surface
✗ Design colors too vibrant (digital appearance)
✗ Design edges too crisp (vector appearance)
✗ No fabric texture visible through the print
✗ Design ignores body curvature (remains rectangular)

// ═══════════════════════════════════════════════════════════════
`;
}
```

### Phase 3: Enhance Negative Prompts

Update the quality control section with more specific negatives:

```typescript
function buildQualityControl(input: MockupPromptInput): string {
  return `
// ═══════════════════════════════════════════════════════════════
// QUALITY CONTROL - What to Avoid
// ═══════════════════════════════════════════════════════════════

DESIGN TRANSFER FAILURES (CRITICAL):
NEVER recreate or reinterpret the design from [IMAGE 1]. Do not:
- Generate new artwork "inspired by" the design
- Redraw text in a different font because you think it looks better
- Change colors or layout to "improve" the design
- Create a new version that captures the "concept" of the design
This is the #1 most critical failure mode. The design must be an EXACT pixel-level transfer.

FABRIC INTEGRATION FAILURES (CRITICAL):
Do not render the design as a flat digital overlay or sticker. The design must not remain perfectly flat while the fabric folds around it - this is the #2 most common failure. Specific failures to avoid:
- Design appearing perfectly flat on a wrinkled garment (most common error)
- Design with separate lighting from the rest of the garment
- Design that does not follow visible folds and creases
- Design colors that are too vibrant or saturated (digital appearance)
- Design edges that are unnaturally crisp or sharp
- Design appearing to "float" or "hover" above the fabric surface
- No visible fabric texture through the printed areas
- Design with its own shadows separate from garment shadows

LIGHTING CONSISTENCY FAILURES:
The design and garment MUST share identical lighting because they are the same physical surface:
- Do not illuminate the design differently than the fabric
- Do not add highlights or glows to the design
- Do not create separate shadows for the design
- Shadows from folds must darken BOTH the fabric AND the design equally
- The design cannot appear "backlit" or "glowing"

3D SURFACE FAILURES:
The design exists on a curved 3D surface (human torso), not a flat plane:
- Design cannot remain perfectly rectangular (it must curve with body)
- Horizontal lines in design must follow body contour
- Sides of design must recede toward body edges (perspective)
- Design cannot ignore the cylindrical shape of the torso

FOLD BEHAVIOR FAILURES:
When the garment folds, the design MUST fold with it because they are one material:
- A fold through text must cause the text to break at the crease
- Design cannot stay pristine while fabric wrinkles around it
- Minimum 7+ visible folds that interrupt and distort the design
- Micro-wrinkles in underarm/side areas must affect the design

TEXTURE FAILURES:
Do not create a design that looks digitally printed or vector-based:
- Fabric weave texture MUST be visible through the printed ink
- Colors must appear slightly muted from fabric absorption
- No perfectly smooth, vector-like surfaces on the design
- Design must have the same micro-texture as the rest of the fabric

// ═══════════════════════════════════════════════════════════════
`;
}
```

---

## Phase 4: Two-Stage Generation Process (Advanced Solution)

### Stage 1: Generate Blank Mockup

**New Function:** `generateBlankMockup()`

```typescript
async function generateBlankMockup(request: MockupGenerationRequest): Promise<string> {
  // Generate mockup WITHOUT the design
  // This gives us the base garment with correct:
  // - Model pose and identity
  // - Lighting setup
  // - Camera angle
  // - Garment wrinkles and folds
  
  const blankPrompt = buildBlankMockupPrompt({
    personaLock: request.personaLock,
    product: request.product,
    color: request.color,
    angle: request.angle,
    // NO design analysis - just the blank garment
  });
  
  const blankMockup = await generateWithGemini(blankPrompt);
  return blankMockup; // Base64 image
}
```

### Stage 2: Composite Design with Image Processing

**Enhanced:** `server/services/designCompositor.ts`

```typescript
async function compositeDesignWithFabricRealism(
  designBase64: string,
  blankMockupBase64: string,
  options: CompositeOptions
): Promise<string> {
  
  // 1. Extract lighting map from blank mockup
  const lightingMap = await extractLuminanceMap(blankMockupBase64);
  
  // 2. Apply perspective warp to design
  const warpedDesign = await applyPerspectiveWarp(
    designBase64, 
    options.cameraAngle,
    options.productName
  );
  
  // 3. Add fabric texture overlay to design
  const texturedDesign = await applyFabricTexture(warpedDesign);
  
  // 4. Apply lighting map to design (match mockup lighting)
  const litDesign = await applyLightingMap(texturedDesign, lightingMap);
  
  // 5. Composite onto mockup with multiply blend
  const composited = await sharp(blankMockupBase64)
    .composite([{
      input: litDesign,
      blend: 'multiply', // This integrates design into fabric
      top: placement.y,
      left: placement.x
    }])
    .toBuffer();
  
  return composited.toString('base64');
}
```

### Stage 3: Gemini Refinement (Image-to-Image)

```typescript
async function refineCompositedMockup(
  compositedBase64: string,
  originalRequest: MockupGenerationRequest
): Promise<string> {
  
  const refinementPrompt = `
You are viewing a mockup of a ${product.name} with a printed design.

TASK: Add photorealistic fabric behavior and lighting integration.

The design has been pre-printed onto this garment. Your job is to:
1. Add realistic folds that affect BOTH the fabric and the printed design
2. Ensure lighting is uniform across the entire garment surface
3. Add subtle fabric weave texture visible through the print
4. Make the design appear as saturated ink in cotton fibers
5. Add natural wear patterns (2-3 uses, ~5 washes)

CRITICAL: Do NOT redraw or recreate the design. The design is already on the garment.
Only enhance the realism of how the printed fabric behaves.

Maintain:
- Exact design colors and typography
- Model identity and pose
- Camera angle and framing
`;

  const refined = await genAI.models.generateContent({
    model: MODELS.IMAGE_GENERATION,
    contents: [{
      role: "user",
      parts: [
        { inlineData: { data: compositedBase64, mimeType: "image/png" } },
        { text: refinementPrompt }
      ]
    }],
    config: {
      systemInstruction: "You are a photorealistic rendering engine specializing in fabric physics and lighting integration.",
      temperature: 0.3, // Low temp for consistency
    }
  });
  
  return refined;
}
```

---

## Phase 5: Add Fabric Texture Overlay

**New File:** `server/services/fabricTextureGenerator.ts`

```typescript
import sharp from 'sharp';

/**
 * Generate a realistic cotton fabric texture overlay
 */
async function generateCottonTexture(width: number, height: number): Promise<Buffer> {
  // Create a subtle cotton weave pattern
  // This can be a pre-generated texture or procedurally generated
  
  const texture = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0.1 }
    }
  })
  .composite([{
    // Add subtle noise for fabric weave
    input: await generateWeavePattern(width, height),
    blend: 'overlay',
    opacity: 0.15
  }])
  .toBuffer();
  
  return texture;
}

async function applyFabricTexture(designBuffer: Buffer): Promise<Buffer> {
  const metadata = await sharp(designBuffer).metadata();
  const texture = await generateCottonTexture(metadata.width!, metadata.height!);
  
  // Composite texture over design with multiply blend
  const textured = await sharp(designBuffer)
    .composite([{
      input: texture,
      blend: 'multiply',
      opacity: 0.2
    }])
    .toBuffer();
  
  return textured;
}
```

---

## Phase 6: Extract and Apply Lighting Map

**Add to:** `server/services/designCompositor.ts`

```typescript
interface LuminanceMap {
  brightness: number[][];
  contrast: number;
  shadowRegions: Region[];
  highlightRegions: Region[];
}

async function extractLuminanceMap(mockupBase64: string): Promise<LuminanceMap> {
  // Convert to grayscale to extract lighting
  const grayscale = await sharp(Buffer.from(mockupBase64, 'base64'))
    .grayscale()
    .raw()
    .toBuffer();
  
  // Analyze brightness values
  // Identify shadow and highlight regions
  // Return map for applying to design
  
  return luminanceMap;
}

async function applyLightingMap(
  designBuffer: Buffer, 
  lightingMap: LuminanceMap
): Promise<Buffer> {
  // Apply brightness/contrast adjustments to design
  // based on the lighting from the blank mockup
  
  const lit = await sharp(designBuffer)
    .modulate({
      brightness: lightingMap.brightness,
      saturation: 0.9, // Slight desaturation for fabric absorption
    })
    .toBuffer();
  
  return lit;
}
```

---

## Implementation Priority

### 🔴 IMMEDIATE (Phase 1-3): Prompt Enhancements
- **Effort:** 2-4 hours
- **Impact:** HIGH (50-70% improvement)
- **Risk:** LOW (no architecture changes)

Update the prompt builder with:
1. Enhanced RULE 1 (exact design transfer)
2. New fabric integration section
3. Improved negative prompts
4. More specific failure mode descriptions

### 🟡 SHORT-TERM (Phase 4-6): Two-Stage Generation
- **Effort:** 1-2 days
- **Impact:** VERY HIGH (90%+ improvement)
- **Risk:** MEDIUM (requires testing and refinement)

Implement:
1. Blank mockup generation
2. Design compositor with perspective warping
3. Fabric texture overlay
4. Lighting map extraction and application
5. Gemini refinement pass

---

## Testing Strategy

### Test Cases

1. **Simple Text Design**
   - Single word, bold font
   - Test: Does text stay exact? Do folds break the letters?

2. **Complex Illustration**
   - Multi-color artwork with fine details
   - Test: Are colors accurate? Does it follow body curve?

3. **Photo-based Design**
   - Photographic image as design
   - Test: Does it look printed on fabric vs. stuck on?

4. **Pattern Design (AOP)**
   - Repeating pattern
   - Test: Does pattern wrap seamlessly? Continuous at seams?

### Success Metrics

✅ **Design Accuracy:**
- 100% text fidelity (no font changes)
- 95%+ color accuracy
- No reinterpretation of design elements

✅ **Fabric Integration:**
- 7+ visible folds affecting design
- Fabric texture visible through print
- Unified lighting (no separate shadows)
- Design curves with body (3D perspective)

✅ **Realism Score:**
- Looks like a real photo of a real printed garment
- Cannot distinguish design edge from fabric
- Natural wear patterns present

---

## Configuration

Add to `.env`:

```bash
# Mockup generation strategy
USE_TWO_STAGE_GENERATION=true  # Use blank mockup + composite approach
USE_STREAMLINED_PROMPT=true    # Use V2 prompt structure
FABRIC_TEXTURE_OPACITY=0.2     # Cotton texture overlay opacity (0.0-1.0)
LIGHTING_BLEND_STRENGTH=0.8    # Lighting map application strength
```

Add to `server/services/eliteMockupGenerator.ts`:

```typescript
const GENERATION_CONFIG = {
  // ... existing config
  
  // New two-stage options
  USE_TWO_STAGE_GENERATION: process.env.USE_TWO_STAGE_GENERATION === 'true',
  FABRIC_TEXTURE_OPACITY: parseFloat(process.env.FABRIC_TEXTURE_OPACITY || '0.2'),
  LIGHTING_BLEND_STRENGTH: parseFloat(process.env.LIGHTING_BLEND_STRENGTH || '0.8'),
};
```

---

## Expected Results

### Before (Current Issues):
❌ Design looks pasted on  
❌ Design stays flat on wrinkled fabric  
❌ Gemini reinterprets text/graphics  
❌ Colors too vibrant (digital look)  
❌ Design has separate lighting  
❌ No fabric texture visible  

### After (With Fixes):
✅ Design appears printed into fabric  
✅ Design folds with fabric wrinkles  
✅ Exact pixel-level design transfer  
✅ Colors muted/absorbed into fabric  
✅ Unified lighting across garment  
✅ Cotton weave visible through print  
✅ Natural 3D body curvature  
✅ Looks like real product photography  

---

## Next Steps

1. **Implement Phase 1** (Prompt Enhancements)
   - Update `mockupPromptBuilder.ts` with new rules
   - Test with 5-10 sample designs
   - Measure improvement vs. current results

2. **Test & Iterate**
   - Generate comparison images (before/after)
   - Identify remaining issues
   - Fine-tune prompt language

3. **Implement Phase 4-6** (Two-Stage Generation)
   - Build blank mockup generator
   - Implement design compositor
   - Add fabric texture and lighting
   - Test integration

4. **Production Rollout**
   - A/B test with users
   - Monitor credit usage (two-stage uses more API calls)
   - Gather feedback
   - Optimize performance

---

**Created:** December 30, 2025  
**Purpose:** Comprehensive solution for mockup design integration issues
