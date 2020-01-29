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
// 2019-10-30T04:46:33 – qQReOsASQ9ZbPEN4bsbE
// 2020-01-13T04:33:03 – SnEQHyCADCtfskPAczmN
// 2020-01-29T14:54:42 – oIrbHXn2jYT14iPIotiF
