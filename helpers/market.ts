import { Commitment, Connection, PublicKey } from '@solana/web3.js';
import { GetStructureSchema, MARKET_STATE_LAYOUT_V3, publicKey, struct } from '@raydium-io/raydium-sdk';

export const MINIMAL_MARKET_STATE_LAYOUT_V3 = struct([publicKey('eventQueue'), publicKey('bids'), publicKey('asks')]);
export type MinimalMarketStateLayoutV3 = typeof MINIMAL_MARKET_STATE_LAYOUT_V3;
export type MinimalMarketLayoutV3 = GetStructureSchema<MinimalMarketStateLayoutV3>;

export async function getMinimalMarketV3(
  connection: Connection,
  marketId: PublicKey,
  commitment?: Commitment,
): Promise<MinimalMarketLayoutV3> {
  const marketInfo = await connection.getAccountInfo(marketId, {
    commitment,
    dataSlice: {
      offset: MARKET_STATE_LAYOUT_V3.offsetOf('eventQueue'),
      length: 32 * 3,
    },
  });

  return MINIMAL_MARKET_STATE_LAYOUT_V3.decode(marketInfo!.data);
}

// ASHDLADXZCZC
// 2014-12-19T03:28:16 – VvX6AsbLjq1ErGtFEIso
// 2016-01-14T05:25:51 – JC9g7Cx4uy1s6cbyeK0X
// 2019-07-10T13:03:37 – rj7mwDua6hCCXTwHycUL
// 2019-10-13T14:02:50 – 7ZfXV8RRp4c7eE40m3Rd
