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

interface DatabaseSchema {
  rsvps: RSVPRecord[];
}

const filePath = join(process.cwd(), "data", "rsvp.json");
fs.mkdirSync(dirname(filePath), { recursive: true });

const adapter = new JSONFileSync<DatabaseSchema>(filePath);
const db = new LowSync<DatabaseSchema>(adapter, { rsvps: [] });
db.read();
if (!db.data) {
  db.data = { rsvps: [] };
  db.write();
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
