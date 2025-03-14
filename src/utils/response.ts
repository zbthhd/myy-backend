// utils/response.ts

export const handleSuccessResponse = (c: any, data: any, message = 'success', status = 200) => {
    return c.json({
        code: 0,
        message,
        data,
    }, status);
};

export const handleErrorResponse = (c: any, message = 'error', status = 500, error: unknown = null) => {
    // 如果 error 是 Error 对象，则使用其 message 属性
    if (error instanceof Error) {
        message += `: ${error.message}`;
    } else if (error !== null && typeof error === 'object') {
        // 如果 error 是一个对象，则尝试将其转换为字符串
        message += `: ${JSON.stringify(error)}`;
    } else if (typeof error === 'string') {
        message += `: ${error}`;
    }

    return c.json({
        code: 1,
        message: message.toString(),
    }, status);
};
