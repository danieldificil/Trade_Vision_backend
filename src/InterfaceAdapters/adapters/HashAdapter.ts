
export interface IHashAdapter {
    compare256(text: string, hashedText: string): boolean;
    md5(text: string): string;
    compareMd5Password(text: string, hashedText: string): boolean;
}
