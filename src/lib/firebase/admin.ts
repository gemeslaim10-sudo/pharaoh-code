import 'server-only';
import { cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';
import path from 'path';

// Protect against multiple initializations in development
if (!getApps().length) {
    let serviceAccount: ServiceAccount | null = null;

    // 1. Try reading the full JSON string from FIREBASE_SERVICE_ACCOUNT environment variable
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        try {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) as ServiceAccount;
        } catch (e) {
            console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT env var:", e);
        }
    }

    // 2. Try individual environment variables if the full JSON isn't provided
    if (!serviceAccount && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
        serviceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            // Handle escaped newlines in Vercel environment variables
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        };
    }

    // 3. Fallback to reading the local JSON file using fs (to prevent Next.js bundler compile errors)
    if (!serviceAccount) {
        const filePath = path.resolve(process.cwd(), 'pharaoh-code-project-firebase-adminsdk-fbsvc-e3697472df.json');
        if (fs.existsSync(filePath)) {
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                serviceAccount = JSON.parse(fileContent);
            } catch (e) {
                console.error("Failed to read/parse local firebase admin JSON credentials:", e);
            }
        }
    }

    if (serviceAccount && serviceAccount.privateKey) {
        serviceAccount = { ...serviceAccount, privateKey: serviceAccount.privateKey.replace(/\\n/g, '\n') };
    }

    if (serviceAccount) {
        try {
            initializeApp({
                credential: cert(serviceAccount),
            });
        } catch (e) {
            console.error("Failed to initialize Firebase Admin with service account:", e);
        }
    } else {
        console.warn("No Firebase Admin service account key found. Initializing with default app credentials.");
        try {
            initializeApp();
        } catch (e) {
            console.error("Failed to initialize Firebase Admin with default credentials:", e);
        }
    }
}

const firestore = Object.assign(getFirestore, { FieldValue });
const admin = { auth: getAuth, firestore };
const db = getFirestore();

export function serializeData(val: any): any {
    if (val === null || val === undefined) return val;
    if (typeof val.toDate === 'function') {
        return val.toDate().toISOString();
    }
    if (val instanceof Date) {
        return val.toISOString();
    }
    if (Array.isArray(val)) {
        return val.map(serializeData);
    }
    if (typeof val === 'object' && val.constructor === Object) {
        const res: any = {};
        for (const key of Object.keys(val)) {
            res[key] = serializeData(val[key]);
        }
        return res;
    }
    return val;
}

export { admin, db };
