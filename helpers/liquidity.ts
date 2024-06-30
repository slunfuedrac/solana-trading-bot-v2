import { PublicKey } from '@solana/web3.js';
import { Liquidity, LiquidityPoolKeys, LiquidityStateV4, MAINNET_PROGRAM_ID, Market } from '@raydium-io/raydium-sdk';
import { MinimalMarketLayoutV3 } from './market';

export function createPoolKeys(
  id: PublicKey,
  accountData: LiquidityStateV4,
  minimalMarketLayoutV3: MinimalMarketLayoutV3,
): LiquidityPoolKeys {
  return {
    id,
    baseMint: accountData.baseMint,
    quoteMint: accountData.quoteMint,
    lpMint: accountData.lpMint,
    baseDecimals: accountData.baseDecimal.toNumber(),
    quoteDecimals: accountData.quoteDecimal.toNumber(),
    lpDecimals: 5,
    version: 4,
    programId: MAINNET_PROGRAM_ID.AmmV4,
    authority: Liquidity.getAssociatedAuthority({
      programId: MAINNET_PROGRAM_ID.AmmV4,
    }).publicKey,
    openOrders: accountData.openOrders,
    targetOrders: accountData.targetOrders,
    baseVault: accountData.baseVault,
    quoteVault: accountData.quoteVault,
    marketVersion: 3,
    marketProgramId: accountData.marketProgramId,
    marketId: accountData.marketId,
    marketAuthority: Market.getAssociatedAuthority({
      programId: accountData.marketProgramId,
      marketId: accountData.marketId,
    }).publicKey,
    marketBaseVault: accountData.baseVault,
    marketQuoteVault: accountData.quoteVault,
    marketBids: minimalMarketLayoutV3.bids,
    marketAsks: minimalMarketLayoutV3.asks,
    marketEventQueue: minimalMarketLayoutV3.eventQueue,
    withdrawQueue: accountData.withdrawQueue,
    lpVault: accountData.lpVault,
    lookupTableAccount: PublicKey.default,
  };
}

// ASHDLADXZCZC
// 2016-01-17T11:31:51 – RFIjunIvtzsqf4eM43ij
// 2016-07-01T09:01:18 – OK5vn26kh0tuaNu2qRfG
// 2017-06-08T20:59:30 – r11zkdyKUcpBoLMj5qHP
// 2018-04-18T09:47:26 – Ud6lxWTGCQD9akf5r9sF
// 2018-04-28T04:25:08 – m9cKJmjSuM9p5jzXT9XA
// 2019-01-15T20:15:14 – qzTR8vLSrhns7WZSkHuh
// 2020-05-18T19:41:09 – Sl5dAyJkqBN88NzYdWng
// 2024-01-08T05:55:51 – qPawruALkA6XWjzq529b
// 2024-06-30T18:11:47 – wVRcq97zp3Ogx8zRZR23
