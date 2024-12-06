// utils/response.ts

export const handleSuccessResponse = (c, data = null, message = 'success', status = 200) => {
    return c.json({
      code: 0,
      message,
      data,
    }, status);
  };
  
  export const handleErrorResponse = (c, message = 'error', status = 500, error = null) => {
    return c.json({
      code: 1,
      message,
      data: error || null,
    }, status);
  };