import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IconComposition } from '../../models/icon.model';

@Component({
  selector: 'app-icon-preview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatFormFieldModule
  ],
  templateUrl: './icon-preview.component.html',
  styleUrls: ['./icon-preview.component.scss']
})
export class IconPreviewComponent implements OnChanges {
  @Input() composition: IconComposition = {
    baseIcon: 'mail',
    modifierIcon: 'add_circle',
    position: 'bottom-right',
    size: 64,
    color: '#424242',
    modifierColor: '#2196f3'
  };

  @Input() showBackground: boolean = false;

  previewSizes = [
    { name: 'Small', size: 24 },
    { name: 'Medium', size: 48 },
    { name: 'Large', size: 64 },
    { name: 'Extra Large', size: 96 }
  ];

  currentPreviewSize = 64;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['composition']) {
      // Update current preview size when composition changes
      this.currentPreviewSize = this.composition.size;
    }
  }

  onPreviewSizeChange(size: number): void {
    this.currentPreviewSize = size;
  }

  getPreviewComposition(): IconComposition {
    return {
      ...this.composition,
      size: this.currentPreviewSize
    };
  }

  getIconStackStyle(): any {
    return {
      'font-size.px': this.currentPreviewSize,
      'color': this.composition.color
    };
  }

  getModifierStyle(): any {
    return {
      'color': this.composition.modifierColor
    };
  }

  getModifierClasses(): string {
    return `icon-modifier ${this.composition.position}`;
  }
}