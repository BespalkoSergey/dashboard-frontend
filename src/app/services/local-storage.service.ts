import { Injectable, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

abstract class AbstractStorage implements Storage {
  public abstract readonly length: number

  public abstract clear(): void

  public abstract getItem(key: string): string | null

  public abstract key(index: number): string | null

  public abstract removeItem(key: string): void

  public abstract setItem(key: string, value: string): void
}

class StorageFallback implements AbstractStorage {
  private readonly storage = new Map<string, string>()

  public get length(): number {
    return this.storage.size
  }

  public getItem(key: string): string | null {
    return this.storage.has(key) ? this.storage.get(key) ?? null : null
  }

  public setItem(key: string, value: string): void {
    this.storage.set(key, value)
  }

  public clear(): void {
    this.storage.clear()
  }

  public key(index: number): string | null {
    return index < this.length ? [...this.storage.keys()][index] : null
  }

  public removeItem(key: string): void {
    this.storage.delete(key)
  }
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService extends AbstractStorage {
  private readonly _storage: Storage
  constructor(@Inject(DOCUMENT) private readonly _document: Document) {
    super()

    this._storage = this._document.defaultView?.localStorage ?? new StorageFallback()
  }
  public get length(): number {
    return this._storage.length
  }

  public getItem(key: string): string | null {
    return this._storage.getItem(key)
  }

  public setItem(key: string, value: string): void {
    this._storage.setItem(key, value)
  }

  public clear(): void {
    this._storage.clear()
  }

  public key(index: number): string | null {
    return this._storage.key(index)
  }

  public removeItem(key: string): void {
    this._storage.removeItem(key)
  }
}
