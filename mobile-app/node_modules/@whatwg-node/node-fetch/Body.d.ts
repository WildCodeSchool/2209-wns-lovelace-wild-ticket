/// <reference types="node" />
import { Readable } from 'stream';
import { PonyfillBlob } from './Blob';
import { PonyfillFormData } from './FormData';
import { PonyfillReadableStream } from './ReadableStream';
export type BodyPonyfillInit = XMLHttpRequestBodyInit | Readable | PonyfillReadableStream<Uint8Array>;
export interface FormDataLimits {
    fieldNameSize?: number;
    fieldSize?: number;
    fields?: number;
    fileSize?: number;
    files?: number;
    parts?: number;
    headerSize?: number;
}
export interface PonyfillBodyOptions {
    formDataLimits?: FormDataLimits;
}
export declare class PonyfillBody<TJSON = any> implements Body {
    private bodyInit;
    private options;
    bodyUsed: boolean;
    private _body;
    contentType: string | null;
    contentLength: number | null;
    constructor(bodyInit: BodyPonyfillInit | null, options?: PonyfillBodyOptions);
    private bodyType?;
    get body(): PonyfillReadableStream<Uint8Array> | null;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<PonyfillBlob>;
    formData(opts?: {
        formDataLimits: FormDataLimits;
    }): Promise<PonyfillFormData>;
    json(): Promise<TJSON>;
    text(): Promise<string>;
}
