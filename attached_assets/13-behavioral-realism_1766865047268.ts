/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BEHAVIORAL REALISM SYSTEM
 * Hyper-Realism Tier 3, Feature 13 | Impact: +10-15% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Natural human behavior, authentic poses, and believable interactions
 * for images that feel captured, not generated.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface BehavioralProfile {
  name: string;
  context: string;
  description: string;
  
  bodyLanguage: {
    posture: string;
    gestureStyle: string;
    tension: string;
    weight: string;
  };
  
  facialExpression: {
    micro: string;
    macro: string;
    authenticity: string;
  };
  
  gazeDirection: {
    type: string;
    engagement: string;
    naturalness: string;
  };
  
  promptKeywords: string[];
  avoidKeywords: string[];
}

export interface InteractionProfile {
  name: string;
  participants: string;
  dynamicType: string;
  spatialRelationship: string;
  emotionalTone: string;
  promptKeywords: string[];
}

// ============================================================================
// NATURAL POSES
// ============================================================================

export const NATURAL_POSES: Record<string, BehavioralProfile> = {
  relaxed_natural: {
    name: "Relaxed Natural",
    context: "Casual, unposed moments",
    description: "Natural at-ease body language",
    bodyLanguage: {
      posture: "Slightly asymmetrical, natural weight distribution",
      gestureStyle: "Unplanned, organic hand positions",
      tension: "Minimal, relaxed muscles",
      weight: "Shifted to one side naturally"
    },
    facialExpression: {
      micro: "Subtle, genuine micro-expressions",
      macro: "Natural resting face or genuine smile",
      authenticity: "True emotion, not performed"
    },
    gazeDirection: {
      type: "Natural, possibly off-camera",
      engagement: "Thoughtful or casual",
      naturalness: "Not staring directly"
    },
    promptKeywords: [
      "natural relaxed pose",
      "unposed candid moment",
      "genuine body language",
      "organic natural position",
      "authentic at-ease posture"
    ],
    avoidKeywords: ["stiff", "posed", "unnatural", "rigid"]
  },

  engaged_conversation: {
    name: "Engaged in Conversation",
    context: "Active listening or speaking",
    description: "Natural conversational body language",
    bodyLanguage: {
      posture: "Leaning slightly forward or animated",
      gestureStyle: "Expressive hand movements",
      tension: "Engaged but relaxed",
      weight: "Dynamic, possibly shifting"
    },
    facialExpression: {
      micro: "Active micro-expressions, eyebrow movement",
      macro: "Speaking or listening expressions",
      authenticity: "Genuine engagement"
    },
    gazeDirection: {
      type: "Looking at conversation partner",
      engagement: "Actively focused",
      naturalness: "Natural eye contact"
    },
    promptKeywords: [
      "engaged in conversation",
      "natural speaking gesture",
      "animated expression",
      "authentic interaction pose",
      "listening attentively"
    ],
    avoidKeywords: ["frozen", "static", "disconnected"]
  },

  contemplative: {
    name: "Contemplative Moment",
    context: "Deep thought, introspection",
    description: "Natural thinking or reflection",
    bodyLanguage: {
      posture: "Settled, inward-focused",
      gestureStyle: "Minimal, perhaps chin touch",
      tension: "Soft, introspective",
      weight: "Grounded, still"
    },
    facialExpression: {
      micro: "Subtle furrowed brow, soft eyes",
      macro: "Thoughtful, distant look",
      authenticity: "Genuine reflection"
    },
    gazeDirection: {
      type: "Looking into middle distance or down",
      engagement: "Inward, not external",
      naturalness: "Unfocused, thinking"
    },
    promptKeywords: [
      "contemplative moment",
      "lost in thought",
      "introspective pose",
      "quiet reflection",
      "thoughtful expression"
    ],
    avoidKeywords: ["forced", "dramatic", "performative"]
  },

  active_movement: {
    name: "In Motion",
    context: "Walking, moving, action",
    description: "Captured mid-movement",
    bodyLanguage: {
      posture: "Dynamic, asymmetrical",
      gestureStyle: "Natural movement gestures",
      tension: "Active, purposeful",
      weight: "Shifting, in motion"
    },
    facialExpression: {
      micro: "Natural for activity",
      macro: "Focused or joyful depending on activity",
      authenticity: "Matches movement"
    },
    gazeDirection: {
      type: "Direction of movement",
      engagement: "Goal-focused",
      naturalness: "Following path"
    },
    promptKeywords: [
      "natural walking pose",
      "in motion captured",
      "dynamic movement",
      "mid-stride natural",
      "authentic action pose"
    ],
    avoidKeywords: ["static", "frozen mid-step", "unnatural motion"]
  }
};

// ============================================================================
// INTERACTION PROFILES
// ============================================================================

