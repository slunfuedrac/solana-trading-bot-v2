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
