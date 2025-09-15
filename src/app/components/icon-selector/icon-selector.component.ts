import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { MaterialIcon } from '../../models/icon.model';
import { IconDataService } from '../../services/icon-data.service';

@Component({
  selector: 'app-icon-selector',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './icon-selector.component.html',
  styleUrls: ['./icon-selector.component.scss']
})
export class IconSelectorComponent implements OnInit, OnDestroy {
  @Input() label: string = 'Select Icon';
  @Input() placeholder: string = 'Search icons...';
  @Input() selectedIcon: string = '';
  @Input() showCommonOnly: boolean = false;
  @Output() iconSelected = new EventEmitter<string>();

  searchControl = new FormControl('');
  filteredIcons$: Observable<MaterialIcon[]> | undefined;
  isDropdownOpen = false;
  
  private destroy$ = new Subject<void>();

  constructor(private iconDataService: IconDataService) {}

  ngOnInit(): void {
    this.setupSearch();
    this.searchControl.setValue(this.selectedIcon);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch(): void {
    this.filteredIcons$ = this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        if (this.showCommonOnly && !searchTerm) {
          return this.iconDataService.getCommonModifiers();
        }
        return this.iconDataService.searchIcons(searchTerm as string || '');
      }),
      takeUntil(this.destroy$)
    );

    // Initialize with default search
    if (this.showCommonOnly) {
      this.filteredIcons$ = this.iconDataService.getCommonModifiers();
    } else {
      this.filteredIcons$ = this.iconDataService.getAllIcons();
    }
  }

  onIconSelect(iconName: string): void {
    this.selectedIcon = iconName;
    this.searchControl.setValue(iconName);
    this.iconSelected.emit(iconName);
    this.isDropdownOpen = false;
  }

  onInputFocus(): void {
    this.isDropdownOpen = true;
  }

  onInputBlur(): void {
    // Delay to allow for icon selection
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 200);
  }

  clearSelection(): void {
    this.selectedIcon = '';
    this.searchControl.setValue('');
    this.iconSelected.emit('');
  }
}