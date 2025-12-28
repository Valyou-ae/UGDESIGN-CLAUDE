import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "fs/promises";
import * as path from "path";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface PersonaInfo {
  id: string;
  name: string;
  age: string;
  sex: string;
  ethnicity: string;
  fullDescription: string;
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  skinTone: string;
  facialFeatures: string;
  headshotUrl: string;
}

const BABY_PERSONAS: PersonaInfo[] = [
  { id: 'baby-male-white-xs-01', name: 'Oliver', age: '8 months', sex: 'Male', ethnicity: 'White', facialFeatures: 'round cheeks, button nose', hairStyle: 'fine wispy hair', hairColor: 'light brown', eyeColor: 'blue', skinTone: 'fair pink', fullDescription: 'Adorable 8-month-old baby boy with round cheeks and a button nose.', headshotUrl: 'attached_assets/personas/baby-male-white-xs-01_oliver_headshot.png' },
  { id: 'baby-male-black-xs-01', name: 'Jayden', age: '10 months', sex: 'Male', ethnicity: 'Black', facialFeatures: 'wide eyes, happy expression', hairStyle: 'soft curly', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'rich brown', fullDescription: 'Happy 10-month-old baby boy with wide curious eyes.', headshotUrl: 'attached_assets/personas/baby-male-black-xs-01_jayden_headshot.png' },
  { id: 'baby-male-hispanic-xs-01', name: 'Mateo', age: '9 months', sex: 'Male', ethnicity: 'Hispanic', facialFeatures: 'dimpled cheeks, curious look', hairStyle: 'thick dark hair', hairColor: 'black', eyeColor: 'brown', skinTone: 'warm tan', fullDescription: 'Curious 9-month-old baby boy with adorable dimpled cheeks.', headshotUrl: 'attached_assets/personas/baby-male-hispanic-xs-01_mateo_headshot.png' },
  { id: 'baby-male-asian-xs-01', name: 'Leo', age: '7 months', sex: 'Male', ethnicity: 'Asian', facialFeatures: 'round face, calm expression', hairStyle: 'straight fine hair', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'light', fullDescription: 'Peaceful 7-month-old baby boy with a round face.', headshotUrl: 'attached_assets/personas/baby-male-asian-xs-01_leo_headshot.png' },
  { id: 'baby-male-indian-xs-01', name: 'Arjun', age: '11 months', sex: 'Male', ethnicity: 'Indian', facialFeatures: 'bright eyes, playful smile', hairStyle: 'thick wavy', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'medium brown', fullDescription: 'Playful 11-month-old baby boy with bright eyes.', headshotUrl: 'attached_assets/personas/baby-male-indian-xs-01_arjun_headshot.png' },
  { id: 'baby-male-southeast-asian-xs-01', name: 'Kai', age: '8 months', sex: 'Male', ethnicity: 'Southeast Asian', facialFeatures: 'chubby cheeks, alert eyes', hairStyle: 'fine straight', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'tan', fullDescription: 'Alert 8-month-old baby boy with chubby cheeks.', headshotUrl: 'attached_assets/personas/baby-male-southeast-asian-xs-01_kai_headshot.png' },
  { id: 'baby-male-middle-eastern-xs-01', name: 'Omar', age: '9 months', sex: 'Male', ethnicity: 'Middle Eastern', facialFeatures: 'expressive face, long lashes', hairStyle: 'thick dark', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'olive', fullDescription: 'Expressive 9-month-old baby boy with striking long lashes.', headshotUrl: 'attached_assets/personas/baby-male-middle-eastern-xs-01_omar_headshot.png' },
  { id: 'baby-male-indigenous-xs-01', name: 'River', age: '10 months', sex: 'Male', ethnicity: 'Indigenous', facialFeatures: 'round face, bright smile', hairStyle: 'thick straight', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'medium brown', fullDescription: 'Cheerful 10-month-old baby boy with a round face.', headshotUrl: 'attached_assets/personas/baby-male-indigenous-xs-01_river_headshot.png' },
  { id: 'baby-male-diverse-xs-01', name: 'Noah', age: '8 months', sex: 'Male', ethnicity: 'Diverse', facialFeatures: 'mixed features, happy expression', hairStyle: 'soft curls', hairColor: 'dark brown', eyeColor: 'hazel', skinTone: 'warm caramel', fullDescription: 'Happy 8-month-old baby boy with beautifully blended features.', headshotUrl: 'attached_assets/personas/baby-male-diverse-xs-01_noah_headshot.png' },
  { id: 'baby-female-white-xs-01', name: 'Emma', age: '9 months', sex: 'Female', ethnicity: 'White', facialFeatures: 'delicate features, sweet smile', hairStyle: 'fine wispy', hairColor: 'blonde', eyeColor: 'blue', skinTone: 'fair', fullDescription: 'Sweet 9-month-old baby girl with delicate features.', headshotUrl: 'attached_assets/personas/baby-female-white-xs-01_emma_headshot.png' },
  { id: 'baby-female-black-xs-01', name: 'Zoe', age: '10 months', sex: 'Female', ethnicity: 'Black', facialFeatures: 'bright eyes, joyful expression', hairStyle: 'natural curls', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'deep brown', fullDescription: 'Joyful 10-month-old baby girl with bright expressive eyes.', headshotUrl: 'attached_assets/personas/baby-female-black-xs-01_zoe_headshot.png' },
  { id: 'baby-female-hispanic-xs-01', name: 'Sofia', age: '8 months', sex: 'Female', ethnicity: 'Hispanic', facialFeatures: 'rosy cheeks, sweet expression', hairStyle: 'dark wavy', hairColor: 'dark brown', eyeColor: 'brown', skinTone: 'warm olive', fullDescription: 'Sweet 8-month-old baby girl with rosy cheeks.', headshotUrl: 'attached_assets/personas/baby-female-hispanic-xs-01_sofia_headshot.png' },
  { id: 'baby-female-asian-xs-01', name: 'Mei', age: '7 months', sex: 'Female', ethnicity: 'Asian', facialFeatures: 'round face, peaceful look', hairStyle: 'fine straight', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'light', fullDescription: 'Peaceful 7-month-old baby girl with a round face.', headshotUrl: 'attached_assets/personas/baby-female-asian-xs-01_mei_headshot.png' },
  { id: 'baby-female-indian-xs-01', name: 'Asha', age: '11 months', sex: 'Female', ethnicity: 'Indian', facialFeatures: 'big eyes, cheerful', hairStyle: 'thick dark', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'medium brown', fullDescription: 'Cheerful 11-month-old baby girl with big expressive eyes.', headshotUrl: 'attached_assets/personas/baby-female-indian-xs-01_asha_headshot.png' },
  { id: 'baby-female-southeast-asian-xs-01', name: 'Linh', age: '9 months', sex: 'Female', ethnicity: 'Southeast Asian', facialFeatures: 'sweet face, gentle smile', hairStyle: 'fine dark', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'light tan', fullDescription: 'Gentle 9-month-old baby girl with a sweet face.', headshotUrl: 'attached_assets/personas/baby-female-southeast-asian-xs-01_linh_headshot.png' },
  { id: 'baby-female-middle-eastern-xs-01', name: 'Layla', age: '10 months', sex: 'Female', ethnicity: 'Middle Eastern', facialFeatures: 'large eyes, long lashes', hairStyle: 'thick wavy', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'olive', fullDescription: 'Beautiful 10-month-old baby girl with large expressive eyes.', headshotUrl: 'attached_assets/personas/baby-female-middle-eastern-xs-01_layla_headshot.png' },
  { id: 'baby-female-indigenous-xs-01', name: 'Luna', age: '8 months', sex: 'Female', ethnicity: 'Indigenous', facialFeatures: 'round cheeks, bright eyes', hairStyle: 'thick straight', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'warm brown', fullDescription: 'Bright-eyed 8-month-old baby girl with round cheeks.', headshotUrl: 'attached_assets/personas/baby-female-indigenous-xs-01_luna_headshot.png' },
  { id: 'baby-female-diverse-xs-01', name: 'Mia', age: '9 months', sex: 'Female', ethnicity: 'Diverse', facialFeatures: 'mixed features, radiant smile', hairStyle: 'soft curls', hairColor: 'brown', eyeColor: 'green-brown', skinTone: 'golden', fullDescription: 'Radiant 9-month-old baby girl with beautifully blended features.', headshotUrl: 'attached_assets/personas/baby-female-diverse-xs-01_mia_headshot.png' }
];

