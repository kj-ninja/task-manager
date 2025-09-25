// Interview Question #53: Environment variable security and Firebase configuration
import { firebaseConfig } from "@config/env";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase app with environment-validated configuration
const app = initializeApp(firebaseConfig);

// Interview Question #89: Firebase service initialization patterns
// Initialize Firebase services - these are singletons that can be imported anywhere
export const auth = getAuth(app);
export const db = getFirestore(app);

// Conditional analytics initialization - only when measurement ID is present
export const analytics = firebaseConfig.measurementId ? getAnalytics(app) : null;

export default app;
