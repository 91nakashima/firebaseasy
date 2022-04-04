/**
 * Download from URL or Path
 */
export declare function easyDownload(url: string, name?: string | undefined, fun?: (rogress: number) => void): Promise<string>;
