import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MaterialIcon } from '../models/icon.model';

@Injectable({
  providedIn: 'root'
})
export class IconDataService {
  private readonly materialIcons: MaterialIcon[] = [
    // Common icons
    { name: 'home', category: 'action', tags: ['house', 'building', 'main'] },
    { name: 'mail', category: 'communication', tags: ['email', 'message', 'envelope'] },
    { name: 'person', category: 'social', tags: ['user', 'profile', 'account'] },
    { name: 'settings', category: 'action', tags: ['gear', 'config', 'preferences'] },
    { name: 'search', category: 'action', tags: ['find', 'magnifying', 'glass'] },
    { name: 'favorite', category: 'action', tags: ['heart', 'like', 'love'] },
    { name: 'delete', category: 'action', tags: ['trash', 'remove', 'bin'] },
    { name: 'edit', category: 'editor', tags: ['pencil', 'modify', 'change'] },
    { name: 'save', category: 'content', tags: ['disk', 'store', 'keep'] },
    { name: 'share', category: 'social', tags: ['send', 'distribute', 'pass'] },
    
    // Communication
    { name: 'phone', category: 'communication', tags: ['call', 'telephone', 'contact'] },
    { name: 'message', category: 'communication', tags: ['chat', 'text', 'sms'] },
    { name: 'notifications', category: 'social', tags: ['bell', 'alert', 'reminder'] },
    
    // Navigation
    { name: 'menu', category: 'navigation', tags: ['hamburger', 'bars', 'list'] },
    { name: 'arrow_back', category: 'navigation', tags: ['left', 'previous', 'return'] },
    { name: 'arrow_forward', category: 'navigation', tags: ['right', 'next', 'continue'] },
    { name: 'close', category: 'navigation', tags: ['x', 'cancel', 'exit'] },
    { name: 'expand_more', category: 'navigation', tags: ['down', 'dropdown', 'chevron'] },
    { name: 'expand_less', category: 'navigation', tags: ['up', 'collapse', 'chevron'] },
    
    // File operations
    { name: 'folder', category: 'file', tags: ['directory', 'container', 'storage'] },
    { name: 'file_copy', category: 'content', tags: ['duplicate', 'clone', 'copy'] },
    { name: 'download', category: 'file', tags: ['get', 'retrieve', 'save'] },
    { name: 'upload', category: 'file', tags: ['send', 'transfer', 'put'] },
    
    // Modifiers - common overlay icons
    { name: 'add', category: 'content', tags: ['plus', 'create', 'new'] },
    { name: 'add_circle', category: 'content', tags: ['plus', 'create', 'new', 'circle'] },
    { name: 'remove', category: 'content', tags: ['minus', 'delete', 'subtract'] },
    { name: 'remove_circle', category: 'content', tags: ['minus', 'delete', 'subtract', 'circle'] },
    { name: 'check', category: 'action', tags: ['done', 'complete', 'verified'] },
    { name: 'check_circle', category: 'action', tags: ['done', 'complete', 'verified', 'circle'] },
    { name: 'error', category: 'alert', tags: ['warning', 'problem', 'issue'] },
    { name: 'warning', category: 'alert', tags: ['caution', 'attention', 'alert'] },
    { name: 'info', category: 'action', tags: ['information', 'details', 'help'] },
    { name: 'lock', category: 'action', tags: ['secure', 'protected', 'private'] },
    { name: 'visibility', category: 'action', tags: ['eye', 'show', 'view'] },
    { name: 'visibility_off', category: 'action', tags: ['eye', 'hide', 'hidden'] },
    
    // Social
    { name: 'star', category: 'toggle', tags: ['rating', 'bookmark', 'important'] },
    { name: 'thumb_up', category: 'social', tags: ['like', 'approve', 'good'] },
    { name: 'thumb_down', category: 'social', tags: ['dislike', 'disapprove', 'bad'] },
    
    // Media
    { name: 'play_arrow', category: 'av', tags: ['start', 'run', 'begin'] },
    { name: 'pause', category: 'av', tags: ['stop', 'wait', 'hold'] },
    { name: 'stop', category: 'av', tags: ['end', 'finish', 'terminate'] },
    { name: 'volume_up', category: 'av', tags: ['sound', 'audio', 'loud'] },
    { name: 'volume_off', category: 'av', tags: ['mute', 'silent', 'quiet'] }
  ];

  private readonly commonModifiers: string[] = [
    'add_circle', 'remove_circle', 'check_circle', 'error', 'warning', 'info',
    'lock', 'star', 'visibility', 'visibility_off', 'thumb_up', 'thumb_down'
  ];

  private searchSubject = new BehaviorSubject<string>('');

  constructor() { }

  /**
   * Get all available Material Icons
   */
  getAllIcons(): Observable<MaterialIcon[]> {
    return of(this.materialIcons);
  }

  /**
   * Get common modifier icons
   */
  getCommonModifiers(): Observable<MaterialIcon[]> {
    return of(this.materialIcons.filter(icon => this.commonModifiers.includes(icon.name)));
  }

  /**
   * Search icons by name or tags
   */
  searchIcons(query: string): Observable<MaterialIcon[]> {
    if (!query.trim()) {
      return this.getAllIcons();
    }

    const searchTerm = query.toLowerCase().trim();
    
    return of(this.materialIcons.filter(icon => 
      icon.name.toLowerCase().includes(searchTerm) ||
      icon.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      icon.category.toLowerCase().includes(searchTerm)
    ));
  }

  /**
   * Get icons by category
   */
  getIconsByCategory(category: string): Observable<MaterialIcon[]> {
    return of(this.materialIcons.filter(icon => icon.category === category));
  }

  /**
   * Get all unique categories
   */
  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.materialIcons.map(icon => icon.category))];
    return of(categories.sort());
  }

  /**
   * Check if an icon exists
   */
  iconExists(iconName: string): boolean {
    return this.materialIcons.some(icon => icon.name === iconName);
  }

  /**
   * Get icon details by name
   */
  getIconByName(iconName: string): Observable<MaterialIcon | undefined> {
    return of(this.materialIcons.find(icon => icon.name === iconName));
  }
}