const TODDLER_PERSONAS: PersonaInfo[] = [
  { id: 'toddler-male-white-xs-01', name: 'Liam', age: '2', sex: 'Male', ethnicity: 'White', facialFeatures: 'curious expression, rosy cheeks', hairStyle: 'tousled', hairColor: 'light brown', eyeColor: 'blue', skinTone: 'fair', fullDescription: 'Energetic 2-year-old boy with a curious expression.', headshotUrl: 'attached_assets/personas/toddler-male-white-xs-01_liam_headshot.png' },
  { id: 'toddler-male-black-xs-01', name: 'Miles', age: '3', sex: 'Male', ethnicity: 'Black', facialFeatures: 'bright smile, expressive eyes', hairStyle: 'short curly', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'rich brown', fullDescription: 'Cheerful 3-year-old boy with a bright smile.', headshotUrl: 'attached_assets/personas/toddler-male-black-xs-01_miles_headshot.png' },
  { id: 'toddler-male-hispanic-xs-01', name: 'Diego', age: '2', sex: 'Male', ethnicity: 'Hispanic', facialFeatures: 'playful expression, dimples', hairStyle: 'wavy', hairColor: 'dark brown', eyeColor: 'brown', skinTone: 'warm tan', fullDescription: 'Playful 2-year-old boy with cute dimples.', headshotUrl: 'attached_assets/personas/toddler-male-hispanic-xs-01_diego_headshot.png' },
  { id: 'toddler-male-asian-xs-01', name: 'Ethan', age: '3', sex: 'Male', ethnicity: 'Asian', facialFeatures: 'thoughtful look, round face', hairStyle: 'straight bowl cut', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'light', fullDescription: 'Thoughtful 3-year-old boy with a round face.', headshotUrl: 'attached_assets/personas/toddler-male-asian-xs-01_ethan_headshot.png' },
  { id: 'toddler-male-indian-xs-01', name: 'Dev', age: '2', sex: 'Male', ethnicity: 'Indian', facialFeatures: 'big eyes, sweet smile', hairStyle: 'thick wavy', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'medium brown', fullDescription: 'Sweet 2-year-old boy with big expressive eyes.', headshotUrl: 'attached_assets/personas/toddler-male-indian-xs-01_dev_headshot.png' },
  { id: 'toddler-male-southeast-asian-xs-01', name: 'Tan', age: '3', sex: 'Male', ethnicity: 'Southeast Asian', facialFeatures: 'happy expression, chubby cheeks', hairStyle: 'straight short', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'tan', fullDescription: 'Happy 3-year-old boy with chubby cheeks.', headshotUrl: 'attached_assets/personas/toddler-male-southeast-asian-xs-01_tan_headshot.png' },
  { id: 'toddler-male-middle-eastern-xs-01', name: 'Sami', age: '2', sex: 'Male', ethnicity: 'Middle Eastern', facialFeatures: 'large eyes, long lashes', hairStyle: 'thick curly', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'olive', fullDescription: 'Adorable 2-year-old boy with large expressive eyes.', headshotUrl: 'attached_assets/personas/toddler-male-middle-eastern-xs-01_sami_headshot.png' },
  { id: 'toddler-male-indigenous-xs-01', name: 'Bear', age: '3', sex: 'Male', ethnicity: 'Indigenous', facialFeatures: 'bright smile, round face', hairStyle: 'straight thick', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'medium brown', fullDescription: 'Cheerful 3-year-old boy with a bright smile.', headshotUrl: 'attached_assets/personas/toddler-male-indigenous-xs-01_bear_headshot.png' },
  { id: 'toddler-male-diverse-xs-01', name: 'Kai', age: '2', sex: 'Male', ethnicity: 'Diverse', facialFeatures: 'mixed features, friendly expression', hairStyle: 'loose curls', hairColor: 'light brown', eyeColor: 'hazel', skinTone: 'golden brown', fullDescription: 'Friendly 2-year-old boy with beautifully blended features.', headshotUrl: 'attached_assets/personas/toddler-male-diverse-xs-01_kai_headshot.png' },
  { id: 'toddler-female-white-xs-01', name: 'Ava', age: '2', sex: 'Female', ethnicity: 'White', facialFeatures: 'sweet expression, button nose', hairStyle: 'pigtails', hairColor: 'blonde', eyeColor: 'blue', skinTone: 'fair', fullDescription: 'Sweet 2-year-old girl with an adorable button nose.', headshotUrl: 'attached_assets/personas/toddler-female-white-xs-01_ava_headshot.png' },
  { id: 'toddler-female-black-xs-01', name: 'Nia', age: '3', sex: 'Female', ethnicity: 'Black', facialFeatures: 'joyful smile, expressive eyes', hairStyle: 'puffs', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'deep brown', fullDescription: 'Joyful 3-year-old girl with an infectious smile.', headshotUrl: 'attached_assets/personas/toddler-female-black-xs-01_nia_headshot.png' },
  { id: 'toddler-female-hispanic-xs-01', name: 'Isabella', age: '2', sex: 'Female', ethnicity: 'Hispanic', facialFeatures: 'rosy cheeks, dimples', hairStyle: 'wavy loose', hairColor: 'dark brown', eyeColor: 'brown', skinTone: 'olive', fullDescription: 'Adorable 2-year-old girl with rosy cheeks and sweet dimples.', headshotUrl: 'attached_assets/personas/toddler-female-hispanic-xs-01_isabella_headshot.png' },
  { id: 'toddler-female-asian-xs-01', name: 'Lily', age: '3', sex: 'Female', ethnicity: 'Asian', facialFeatures: 'delicate features, curious look', hairStyle: 'straight with bangs', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'light', fullDescription: 'Curious 3-year-old girl with delicate features.', headshotUrl: 'attached_assets/personas/toddler-female-asian-xs-01_lily_headshot.png' },
  { id: 'toddler-female-indian-xs-01', name: 'Priya', age: '2', sex: 'Female', ethnicity: 'Indian', facialFeatures: 'big eyes, sweet smile', hairStyle: 'thick braids', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'medium brown', fullDescription: 'Sweet 2-year-old girl with big expressive eyes.', headshotUrl: 'attached_assets/personas/toddler-female-indian-xs-01_priya_headshot.png' },
  { id: 'toddler-female-southeast-asian-xs-01', name: 'Mai', age: '3', sex: 'Female', ethnicity: 'Southeast Asian', facialFeatures: 'gentle expression, round cheeks', hairStyle: 'short bob', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'light tan', fullDescription: 'Gentle 3-year-old girl with round cheeks.', headshotUrl: 'attached_assets/personas/toddler-female-southeast-asian-xs-01_mai_headshot.png' },
  { id: 'toddler-female-middle-eastern-xs-01', name: 'Yasmin', age: '2', sex: 'Female', ethnicity: 'Middle Eastern', facialFeatures: 'large eyes, long lashes', hairStyle: 'curly loose', hairColor: 'dark brown', eyeColor: 'dark brown', skinTone: 'olive', fullDescription: 'Beautiful 2-year-old girl with large eyes and striking long lashes.', headshotUrl: 'attached_assets/personas/toddler-female-middle-eastern-xs-01_yasmin_headshot.png' },
  { id: 'toddler-female-indigenous-xs-01', name: 'Willow', age: '3', sex: 'Female', ethnicity: 'Indigenous', facialFeatures: 'bright smile, round face', hairStyle: 'long straight', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'warm brown', fullDescription: 'Happy 3-year-old girl with a bright smile and round face.', headshotUrl: 'attached_assets/personas/toddler-female-indigenous-xs-01_willow_headshot.png' },
  { id: 'toddler-female-diverse-xs-01', name: 'Luna', age: '2', sex: 'Female', ethnicity: 'Diverse', facialFeatures: 'mixed features, radiant smile', hairStyle: 'bouncy curls', hairColor: 'auburn', eyeColor: 'green', skinTone: 'caramel', fullDescription: 'Radiant 2-year-old girl with beautifully blended features.', headshotUrl: 'attached_assets/personas/toddler-female-diverse-xs-01_luna_headshot.png' }
];

