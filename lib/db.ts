import fs from "fs";
import { dirname, join } from "path";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

export type RSVPStatus = "attending" | "not_attending";

export interface RSVPRecord {
  id: string;
  name: string;
  status: RSVPStatus;
  person: number;
  created_at: string;
}

export interface WishRecord {
  id: string;
  guestName: string;
  message: string;
  created_at: string;
}

interface DatabaseSchema {
  rsvps: RSVPRecord[];
  wishes: WishRecord[];
}

let db: LowSync<DatabaseSchema> | { data: DatabaseSchema; read: () => void; write: () => void };

try {
  const filePath = join(process.cwd(), "data", "rsvp.json");
  fs.mkdirSync(dirname(filePath), { recursive: true });

  const adapter = new JSONFileSync<DatabaseSchema>(filePath);
  db = new LowSync<DatabaseSchema>(adapter, { rsvps: [], wishes: [] });
  db.read();
  if (!db.data) {
    db.data = { rsvps: [], wishes: [] };
    db.write();
  } else {
    let needsWrite = false;
    if (!Array.isArray(db.data.rsvps)) {
      db.data.rsvps = [];
      needsWrite = true;
    }
    if (!Array.isArray(db.data.wishes)) {
      db.data.wishes = [];
      needsWrite = true;
    }
    if (needsWrite) db.write();
  }
} catch (err) {
  // Fallback to in-memory DB when filesystem is not writable (serverless hosts)
  // This prevents runtime crashes; note: data won't persist across restarts.
  // eslint-disable-next-line no-console
  console.warn("lowdb file storage unavailable, using in-memory fallback:", err && (err as Error).message);
  db = {
    data: { rsvps: [], wishes: [] },
    read: () => {},
    write: () => {},
  };
}

export function saveRSVP(record: Omit<RSVPRecord, "id" | "created_at">) {
  const newRecord: RSVPRecord = {
    ...record,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };

  db.data!.rsvps.push(newRecord);
  try {
    db.write();
  } catch (e) {
    // ignore write errors for in-memory fallback
  }
  return newRecord;
}

export function getAllRSVPs() {
  db.read();
  return db.data!.rsvps.slice().sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export function saveWish(record: Omit<WishRecord, "id" | "created_at">) {
  const newWish: WishRecord = {
    ...record,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };

  db.data!.wishes.push(newWish);
  db.write();
  return newWish;
}

export function getAllWishes() {
  db.read();
  return db.data!.wishes.slice().sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}
