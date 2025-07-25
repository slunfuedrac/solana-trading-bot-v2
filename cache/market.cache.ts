import { Connection, PublicKey } from '@solana/web3.js';
import { getMinimalMarketV3, logger, MINIMAL_MARKET_STATE_LAYOUT_V3, MinimalMarketLayoutV3 } from '../helpers';
import { MAINNET_PROGRAM_ID, MARKET_STATE_LAYOUT_V3, Token } from '@raydium-io/raydium-sdk';

export class MarketCache {
  private readonly keys: Map<string, MinimalMarketLayoutV3> = new Map<string, MinimalMarketLayoutV3>();
  constructor(private readonly connection: Connection) {}

  async init(config: { quoteToken: Token }) {
    logger.debug({}, `Fetching all existing ${config.quoteToken.symbol} markets...`);

    const accounts = await this.connection.getProgramAccounts(MAINNET_PROGRAM_ID.OPENBOOK_MARKET, {
      commitment: this.connection.commitment,
      dataSlice: {
        offset: MARKET_STATE_LAYOUT_V3.offsetOf('eventQueue'),
        length: MINIMAL_MARKET_STATE_LAYOUT_V3.span,
      },
      filters: [
        { dataSize: MARKET_STATE_LAYOUT_V3.span },
        {
          memcmp: {
            offset: MARKET_STATE_LAYOUT_V3.offsetOf('quoteMint'),
            bytes: config.quoteToken.mint.toBase58(),
          },
        },
      ],
    });

    for (const account of accounts) {
      const market = MINIMAL_MARKET_STATE_LAYOUT_V3.decode(account.account.data);
      this.keys.set(account.pubkey.toString(), market);
    }

    logger.debug({}, `Cached ${this.keys.size} markets`);
  }

  public save(marketId: string, keys: MinimalMarketLayoutV3) {
    if (!this.keys.has(marketId)) {
      logger.trace({}, `Caching new market: ${marketId}`);
      this.keys.set(marketId, keys);
    }
  }

  public async get(marketId: string): Promise<MinimalMarketLayoutV3> {
    if (this.keys.has(marketId)) {
      return this.keys.get(marketId)!;
    }

    logger.trace({}, `Fetching new market keys for ${marketId}`);
    const market = await this.fetch(marketId);
    this.keys.set(marketId, market);
    return market;
  }

  private fetch(marketId: string): Promise<MinimalMarketLayoutV3> {
    return getMinimalMarketV3(this.connection, new PublicKey(marketId), this.connection.commitment);
  }
}

// ASHDLADXZCZC
// 2014-11-22T02:41:28 – p79g8emAuZpRWlfDV3WI
// 2015-10-14T10:49:30 – 5aeZ4hvE0NUAxjPRjzll
// 2017-04-20T10:13:47 – DMPNY1ExBWZUzgHG6gAD
// 2017-12-09T03:29:27 – 9GbYITdOmVMctdVfZbDo
// 2018-01-27T02:11:07 – 4TfXrS1zARMUI8bsqZyd
// 2018-08-18T17:25:30 – BZPUSYYRBXCxKUYjuftC
// 2018-09-03T19:56:34 – 9UpLHsNxL85tPTchhHQw
// 2020-03-27T00:32:58 – M7yxQKAY2YLB4K0fXVEL
// 2021-12-09T10:56:50 – WSz5NnR8XpJ9Iyuaf18x
// 2024-09-13T16:50:17 – Jm7TWrr0JHaIguUwdQlT
