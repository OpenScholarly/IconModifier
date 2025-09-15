import { Injectable } from '@angular/core';
import { IconComposition, CodeOutput } from '../models/icon.model';

@Injectable({
  providedIn: 'root'
})
export class CodeGeneratorService {

  constructor() { }

  /**
   * Generate HTML, CSS, and SVG code for the icon composition
   */
  generateCode(composition: IconComposition): CodeOutput {
    return {
      html: this.generateHTML(composition),
      css: this.generateCSS(composition),
      svg: this.generateSVG(composition)
    };
  }

  /**
   * Generate HTML markup for the icon composition
   */
  private generateHTML(composition: IconComposition): string {
    const { baseIcon, modifierIcon, position, size, color, modifierColor } = composition;
    
    return `<div class="icon-stack" style="font-size: ${size}px; color: ${color};">
  <span class="material-symbols-outlined">${baseIcon}</span>
  <span class="material-symbols-outlined icon-modifier ${position}" style="color: ${modifierColor};">${modifierIcon}</span>
</div>`;
  }

  /**
   * Generate CSS styles for the icon composition
   */
  private generateCSS(composition: IconComposition): string {
    return `.icon-stack {
  position: relative;
  display: inline-block;
}

.icon-modifier {
  position: absolute;
  font-size: 0.6em;
  background: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.icon-modifier.top-left {
  top: -4px;
  left: -4px;
}

.icon-modifier.top-right {
  top: -4px;
  right: -4px;
}

.icon-modifier.bottom-left {
  bottom: -4px;
  left: -4px;
}

.icon-modifier.bottom-right {
  bottom: -4px;
  right: -4px;
}

.icon-modifier.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`;
  }

  /**
   * Generate SVG markup for the icon composition
   */
  private generateSVG(composition: IconComposition): string {
    const { baseIcon, modifierIcon, position, size, color, modifierColor } = composition;
    const modifierSize = size * 0.6;
    const { x, y } = this.getModifierPosition(position, size, modifierSize);

    return `<svg width="${size + 8}" height="${size + 8}" viewBox="0 0 ${size + 8} ${size + 8}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .base-icon { font-family: 'Material Symbols Outlined'; font-size: ${size}px; fill: ${color}; }
      .modifier-icon { font-family: 'Material Symbols Outlined'; font-size: ${modifierSize}px; fill: ${modifierColor}; }
      .modifier-bg { fill: white; stroke: rgba(0,0,0,0.1); stroke-width: 1; }
    </style>
  </defs>
  
  <!-- Base Icon -->
  <text x="4" y="${size}" class="base-icon">${baseIcon}</text>
  
  <!-- Modifier Background Circle -->
  <circle cx="${x + modifierSize/2}" cy="${y + modifierSize/2}" r="${modifierSize/2 + 2}" class="modifier-bg"/>
  
  <!-- Modifier Icon -->
  <text x="${x}" y="${y + modifierSize * 0.8}" class="modifier-icon">${modifierIcon}</text>
</svg>`;
  }

  /**
   * Calculate modifier position coordinates
   */
  private getModifierPosition(position: string, baseSize: number, modifierSize: number): { x: number, y: number } {
    const offset = 4;
    
    switch (position) {
      case 'top-left':
        return { x: offset - modifierSize/2, y: offset };
      case 'top-right':
        return { x: baseSize - modifierSize/2 + offset, y: offset };
      case 'bottom-left':
        return { x: offset - modifierSize/2, y: baseSize - modifierSize + offset };
      case 'bottom-right':
        return { x: baseSize - modifierSize/2 + offset, y: baseSize - modifierSize + offset };
      case 'center':
        return { x: (baseSize - modifierSize) / 2 + offset, y: (baseSize - modifierSize) / 2 + offset };
      default:
        return { x: baseSize - modifierSize/2 + offset, y: baseSize - modifierSize + offset };
    }
  }

  /**
   * Get a complete code snippet with HTML and CSS combined
   */
  generateCompleteSnippet(composition: IconComposition): string {
    const code = this.generateCode(composition);
    
    return `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
  <style>
${code.css}
  </style>
</head>
<body>
  ${code.html}
</body>
</html>`;
  }
}