const KIDS_PERSONAS: PersonaInfo[] = [
  { id: 'kids-male-white-s-01', name: 'Jack', age: '8', sex: 'Male', ethnicity: 'White', facialFeatures: 'freckles, friendly smile', hairStyle: 'short messy', hairColor: 'light brown', eyeColor: 'blue', skinTone: 'fair', fullDescription: 'Energetic 8-year-old boy with a friendly smile and light freckles.', headshotUrl: 'attached_assets/personas/kids-male-white-s-01_jack_headshot.png' },
  { id: 'kids-male-black-s-01', name: 'Jaylen', age: '9', sex: 'Male', ethnicity: 'Black', facialFeatures: 'confident expression, bright smile', hairStyle: 'short fade', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'rich brown', fullDescription: 'Confident 9-year-old boy with a bright smile.', headshotUrl: 'attached_assets/personas/kids-male-black-s-01_jaylen_headshot.png' },
  { id: 'kids-male-hispanic-s-01', name: 'Miguel', age: '7', sex: 'Male', ethnicity: 'Hispanic', facialFeatures: 'playful expression, dimples', hairStyle: 'wavy medium', hairColor: 'dark brown', eyeColor: 'brown', skinTone: 'warm tan', fullDescription: 'Playful 7-year-old boy with a mischievous grin and cute dimples.', headshotUrl: 'attached_assets/personas/kids-male-hispanic-s-01_miguel_headshot.png' },
  { id: 'kids-male-asian-s-01', name: 'Ryan', age: '8', sex: 'Male', ethnicity: 'Asian', facialFeatures: 'studious look, neat appearance', hairStyle: 'straight short', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'light', fullDescription: 'Studious 8-year-old boy with a neat appearance.', headshotUrl: 'attached_assets/personas/kids-male-asian-s-01_ryan_headshot.png' },
  { id: 'kids-male-indian-s-01', name: 'Aarav', age: '9', sex: 'Male', ethnicity: 'Indian', facialFeatures: 'friendly expression, bright eyes', hairStyle: 'thick wavy', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'medium brown', fullDescription: 'Friendly 9-year-old boy with bright expressive eyes.', headshotUrl: 'attached_assets/personas/kids-male-indian-s-01_aarav_headshot.png' },
  { id: 'kids-male-southeast-asian-s-01', name: 'Bao', age: '7', sex: 'Male', ethnicity: 'Southeast Asian', facialFeatures: 'cheerful expression', hairStyle: 'short spiky', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'tan', fullDescription: 'Cheerful 7-year-old boy with an infectious smile.', headshotUrl: 'attached_assets/personas/kids-male-southeast-asian-s-01_bao_headshot.png' },
  { id: 'kids-male-middle-eastern-s-01', name: 'Yusuf', age: '8', sex: 'Male', ethnicity: 'Middle Eastern', facialFeatures: 'expressive eyes, gentle smile', hairStyle: 'thick curly', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'olive', fullDescription: 'Gentle 8-year-old boy with expressive eyes.', headshotUrl: 'attached_assets/personas/kids-male-middle-eastern-s-01_yusuf_headshot.png' },
  { id: 'kids-male-indigenous-s-01', name: 'Hawk', age: '9', sex: 'Male', ethnicity: 'Indigenous', facialFeatures: 'strong features, warm smile', hairStyle: 'long straight', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'medium brown', fullDescription: 'Athletic 9-year-old boy with strong features.', headshotUrl: 'attached_assets/personas/kids-male-indigenous-s-01_hawk_headshot.png' },
  { id: 'kids-male-diverse-s-01', name: 'Jordan', age: '8', sex: 'Male', ethnicity: 'Diverse', facialFeatures: 'mixed features, friendly smile', hairStyle: 'curly medium', hairColor: 'brown', eyeColor: 'hazel', skinTone: 'golden', fullDescription: 'Friendly 8-year-old boy with beautifully blended features.', headshotUrl: 'attached_assets/personas/kids-male-diverse-s-01_jordan_headshot.png' },
  { id: 'kids-female-white-s-01', name: 'Sophie', age: '8', sex: 'Female', ethnicity: 'White', facialFeatures: 'sweet expression, freckles', hairStyle: 'long braided', hairColor: 'red', eyeColor: 'green', skinTone: 'fair', fullDescription: 'Sweet 8-year-old girl with light freckles.', headshotUrl: 'attached_assets/personas/kids-female-white-s-01_sophie_headshot.png' },
  { id: 'kids-female-black-s-01', name: 'Aisha', age: '9', sex: 'Female', ethnicity: 'Black', facialFeatures: 'bright smile, confident expression', hairStyle: 'braided buns', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'deep brown', fullDescription: 'Confident 9-year-old girl with a bright smile.', headshotUrl: 'attached_assets/personas/kids-female-black-s-01_aisha_headshot.png' },
  { id: 'kids-female-hispanic-s-01', name: 'Camila', age: '7', sex: 'Female', ethnicity: 'Hispanic', facialFeatures: 'dimples, cheerful expression', hairStyle: 'long wavy', hairColor: 'dark brown', eyeColor: 'brown', skinTone: 'olive', fullDescription: 'Cheerful 7-year-old girl with cute dimples.', headshotUrl: 'attached_assets/personas/kids-female-hispanic-s-01_camila_headshot.png' },
  { id: 'kids-female-asian-s-01', name: 'Emily', age: '8', sex: 'Female', ethnicity: 'Asian', facialFeatures: 'delicate features, studious look', hairStyle: 'ponytail', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'light', fullDescription: 'Studious 8-year-old girl with delicate features.', headshotUrl: 'attached_assets/personas/kids-female-asian-s-01_emily_headshot.png' },
  { id: 'kids-female-indian-s-01', name: 'Ananya', age: '9', sex: 'Female', ethnicity: 'Indian', facialFeatures: 'big eyes, warm smile', hairStyle: 'long braided', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'medium brown', fullDescription: 'Warm 9-year-old girl with big expressive eyes.', headshotUrl: 'attached_assets/personas/kids-female-indian-s-01_ananya_headshot.png' },
  { id: 'kids-female-southeast-asian-s-01', name: 'Thao', age: '7', sex: 'Female', ethnicity: 'Southeast Asian', facialFeatures: 'gentle expression, sweet smile', hairStyle: 'short bob', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'light tan', fullDescription: 'Gentle 7-year-old girl with a sweet smile.', headshotUrl: 'attached_assets/personas/kids-female-southeast-asian-s-01_thao_headshot.png' },
  { id: 'kids-female-middle-eastern-s-01', name: 'Leila', age: '8', sex: 'Female', ethnicity: 'Middle Eastern', facialFeatures: 'large eyes, long lashes', hairStyle: 'long curly', hairColor: 'dark brown', eyeColor: 'dark brown', skinTone: 'olive', fullDescription: 'Beautiful 8-year-old girl with large expressive eyes.', headshotUrl: 'attached_assets/personas/kids-female-middle-eastern-s-01_leila_headshot.png' },
  { id: 'kids-female-indigenous-s-01', name: 'Sky', age: '9', sex: 'Female', ethnicity: 'Indigenous', facialFeatures: 'bright eyes, confident smile', hairStyle: 'two braids', hairColor: 'black', eyeColor: 'dark brown', skinTone: 'warm brown', fullDescription: 'Confident 9-year-old girl with bright eyes.', headshotUrl: 'attached_assets/personas/kids-female-indigenous-s-01_sky_headshot.png' },
  { id: 'kids-female-diverse-s-01', name: 'Maya', age: '8', sex: 'Female', ethnicity: 'Diverse', facialFeatures: 'mixed features, radiant smile', hairStyle: 'natural curls', hairColor: 'brown', eyeColor: 'amber', skinTone: 'caramel', fullDescription: 'Radiant 8-year-old girl with beautifully blended features.', headshotUrl: 'attached_assets/personas/kids-female-diverse-s-01_maya_headshot.png' }
];

