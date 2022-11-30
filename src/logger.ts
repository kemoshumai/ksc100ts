import pino from 'pino';

export const logger = pino({
    level: 'trace',
    prettyPrint: true,
    prettifier: "pino-pretty"
})