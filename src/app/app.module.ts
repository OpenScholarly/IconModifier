import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components
import { AppComponent } from './app.component';
import { IconSelectorComponent } from './components/icon-selector/icon-selector.component';
import { IconPreviewComponent } from './components/icon-preview/icon-preview.component';
import { PositionSelectorComponent } from './components/position-selector/position-selector.component';

// Services
import { IconDataService } from './services/icon-data.service';
import { CodeGeneratorService } from './services/code-generator.service';

@NgModule({
  declarations: [
    AppComponent,
    IconSelectorComponent,
    IconPreviewComponent,
    PositionSelectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    
    // Material Modules
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatTooltipModule
  ],
  providers: [
    IconDataService,
    CodeGeneratorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }