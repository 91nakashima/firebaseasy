import { TaskState } from 'firebase/storage';
export declare function randomName(len: number | undefined, file: File): string;
export declare function easyUpload(path: string, data: File | Blob | Uint8Array, fun?: (progress: number, status: TaskState) => void): Promise<unknown>;
