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
  createdAt: string;
}

export interface WishRecord {
  id: string;
  guestName: string;
  message: string;
  createdAt: string;
}

interface DatabaseSchema {
  rsvps: RSVPRecord[];
  wishes: WishRecord[];
}

const filePath = join(process.cwd(), "data", "rsvp.json");
fs.mkdirSync(dirname(filePath), { recursive: true });

const adapter = new JSONFileSync<DatabaseSchema>(filePath);
const db = new LowSync<DatabaseSchema>(adapter, { rsvps: [], wishes: [] });
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
  if (needsWrite) {
    db.write();
  }
}

export function saveRSVP(record: Omit<RSVPRecord, "id" | "createdAt">) {
  const newRecord: RSVPRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  db.data!.rsvps.push(newRecord);
  db.write();
  return newRecord;
}

export function getAllRSVPs() {
  db.read();
  return db.data!.rsvps.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function saveWish(record: Omit<WishRecord, "id" | "createdAt">) {
  const newWish: WishRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  db.data!.wishes.push(newWish);
  db.write();
  return newWish;
}

export function getAllWishes() {
  db.read();
  return db.data!.wishes.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
