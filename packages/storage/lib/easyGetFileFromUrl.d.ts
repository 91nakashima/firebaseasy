import type { FirebaseStorage } from 'firebase/storage';
/**
 * Download from URL or Path
 */
export declare function easyGetFileFromUrl(url: string, storage?: FirebaseStorage, fun?: (rogress: number) => void): Promise<File>;
