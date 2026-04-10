export interface MBTIType {
  type: string;
  name: string;
  role: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  relationships: string;
  color: string;
}

export interface MBTIQuestion {
  id: number;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  textA: string;
  textB: string;
  weightA: number;
  weightB: number;
}

export interface SBTIQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
    type: string;
  }[];
}

export interface SBTIType {
  type: string;
  title: string;
  description: string;
  traits: string[];
  celebrity: string;
}

export interface TestResult {
  type: string;
  dimensions: {
    EI: number;
    SN: number;
    TF: number;
    JP: number;
  };
  answers: number[];
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Industry {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  popularTypes: string[];
  features: string[];
  comingSoon?: boolean;
}
