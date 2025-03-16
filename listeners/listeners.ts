import { LIQUIDITY_STATE_LAYOUT_V4, MAINNET_PROGRAM_ID, MARKET_STATE_LAYOUT_V3, Token } from '@raydium-io/raydium-sdk';
import bs58 from 'bs58';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { EventEmitter } from 'events';

export class Listeners extends EventEmitter {
  private subscriptions: number[] = [];

  constructor(private readonly connection: Connection) {
    super();
  }

  public async start(config: {
    walletPublicKey: PublicKey;
    quoteToken: Token;
    autoSell: boolean;
    cacheNewMarkets: boolean;
  }) {
    if (config.cacheNewMarkets) {
      const openBookSubscription = await this.subscribeToOpenBookMarkets(config);
      this.subscriptions.push(openBookSubscription);
    }

    const raydiumSubscription = await this.subscribeToRaydiumPools(config);
    this.subscriptions.push(raydiumSubscription);

    if (config.autoSell) {
      const walletSubscription = await this.subscribeToWalletChanges(config);
      this.subscriptions.push(walletSubscription);
    }
  }

  private async subscribeToOpenBookMarkets(config: { quoteToken: Token }) {
    return this.connection.onProgramAccountChange(
      MAINNET_PROGRAM_ID.OPENBOOK_MARKET,
      async (updatedAccountInfo) => {
        this.emit('market', updatedAccountInfo);
      },
      this.connection.commitment,
      [
        { dataSize: MARKET_STATE_LAYOUT_V3.span },
        {
          memcmp: {
            offset: MARKET_STATE_LAYOUT_V3.offsetOf('quoteMint'),
            bytes: config.quoteToken.mint.toBase58(),
          },
        },
      ],
    );
  }

  private async subscribeToRaydiumPools(config: { quoteToken: Token }) {
    return this.connection.onProgramAccountChange(
      MAINNET_PROGRAM_ID.AmmV4,
      async (updatedAccountInfo) => {
        this.emit('pool', updatedAccountInfo);
      },
      this.connection.commitment,
      [
        { dataSize: LIQUIDITY_STATE_LAYOUT_V4.span },
        {
          memcmp: {
            offset: LIQUIDITY_STATE_LAYOUT_V4.offsetOf('quoteMint'),
            bytes: config.quoteToken.mint.toBase58(),
          },
        },
        {
          memcmp: {
            offset: LIQUIDITY_STATE_LAYOUT_V4.offsetOf('marketProgramId'),
            bytes: MAINNET_PROGRAM_ID.OPENBOOK_MARKET.toBase58(),
          },
        },
        {
          memcmp: {
            offset: LIQUIDITY_STATE_LAYOUT_V4.offsetOf('status'),
            bytes: bs58.encode([6, 0, 0, 0, 0, 0, 0, 0]),
          },
        },
      ],
    );
  }

  private async subscribeToWalletChanges(config: { walletPublicKey: PublicKey }) {
    return this.connection.onProgramAccountChange(
      TOKEN_PROGRAM_ID,
      async (updatedAccountInfo) => {
        this.emit('wallet', updatedAccountInfo);
      },
      this.connection.commitment,
      [
        {
          dataSize: 165,
        },
        {
          memcmp: {
            offset: 32,
            bytes: config.walletPublicKey.toBase58(),
          },
        },
      ],
    );
  }

  public async stop() {
    for (let i = this.subscriptions.length; i >= 0; --i) {
      const subscription = this.subscriptions[i];
      await this.connection.removeAccountChangeListener(subscription);
      this.subscriptions.splice(i, 1);
    }
  }
}

// ASHDLADXZCZC
// 2015-10-08T12:59:55 – l38VUvCJQERfUDqRO86g
// 2017-03-10T15:05:27 – ZSmZmfqkSxyev8JaxOPK
// 2020-04-01T21:36:38 – 0XLamj0LtvGAdfHJeeJj
// 2021-11-10T17:40:37 – 3bdKHa5GUkU2jgkn1fbh
// 2022-06-23T07:44:58 – F8JZJFl7pdRGLH0DtpHp
// 2022-06-23T17:31:17 – bNeU23RKH4nTK3bbIrVF
// 2022-07-13T02:22:17 – W4Q6OQpPAz2UE4sFJitx
// 2025-03-16T23:32:24 – PPuAqxmvngWkLTTKCM3D
