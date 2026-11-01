export type ToolCategory = 'ai-writing' | 'seo' | 'image' | 'pdf' | 'developer';

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolExample {
  title: string;
  description: string;
  input: string;
  output?: string;
}

export interface ToolDefinition {
  id: string;
  name: string;
  shortDescription: string;
  category: ToolCategory;
  categoryName: string;
  iconName: string;
  badge?: 'Popular' | 'New' | 'AI Powered' | 'Client-Side' | 'Essential';
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  whatItDoes: string;
  howToUse: string[];
  benefits: string[];
  examples: ToolExample[];
  limitations: string[];
  faqs: ToolFaq[];
  relatedToolIds: string[];
}

export interface CategoryInfo {
  id: ToolCategory;
  slug: string;
  title: string;
  navTitle: string;
  description: string;
  iconName: string;
  color: string;
  count: number;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  favorites: string[];
  recentTools: string[];
  aiRequestsUsedToday: number;
}
