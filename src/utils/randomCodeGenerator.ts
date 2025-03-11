// src/utils/randomCodeGenerator.ts

import * as crypto from 'crypto';

export function generateSecureRandomCode(length: number): string {
    const bytes = crypto.randomBytes(length);
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        // 将字节转换为整数，并映射到字符集中的索引
        result += chars[bytes[i] % chars.length];
    }
    return result;
}