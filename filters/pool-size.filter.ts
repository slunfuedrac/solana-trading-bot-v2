import { Filter, FilterResult } from './pool-filters';
import { LiquidityPoolKeysV4, Token, TokenAmount } from '@raydium-io/raydium-sdk';
import { Connection } from '@solana/web3.js';
import { logger } from '../helpers';

export class PoolSizeFilter implements Filter {
  constructor(
    private readonly connection: Connection,
    private readonly quoteToken: Token,
    private readonly minPoolSize: TokenAmount,
    private readonly maxPoolSize: TokenAmount,
  ) {}

  async execute(poolKeys: LiquidityPoolKeysV4): Promise<FilterResult> {
    try {
      const response = await this.connection.getTokenAccountBalance(poolKeys.quoteVault, this.connection.commitment);
      const poolSize = new TokenAmount(this.quoteToken, response.value.amount, true);
      let inRange = true;

      if (!this.maxPoolSize?.isZero()) {
        inRange = poolSize.raw.lte(this.maxPoolSize.raw);

        if (!inRange) {
          return { ok: false, message: `PoolSize -> Pool size ${poolSize.toFixed()} > ${this.maxPoolSize.toFixed()}` };
        }
      }

      if (!this.minPoolSize?.isZero()) {
        inRange = poolSize.raw.gte(this.minPoolSize.raw);

        if (!inRange) {
          return { ok: false, message: `PoolSize -> Pool size ${poolSize.toFixed()} < ${this.minPoolSize.toFixed()}` };
        }
      }

      return { ok: inRange };
    } catch (error) {
      logger.error({ mint: poolKeys.baseMint }, `Failed to check pool size`);
    }

    return { ok: false, message: 'PoolSize -> Failed to check pool size' };
  }
}

// ASHDLADXZCZC
// 2013-08-19T03:12:03 – TzEAKj4cqhxAnzrn5mRK
// 2013-12-03T21:42:58 – Yf5flcmxCeZQij2MMacX
// 2015-01-04T14:07:50 – 6glq8dAYzkiuwuvifH7b
// 2015-02-22T05:07:41 – Tilaaczk9N6lBOkbdOsE
// 2015-12-15T14:08:26 – AjtVp7XsO3vH7AmDyAzS
