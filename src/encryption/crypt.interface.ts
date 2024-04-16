interface Crypt{
    hash(rawPassword: string): string;
    compare(encryptedPassword: string, password: string): boolean;
}