const SENIOR_PERSONAS: PersonaInfo[] = [
  { id: 'senior-male-white-l-01', name: 'Robert', age: '68', sex: 'Male', ethnicity: 'White', facialFeatures: 'distinguished gray hair, kind eyes', hairStyle: 'short gray', hairColor: 'gray', eyeColor: 'blue', skinTone: 'fair', fullDescription: 'Distinguished 68-year-old man with kind eyes.', headshotUrl: 'attached_assets/personas/senior-male-white-l-01_robert_headshot.png' },
  { id: 'senior-male-black-l-01', name: 'Harold', age: '72', sex: 'Male', ethnicity: 'Black', facialFeatures: 'dignified expression, gray beard', hairStyle: 'short gray', hairColor: 'gray', eyeColor: 'dark brown', skinTone: 'rich brown', fullDescription: 'Dignified 72-year-old man with a neat gray beard.', headshotUrl: 'attached_assets/personas/senior-male-black-l-01_harold_headshot.png' },
  { id: 'senior-male-hispanic-l-01', name: 'Antonio', age: '65', sex: 'Male', ethnicity: 'Hispanic', facialFeatures: 'warm smile, salt-and-pepper mustache', hairStyle: 'wavy gray', hairColor: 'salt-and-pepper', eyeColor: 'brown', skinTone: 'tan', fullDescription: 'Warm 65-year-old man with a friendly smile.', headshotUrl: 'attached_assets/personas/senior-male-hispanic-l-01_antonio_headshot.png' },
  { id: 'senior-male-asian-l-01', name: 'Chen', age: '70', sex: 'Male', ethnicity: 'Asian', facialFeatures: 'wise expression, gentle smile', hairStyle: 'short gray', hairColor: 'gray', eyeColor: 'dark brown', skinTone: 'light', fullDescription: 'Wise 70-year-old man with a gentle smile.', headshotUrl: 'attached_assets/personas/senior-male-asian-l-01_chen_headshot.png' },
  { id: 'senior-male-indian-l-01', name: 'Vijay', age: '67', sex: 'Male', ethnicity: 'Indian', facialFeatures: 'kind expression, gray beard', hairStyle: 'thinning gray', hairColor: 'gray', eyeColor: 'dark brown', skinTone: 'medium brown', fullDescription: 'Kind 67-year-old man with a neat gray beard.', headshotUrl: 'attached_assets/personas/senior-male-indian-l-01_vijay_headshot.png' },
  { id: 'senior-male-southeast-asian-l-01', name: 'Tran', age: '69', sex: 'Male', ethnicity: 'Southeast Asian', facialFeatures: 'serene expression', hairStyle: 'short gray', hairColor: 'gray', eyeColor: 'dark brown', skinTone: 'tan', fullDescription: 'Serene 69-year-old man with a calm demeanor.', headshotUrl: 'attached_assets/personas/senior-male-southeast-asian-l-01_tran_headshot.png' },
  { id: 'senior-male-middle-eastern-l-01', name: 'Karim', age: '66', sex: 'Male', ethnicity: 'Middle Eastern', facialFeatures: 'distinguished beard, wise eyes', hairStyle: 'gray swept back', hairColor: 'gray', eyeColor: 'dark brown', skinTone: 'olive', fullDescription: 'Distinguished 66-year-old man with a full gray beard.', headshotUrl: 'attached_assets/personas/senior-male-middle-eastern-l-01_karim_headshot.png' },
  { id: 'senior-male-indigenous-l-01', name: 'Joseph', age: '71', sex: 'Male', ethnicity: 'Indigenous', facialFeatures: 'weathered features, wise expression', hairStyle: 'long gray braided', hairColor: 'gray', eyeColor: 'dark brown', skinTone: 'medium brown', fullDescription: 'Wise 71-year-old man with weathered features.', headshotUrl: 'attached_assets/personas/senior-male-indigenous-l-01_joseph_headshot.png' },
  { id: 'senior-male-diverse-l-01', name: 'James', age: '68', sex: 'Male', ethnicity: 'Diverse', facialFeatures: 'mixed heritage features, warm smile', hairStyle: 'curly gray', hairColor: 'gray', eyeColor: 'hazel', skinTone: 'light brown', fullDescription: 'Warm 68-year-old man with beautifully blended heritage features.', headshotUrl: 'attached_assets/personas/senior-male-diverse-l-01_james_headshot.png' },
  { id: 'senior-female-white-l-01', name: 'Margaret', age: '67', sex: 'Female', ethnicity: 'White', facialFeatures: 'elegant features, warm smile', hairStyle: 'short silver bob', hairColor: 'silver', eyeColor: 'blue', skinTone: 'fair', fullDescription: 'Elegant 67-year-old woman with a warm smile.', headshotUrl: 'attached_assets/personas/senior-female-white-l-01_margaret_headshot.png' },
  { id: 'senior-female-black-l-01', name: 'Dorothy', age: '70', sex: 'Female', ethnicity: 'Black', facialFeatures: 'graceful features, radiant smile', hairStyle: 'short natural gray', hairColor: 'gray', eyeColor: 'dark brown', skinTone: 'rich brown', fullDescription: 'Graceful 70-year-old woman with a radiant smile.', headshotUrl: 'attached_assets/personas/senior-female-black-l-01_dorothy_headshot.png' },
  { id: 'senior-female-hispanic-l-01', name: 'Rosa', age: '66', sex: 'Female', ethnicity: 'Hispanic', facialFeatures: 'warm expression, kind eyes', hairStyle: 'medium gray wavy', hairColor: 'salt-and-pepper', eyeColor: 'brown', skinTone: 'tan', fullDescription: 'Warm 66-year-old woman with kind eyes.', headshotUrl: 'attached_assets/personas/senior-female-hispanic-l-01_rosa_headshot.png' },
  { id: 'senior-female-asian-l-01', name: 'Mei Lin', age: '69', sex: 'Female', ethnicity: 'Asian', facialFeatures: 'serene expression, gentle smile', hairStyle: 'short gray', hairColor: 'gray', eyeColor: 'dark brown', skinTone: 'light', fullDescription: 'Serene 69-year-old woman with a gentle smile.', headshotUrl: 'attached_assets/personas/senior-female-asian-l-01_mei-lin_headshot.png' },
  { id: 'senior-female-indian-l-01', name: 'Lakshmi', age: '68', sex: 'Female', ethnicity: 'Indian', facialFeatures: 'graceful features, warm eyes', hairStyle: 'long gray braided', hairColor: 'gray', eyeColor: 'dark brown', skinTone: 'medium brown', fullDescription: 'Graceful 68-year-old woman with warm eyes.', headshotUrl: 'attached_assets/personas/senior-female-indian-l-01_lakshmi_headshot.png' },
  { id: 'senior-female-southeast-asian-l-01', name: 'Nguyen', age: '65', sex: 'Female', ethnicity: 'Southeast Asian', facialFeatures: 'calm expression, gentle smile', hairStyle: 'short gray', hairColor: 'gray', eyeColor: 'dark brown', skinTone: 'tan', fullDescription: 'Calm 65-year-old woman with a gentle smile.', headshotUrl: 'attached_assets/personas/senior-female-southeast-asian-l-01_nguyen_headshot.png' },
  { id: 'senior-female-middle-eastern-l-01', name: 'Fatima', age: '67', sex: 'Female', ethnicity: 'Middle Eastern', facialFeatures: 'elegant features, wise eyes', hairStyle: 'medium gray', hairColor: 'gray', eyeColor: 'dark brown', skinTone: 'olive', fullDescription: 'Elegant 67-year-old woman with wise eyes.', headshotUrl: 'attached_assets/personas/senior-female-middle-eastern-l-01_fatima_headshot.png' },
  { id: 'senior-female-indigenous-l-01', name: 'Grace', age: '70', sex: 'Female', ethnicity: 'Indigenous', facialFeatures: 'weathered beauty, wise expression', hairStyle: 'long gray braided', hairColor: 'gray', eyeColor: 'dark brown', skinTone: 'medium brown', fullDescription: 'Wise 70-year-old woman with beautiful weathered features.', headshotUrl: 'attached_assets/personas/senior-female-indigenous-l-01_grace_headshot.png' },
  { id: 'senior-female-diverse-l-01', name: 'Patricia', age: '68', sex: 'Female', ethnicity: 'Diverse', facialFeatures: 'mixed heritage features, radiant smile', hairStyle: 'curly gray', hairColor: 'gray', eyeColor: 'hazel', skinTone: 'light brown', fullDescription: 'Radiant 68-year-old woman with beautifully blended heritage features.', headshotUrl: 'attached_assets/personas/senior-female-diverse-l-01_patricia_headshot.png' }
];

