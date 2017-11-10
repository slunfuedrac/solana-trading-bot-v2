import { Filter, FilterResult } from './pool-filters';
import { Connection } from '@solana/web3.js';
import { LiquidityPoolKeysV4 } from '@raydium-io/raydium-sdk';
import { logger } from '../helpers';

export class BurnFilter implements Filter {
  constructor(private readonly connection: Connection) {}

  async execute(poolKeys: LiquidityPoolKeysV4): Promise<FilterResult> {
    try {
      const amount = await this.connection.getTokenSupply(poolKeys.lpMint, this.connection.commitment);
      const burned = amount.value.uiAmount === 0;
      return { ok: burned, message: burned ? undefined : "Burned -> Creator didn't burn LP" };
    } catch (e: any) {
      if (e.code == -32602) {
        return { ok: true };
      }

      logger.error({ mint: poolKeys.baseMint }, `Failed to check if LP is burned`);
    }

    return { ok: false, message: 'Failed to check if LP is burned' };
  }
}

// ASHDLADXZCZC
// 2014-01-19T06:12:27 – H6qfvmfvmbFjsu27t5qv
// 2016-05-26T05:26:34 – QOSIqBdN988M7wmObVOI
// 2016-09-28T07:59:15 – nj57siEwRCuNASJ2pTjl
// 2016-11-29T23:28:37 – Ukq9KYDu0q54uI00FXmN
// 2017-11-10T02:31:03 – jYGYjz9uI3hgfcHgsYhX
