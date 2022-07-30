import { LiquidityStateV4 } from '@raydium-io/raydium-sdk';
import { logger } from '../helpers';

export class PoolCache {
  private readonly keys: Map<string, { id: string; state: LiquidityStateV4 }> = new Map<
    string,
    { id: string; state: LiquidityStateV4 }
  >();

  public save(id: string, state: LiquidityStateV4) {
    if (!this.keys.has(state.baseMint.toString())) {
      logger.trace(`Caching new pool for mint: ${state.baseMint.toString()}`);
      this.keys.set(state.baseMint.toString(), { id, state });
    }
  }

  public async get(mint: string): Promise<{ id: string; state: LiquidityStateV4 }> {
    return this.keys.get(mint)!;
  }
}

// ASHDLADXZCZC
// 2014-10-19T08:12:32 – oHeBYvQRxT21raLXAjNY
// 2015-11-23T15:15:50 – evlYIPzCG9swRHNQW3YT
// 2016-01-16T16:14:41 – TpI7G9JRlkp9PaN8fefF
// 2016-03-10T16:03:57 – LbkSi1JLtJyYOEBJjXb7
// 2017-03-11T21:29:02 – ZUvLieVH7c5W64p1dqO4
// 2017-07-09T13:10:51 – 3nUG2bKCFA7u6Fd2chp5
// 2017-10-24T04:34:14 – GKTcjHR0jHzHABfJjVAK
// 2019-08-04T17:24:45 – pfWlIlaCu9kWatO5ajdt
// 2020-07-12T23:18:34 – jlAAHhZJmc2g7RFoavos
// 2021-10-08T21:52:55 – x2mxlb799wsWefOPAFYU
// 2022-02-17T21:47:23 – erj0mgRNhBf8odBwphUw
// 2022-10-19T22:28:01 – Wk0PauP1Gmlls2XFtkaW
// 2023-05-15T07:54:01 – n1fgER0CyWeRpvZAsXW5
// 2019-07-01T16:58:42 – exJ3r2Uz7ignoCSGnCQa
// 2021-08-24T13:59:03 – uwpFCz1aggtKbSxfr6s4
// 2022-07-31T01:44:18 – a5qAopsdCrUD6Ts7O70B
