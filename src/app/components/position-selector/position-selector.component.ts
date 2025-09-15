import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ModifierPosition } from '../../models/icon.model';

@Component({
  selector: 'app-position-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './position-selector.component.html',
  styleUrls: ['./position-selector.component.scss']
})
export class PositionSelectorComponent {
  @Input() selectedPosition: ModifierPosition = 'bottom-right';
  @Output() positionSelected = new EventEmitter<ModifierPosition>();

  positions: { value: ModifierPosition; label: string; icon: string }[] = [
    { value: 'top-left', label: 'Top Left', icon: 'north_west' },
    { value: 'top-right', label: 'Top Right', icon: 'north_east' },
    { value: 'center', label: 'Center', icon: 'center_focus_strong' },
    { value: 'bottom-left', label: 'Bottom Left', icon: 'south_west' },
    { value: 'bottom-right', label: 'Bottom Right', icon: 'south_east' }
  ];

  constructor() { }

  onPositionChange(position: ModifierPosition): void {
    this.selectedPosition = position;
    this.positionSelected.emit(position);
  }

  getSelectedPositionIcon(): string {
    const position = this.positions.find(p => p.value === this.selectedPosition);
    return position?.icon || 'center_focus_strong';
  }

  getSelectedPositionLabel(): string {
    const position = this.positions.find(p => p.value === this.selectedPosition);
    return position?.label || 'Center';
  }
}