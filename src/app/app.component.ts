import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconComposition, CodeOutput } from './models/icon.model';
import { CodeGeneratorService } from './services/code-generator.service';
import { IconSelectorComponent } from './components/icon-selector/icon-selector.component';
import { IconPreviewComponent } from './components/icon-preview/icon-preview.component';
import { PositionSelectorComponent } from './components/position-selector/position-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatTabsModule,
    MatTooltipModule,
    IconSelectorComponent,
    IconPreviewComponent,
    PositionSelectorComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Icon Modifier - Material Icon Wizard';

  composition: IconComposition = {
    baseIcon: '',
    modifierIcon: '',
    position: 'bottom-right',
    size: 64,
    color: '#424242',
    modifierColor: '#2196f3'
  };

  generatedCode: CodeOutput = {
    html: '',
    css: '',
    svg: ''
  };

  // UI State
  activeTab = 0; // 0: HTML, 1: CSS, 2: SVG
  showPreviewBackground = false;

  constructor(private codeGeneratorService: CodeGeneratorService) {}

  ngOnInit(): void {
    // Initialize with default icons for demo
    this.composition.baseIcon = 'mail';
    this.composition.modifierIcon = 'add_circle';
    this.updateGeneratedCode();
  }

  onBaseIconSelected(iconName: string): void {
    this.composition.baseIcon = iconName;
    this.updateGeneratedCode();
  }

  onModifierIconSelected(iconName: string): void {
    this.composition.modifierIcon = iconName;
    this.updateGeneratedCode();
  }

  onPositionSelected(position: any): void {
    this.composition.position = position;
    this.updateGeneratedCode();
  }

  onSizeChange(size: number): void {
    this.composition.size = size;
    this.updateGeneratedCode();
  }

  onColorChange(color: string, type: 'base' | 'modifier'): void {
    if (type === 'base') {
      this.composition.color = color;
    } else {
      this.composition.modifierColor = color;
    }
    this.updateGeneratedCode();
  }

  private updateGeneratedCode(): void {
    if (this.composition.baseIcon) {
      this.generatedCode = this.codeGeneratorService.generateCode(this.composition);
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a snackbar notification here
      console.log('Copied to clipboard');
    });
  }

  downloadCode(type: 'html' | 'css' | 'svg'): void {
    let content = '';
    let filename = '';
    let mimeType = '';

    switch (type) {
      case 'html':
        content = this.codeGeneratorService.generateCompleteSnippet(this.composition);
        filename = 'icon-composition.html';
        mimeType = 'text/html';
        break;
      case 'css':
        content = this.generatedCode.css;
        filename = 'icon-styles.css';
        mimeType = 'text/css';
        break;
      case 'svg':
        content = this.generatedCode.svg;
        filename = 'icon-composition.svg';
        mimeType = 'image/svg+xml';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  resetComposition(): void {
    this.composition = {
      baseIcon: '',
      modifierIcon: '',
      position: 'bottom-right',
      size: 64,
      color: '#424242',
      modifierColor: '#2196f3'
    };
    this.updateGeneratedCode();
  }
}