import { FirebaseStorage, TaskState } from 'firebase/storage';
/**
 * create random name
 */
export declare function randomName(len?: number, file?: File): string;
/**
 * upload file
 */
export declare function easyUpload(storage: FirebaseStorage, path: string, data: File | Blob | Uint8Array | [Uint8Array | Blob | File, {
    contentType: string;
}], fun?: (progress: number, status: TaskState) => string): Promise<string>;