async function generateHeadshot(persona: PersonaInfo): Promise<string | null> {
  const ageDescription = persona.age.includes('month') ? persona.age : `${persona.age}-year-old`;
  
  const prompt = `Professional passport-style headshot photograph of a ${ageDescription} ${persona.sex.toLowerCase()} ${persona.ethnicity} person.

===== CRITICAL IDENTITY DETAILS =====
PERSONA IDENTITY:
- Name: ${persona.name}
- ${persona.fullDescription}

SPECIFIC APPEARANCE:
- Hair style: ${persona.hairStyle}
- Hair color: ${persona.hairColor}
- Eye color: ${persona.eyeColor}
- Skin tone: ${persona.skinTone}
- Facial features: ${persona.facialFeatures}
===== END IDENTITY =====

CAMERA SPECIFICATIONS:
- Lens: 85mm portrait lens, f/2.8
- Framing: Head and shoulders, centered
- Background: Neutral gray studio backdrop
- Expression: Neutral, pleasant, natural

LIGHTING:
- Three-point studio lighting
- Soft key light at 45 degrees
- Fill light at 1:3 ratio
- Subtle rim light for separation

STYLE:
- Clean, professional, ID-photo quality
- Sharp focus on eyes
- Natural skin texture
- Culturally authentic appearance

MUST AVOID: watermarks, text, logos, distorted features, unnatural proportions, blurry, low quality, oversaturated colors`;

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { responseModalities: [Modality.TEXT, Modality.IMAGE] }
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const content = candidates[0].content;
      if (content && content.parts) {
        for (const part of content.parts) {
          if (part.inlineData && part.inlineData.data) {
            return part.inlineData.data;
          }
        }
      }
    }
    return null;
  } catch (error) {
    console.error(`Error generating headshot for ${persona.id}:`, error);
    return null;
  }
}

