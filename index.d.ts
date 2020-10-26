declare module 'memo-moo' {
    export default function memoMoo(
        callback: (...args: any[]) => any,
        dependencies: any[],
        options?: {
            id?: string;
            expiresIn?: number;
        }
    ): any;

    export function setGCTimeout(ts: number): void;

    export function getObjectID(input: any): number;
}
