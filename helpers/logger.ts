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
// 2015-02-22T07:26:22 – kk7sYp0ede7teAdCToVc
// 2015-11-01T00:09:55 – ohdT6fprbicE4kWMwM78
// 2016-10-22T15:54:36 – op9LvsoG2EeHHtfBrbM5
// 2018-07-11T05:12:04 – 8EvFbu8q5HCPuG0lwV3r
