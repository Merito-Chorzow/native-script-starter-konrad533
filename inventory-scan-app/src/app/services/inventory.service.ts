import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
    private items: Item[] = [
        { id: '1', name: 'Laptop', code: 'ITM001', status: 'Dostępny', description: 'Laptop biurowy' },
        { id: '2', name: 'Monitor', code: 'ITM002', status: 'Niedostępny', description: 'Monitor z wysokim odświeżaniem' },
        { id: '3', name: 'Klawiatura', code: 'ITM003', status: 'Dostępny', description: 'Klawiatura mechaniczna' },
    ];

    constructor(private http: HttpClient) {}

    getItems(): Observable<Item[]> {
        return of(this.items).pipe(delay(500));
    }

    getItemById(id: string): Item | undefined {
        return this.items.find(i => i.id === id);
    }

    addItem(item: Item): void {
        this.items.push(item);
    }

    deleteItem(id: string): void {
        this.items = this.items.filter(i => i.id !== id);
    }
}