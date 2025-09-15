export interface MaterialIcon {
  name: string;
  category: string;
  tags: string[];
}

export interface IconComposition {
  baseIcon: string;
  modifierIcon: string;
  position: ModifierPosition;
  size: number;
  color: string;
  modifierColor: string;
}

export type ModifierPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

export interface CodeOutput {
  html: string;
  css: string;
  svg: string;
}