import pino from 'pino';

export const logger = pino({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    transport: process.env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:standard'
            }
        }
        : undefined,
});

// 可以导出创建子 logger 的工具函数
export const createModuleLogger = (module: string) => {
    return logger.child({ module });
};
