// utils/response.ts

export const handleSuccessResponse = (c: any, data: any, message = 'success', status = 200) => {
    return c.json({
        code: 0,
        message,
        data,
    }, status);
};

export const handleErrorResponse = (c: any, message = 'error', status = 500, error: unknown = null) => {
    return c.json({
        code: 1,
        message,
        data: error || null,
    }, status);
};
