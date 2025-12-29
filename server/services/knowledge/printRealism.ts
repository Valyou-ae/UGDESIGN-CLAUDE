export const PRINT_REALISM_FULL = `
═══════════════════════════════════════════════════════════════════════════════
                    ⚠️ CRITICAL: PRINT REALISM REQUIREMENTS ⚠️
═══════════════════════════════════════════════════════════════════════════════

The design/artwork MUST appear as a REAL PHYSICAL PRINT on the fabric:

【FABRIC INTEGRATION】
• The design is PRINTED INTO the fabric fibers using screen-print/DTG printing
• Subtle fabric weave texture is visible THROUGH the printed ink areas
• The ink is ABSORBED into the material, NOT sitting on top like a sticker
• Print has the characteristics of real ink on real textile

【FABRIC PHYSICS - DESIGN FOLLOWS THE FABRIC】
• Design follows EVERY fold, wrinkle, and crease in the garment
• Design stretches and compresses over body contours (chest, shoulders, stomach)
• Where fabric bunches up, the design bunches up identically
• Where fabric pulls tight, the design stretches with it
• The design is NOT flat - it exists in 3D space on the garment
• Design warps naturally with the cylindrical shape of the torso

【LIGHTING MUST BE CONSISTENT】  
• The SAME light source illuminates both the garment AND the printed design
• Shadows from folds fall ACROSS the design, darkening those areas
• Highlights on raised/stretched fabric areas also brighten the design
• The print does NOT have its own separate lighting
• No "glowing" or "backlit" appearance on the design

【COLOR ACCURACY FOR REAL PRINTS】
• Print colors appear as REAL INK on fabric (slightly less saturated than digital file)
• Colors are subtly muted compared to the original digital artwork
• On white fabric: colors appear close to original but with fabric texture
• On dark fabric: colors may appear slightly different as ink interacts with base
• No "neon" or "glowing" colors unless it's actual reflective ink

【3D PERSPECTIVE】
• Design follows the 3D curvature of the human torso
• Slight perspective distortion toward edges (design wraps around body)
• Design is NOT perfectly rectangular - it curves with the body shape
• Top of design may appear slightly smaller than bottom due to chest curve

【WHAT TO AVOID】
✗ Design appearing perfectly flat like a digital overlay
✗ Design edges that are too sharp/digital looking
✗ Design that ignores wrinkles and folds in the fabric
✗ Design with different lighting than the rest of the image
✗ Colors that are too vibrant/saturated for real printing
✗ Design that looks like a sticker or iron-on transfer
✗ Any "floating" or "hovering" appearance

【WHAT TO ACHIEVE】
✓ Design looks like it was professionally printed at a print shop
✓ You cannot tell where fabric ends and print begins
✓ Design and garment share identical lighting and shadows
✓ Fabric texture subtly shows through printed areas
✓ Natural imperfections consistent with real screen printing
✓ Looks like a real photo of a real printed shirt

═══════════════════════════════════════════════════════════════════════════════
`;

export const PRINT_REALISM_REINFORCEMENTS = {
  flatDesign: `The design must show the natural undulation of the fabric surface - it cannot appear flat or 2D. Every micro-wrinkle affects the design.`,
  
  brightColors: `The print colors should appear as they would from a real DTG printer - slightly muted by the fabric absorption, not digital-perfect colors.`,
  
  missingTexture: `The cotton weave pattern of the shirt must be subtly visible through the printed ink, especially in lighter colored areas of the design.`,
  
  lightingMismatch: `The printed design receives light from the exact same source as the rest of the garment - there should be zero lighting difference between printed and non-printed areas of the fabric.`
};

export const PRINT_REALISM_NEGATIVE_PROMPTS = [
  "design appearing perfectly flat",
  "digital overlay",
  "design edges too sharp",
  "design ignoring wrinkles",
  "design ignoring folds",
  "design with different lighting",
  "colors too vibrant",
  "colors too saturated",
  "sticker appearance",
  "iron-on transfer look",
  "floating design",
  "hovering design",
  "pasted on design",
  "glowing design",
  "backlit design",
  "neon colors on print",
  "design not following body contours",
  "flat 2D design on 3D surface"
];

export function getPrintRealismBlock(): string {
  return PRINT_REALISM_FULL;
}

export function getPrintRealismNegatives(): string[] {
  return PRINT_REALISM_NEGATIVE_PROMPTS;
}

export function getPrintRealismReinforcement(issue: 'flatDesign' | 'brightColors' | 'missingTexture' | 'lightingMismatch'): string {
  return PRINT_REALISM_REINFORCEMENTS[issue];
}
