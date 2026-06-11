/**
 * Migration v032 — add feature_flags column to app_settings
 *
 * Stores a JSON object of named boolean feature flags (e.g.
 * `{"experimentalBrowser": true}`). Read via `getFeatureFlags()` and toggled
 * one-at-a-time via `updateFeatureFlag(name, enabled)`. Defaults to an empty
 * object so absence of a flag means "off".
 *
 * Wired for the SRIM/DigiBull web build's feature-flags settings surface.
 */
import type { Database } from 'better-sqlite3';
import type { Migration } from './index.js';

export const migration: Migration = {
  version: 32,
  up: (db: Database) => {
    const columns = db.prepare(`PRAGMA table_info(app_settings)`).all() as Array<{
      name: string;
    }>;
    if (!columns.some((col) => col.name === 'feature_flags')) {
      db.prepare(`ALTER TABLE app_settings ADD COLUMN feature_flags TEXT DEFAULT NULL`).run();
    }
  },
  down: (db: Database) => {
    // Forward-only migration; SQLite DROP COLUMN omitted for compatibility.
    void db;
  },
};
