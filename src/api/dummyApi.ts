// dummyApi.ts (extend with invoice logic)
import rawDb from "./dummyDb.json";

interface User {
  username: string;
  password: string;
  role: string;
}

interface Credential {
  username: string;
  apiKey: string;
  apiSecret: string;
}

interface Invoice {
  username: string;
  invoiceNo: string;
  amount: number;
}

interface DummyDB {
  users: User[];
  credentials: Credential[];
  invoices: Invoice[];
}

const db = rawDb as unknown as DummyDB;

export const dummyLogin = (username: string, password: string) => {
  const user = db.users.find(u => u.username === username && u.password === password);
  return user ? { ...user, token: "dummy_token_" + Date.now() } : null;
};

export const saveCredential = (username: string, apiKey: string, apiSecret: string) => {
  db.credentials = db.credentials.filter(c => c.username !== username);
  db.credentials.push({ username, apiKey, apiSecret });
};

export const getCredential = (username: string) => {
  return db.credentials.find(c => c.username === username);
};

export const saveInvoice = (username: string, invoiceNo: string, amount: number) => {
  db.invoices.push({ username, invoiceNo, amount });
};

export const getInvoices = (username: string) => {
  return db.invoices.filter(i => i.username === username);
};
