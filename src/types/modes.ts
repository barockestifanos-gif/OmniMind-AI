export type Mode = 'study' | 'health' | 'business' | 'management' | 'amharic';

export interface ModeConfig {
  id: Mode;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  glowClass: string;
  textGradientClass: string;
  systemPrompt: string;
  suggestions: string[];
  voiceOptions: VoiceOption[];
}

export interface VoiceOption {
  id: string;
  name: string;
  description: string;
  pitch: number;
  rate: number;
}

export interface FileAttachment {
  name: string;
  type: string;
  url: string;
  size: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: FileAttachment[];
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  currentMode: Mode;
}
