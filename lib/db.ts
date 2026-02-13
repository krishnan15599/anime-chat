import { openDB, IDBPDatabase } from 'idb';

export interface ChatMessage {
    id?: number;
    charSlug: string;
    text: string;
    isAi: boolean;
    timestamp: string;
}

const DB_NAME = 'anime-chat-db';
const STORE_NAME = 'messages';
const DB_VERSION = 1;

export async function initDB(): Promise<IDBPDatabase> {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, {
                    keyPath: 'id',
                    autoIncrement: true,
                });
                store.createIndex('charSlug', 'charSlug');
            }
        },
    });
}

export async function saveMessage(message: ChatMessage) {
    const db = await initDB();
    return db.add(STORE_NAME, message);
}

export async function getMessagesByChar(charSlug: string): Promise<ChatMessage[]> {
    const db = await initDB();
    const index = db.transaction(STORE_NAME).store.index('charSlug');
    return index.getAll(charSlug);
}

export async function clearCharHistory(charSlug: string) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const index = store.index('charSlug');
    const keys = await index.getAllKeys(charSlug);
    for (const key of keys) {
        await store.delete(key);
    }
    await tx.done;
}
export async function getLastMessage(charSlug: string): Promise<ChatMessage | null> {
    const db = await initDB();
    const index = db.transaction(STORE_NAME).store.index('charSlug');
    const messages = await index.getAll(charSlug);
    return messages.length > 0 ? messages[messages.length - 1] : null;
}
export async function getAllActiveSlugs(): Promise<string[]> {
    const db = await initDB();
    const allMessages = await db.getAll(STORE_NAME);
    const slugs = new Set(allMessages.map((m: any) => m.charSlug));
    return Array.from(slugs);
}