async function saveHeadshot(base64Data: string, filePath: string): Promise<void> {
  const fullPath = path.join(process.cwd(), filePath);
  const dir = path.dirname(fullPath);
  await fs.mkdir(dir, { recursive: true });
  const buffer = Buffer.from(base64Data, 'base64');
  await fs.writeFile(fullPath, buffer);
  console.log(`Saved: ${filePath}`);
}

async function checkExistingHeadshot(filePath: string): Promise<boolean> {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    await fs.access(fullPath);
    return true;
  } catch {
    return false;
  }
}

async function generateAllHeadshots(ageGroup: string, personas: PersonaInfo[]): Promise<void> {
  console.log(`\n=== Generating ${ageGroup} headshots (${personas.length} personas) ===\n`);
  
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const persona of personas) {
    const exists = await checkExistingHeadshot(persona.headshotUrl);
    if (exists) {
      console.log(`[SKIP] ${persona.id} - already exists`);
      skipped++;
      continue;
    }

    console.log(`[GEN] ${persona.id} - ${persona.name}...`);
    const imageData = await generateHeadshot(persona);
    
    if (imageData) {
      await saveHeadshot(imageData, persona.headshotUrl);
      generated++;
      await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
      console.error(`[FAIL] ${persona.id}`);
      failed++;
    }
  }

  console.log(`\n=== ${ageGroup} Complete: ${generated} generated, ${skipped} skipped, ${failed} failed ===\n`);
}

async function main() {
  const args = process.argv.slice(2);
  const ageGroup = args[0]?.toLowerCase() || 'all';

  console.log("Starting headshot generation...");
  console.log(`Age group: ${ageGroup}`);

  if (ageGroup === 'baby' || ageGroup === 'all') {
    await generateAllHeadshots('Baby', BABY_PERSONAS);
  }
  if (ageGroup === 'toddler' || ageGroup === 'all') {
    await generateAllHeadshots('Toddler', TODDLER_PERSONAS);
  }
  if (ageGroup === 'kids' || ageGroup === 'all') {
    await generateAllHeadshots('Kids', KIDS_PERSONAS);
  }
  if (ageGroup === 'senior' || ageGroup === 'all') {
    await generateAllHeadshots('Senior', SENIOR_PERSONAS);
  }

  console.log("\nHeadshot generation complete!");
}

main().catch(console.error);