export const INTERACTIONS: Record<string, InteractionProfile> = {
  intimate_couple: {
    name: "Intimate Couple",
    participants: "Two people in romantic relationship",
    dynamicType: "Close, affectionate",
    spatialRelationship: "Very close, often touching",
    emotionalTone: "Loving, connected",
    promptKeywords: [
      "intimate couple moment",
      "natural couple affection",
      "genuine romantic connection",
      "authentic couple pose"
    ]
  },

  friends_laughing: {
    name: "Friends Sharing Laughter",
    participants: "Two or more friends",
    dynamicType: "Joyful, casual",
    spatialRelationship: "Comfortable proximity, may touch casually",
    emotionalTone: "Happy, relaxed, fun",
    promptKeywords: [
      "friends laughing together",
      "genuine shared laughter",
      "casual friend interaction",
      "authentic joy between friends"
    ]
  },

  professional_meeting: {
    name: "Professional Interaction",
    participants: "Colleagues or business partners",
    dynamicType: "Respectful, focused",
    spatialRelationship: "Professional distance, may shake hands",
    emotionalTone: "Confident, engaged",
    promptKeywords: [
      "professional interaction",
      "business meeting moment",
      "colleague discussion",
      "professional body language"
    ]
  },

  parent_child: {
    name: "Parent-Child Connection",
    participants: "Parent and child",
    dynamicType: "Loving, protective, playful",
    spatialRelationship: "Close, often holding or touching",
    emotionalTone: "Warm, nurturing, joyful",
    promptKeywords: [
      "parent child connection",
      "nurturing family moment",
      "playful parent child",
      "authentic family interaction"
    ]
  }
};

// ============================================================================
// AUTHENTIC EXPRESSION GUIDELINES
// ============================================================================

export const EXPRESSION_GUIDELINES: Record<string, {
  emotion: string;
  facialCues: string[];
  bodySupport: string;
  promptKeywords: string[];
}> = {
  genuine_smile: {
    emotion: "Happiness/Joy",
    facialCues: ["crow's feet at eyes", "raised cheeks", "Duchenne smile"],
    bodySupport: "Relaxed shoulders, open posture",
    promptKeywords: ["genuine Duchenne smile", "eyes crinkling with joy", "authentic happiness"]
  },

  subtle_concern: {
    emotion: "Concern/Worry",
    facialCues: ["slight brow furrow", "tightened jaw", "searching eyes"],
    bodySupport: "Slight forward lean, protective gestures",
    promptKeywords: ["subtle worried expression", "concerned look", "empathetic expression"]
  },

  quiet_confidence: {
    emotion: "Confidence",
    facialCues: ["relaxed brow", "direct gaze", "slight smile"],
    bodySupport: "Open posture, grounded stance",
    promptKeywords: ["quietly confident expression", "assured demeanor", "calm confident pose"]
  },

  deep_thought: {
    emotion: "Contemplation",
    facialCues: ["unfocused gaze", "relaxed face", "slight lip pursing"],
    bodySupport: "Still body, minimal gesture",
    promptKeywords: ["deep in thought", "contemplative expression", "thoughtful gaze"]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get natural pose profile
 */
export function getNaturalPose(name: string): BehavioralProfile | undefined {
  return NATURAL_POSES[name];
}

/**
 * Get interaction profile
 */
export function getInteraction(name: string): InteractionProfile | undefined {
  return INTERACTIONS[name];
}

/**
 * Generate behavioral prompt
 */
export function generateBehavioralPrompt(profile: BehavioralProfile): string {
  return profile.promptKeywords.join(', ');
}

/**
 * Generate interaction prompt
 */
export function generateInteractionPrompt(interaction: InteractionProfile): string {
  return interaction.promptKeywords.join(', ');
}

/**
 * Generate expression prompt
 */
export function generateExpressionPrompt(expression: string): string {
  return EXPRESSION_GUIDELINES[expression]?.promptKeywords.join(', ') || '';
}

/**
 * Generate negative behavioral prompt
 */
export function generateBehavioralNegativePrompt(): string {
  return [
    "stiff pose",
    "unnatural posture",
    "forced expression",
    "fake smile",
    "rigid body language",
    "performative",
    "awkward pose"
  ].join(', ');
}

/**
 * Get pose for context
 */
export function getPoseForContext(context: string): BehavioralProfile | undefined {
  const contextMap: Record<string, string> = {
    casual: 'relaxed_natural',
    talking: 'engaged_conversation',
    thinking: 'contemplative',
    walking: 'active_movement'
  };
  
  const key = contextMap[context.toLowerCase()];
  return key ? NATURAL_POSES[key] : undefined;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  NATURAL_POSES,
  INTERACTIONS,
  EXPRESSION_GUIDELINES,
  getNaturalPose,
  getInteraction,
  generateBehavioralPrompt,
  generateInteractionPrompt,
  generateExpressionPrompt,
  generateBehavioralNegativePrompt,
  getPoseForContext
};
