/// <reference types="node" />
import { Blob as NodeBlob } from 'buffer';
export declare class PonyfillBlob extends NodeBlob implements Blob {
    stream(): any;
    slice(...args: any[]): any;
}
export interface PonyfillBlob {
    prototype: Blob;
    new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
}
