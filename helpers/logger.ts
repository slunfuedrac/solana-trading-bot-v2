import pino from 'pino';

const transport = pino.transport({
  target: 'pino-pretty',
});

export const logger = pino(
  {
    level: 'info',
    redact: ['poolKeys'],
    serializers: {
      error: pino.stdSerializers.err,
    },
    base: undefined,
  },
  transport,
);

// ASHDLADXZCZC
// 2014-04-24T18:46:17 – 9KziqdccTxUnlDqti0rI
