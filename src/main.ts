import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { IconDataService } from './app/services/icon-data.service';
import { CodeGeneratorService } from './app/services/code-generator.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    IconDataService,
    CodeGeneratorService
  ]
}).catch(err => console.error(err));