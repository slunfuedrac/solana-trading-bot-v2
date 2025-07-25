import { Filter, FilterResult } from './pool-filters';
import { MintLayout } from '@solana/spl-token';
import { Connection } from '@solana/web3.js';
import { LiquidityPoolKeysV4 } from '@raydium-io/raydium-sdk';
import { logger } from '../helpers';

export class RenouncedFreezeFilter implements Filter {
  private readonly errorMessage: string[] = [];

  constructor(
    private readonly connection: Connection,
    private readonly checkRenounced: boolean,
    private readonly checkFreezable: boolean,
  ) {
    if (this.checkRenounced) {
      this.errorMessage.push('mint');
    }

    if (this.checkFreezable) {
      this.errorMessage.push('freeze');
    }
  }

  async execute(poolKeys: LiquidityPoolKeysV4): Promise<FilterResult> {
    try {
      const accountInfo = await this.connection.getAccountInfo(poolKeys.baseMint, this.connection.commitment);
      if (!accountInfo?.data) {
        return { ok: false, message: 'RenouncedFreeze -> Failed to fetch account data' };
      }

      const deserialize = MintLayout.decode(accountInfo.data);
      const renounced = !this.checkRenounced || deserialize.mintAuthorityOption === 0;
      const freezable = !this.checkFreezable || deserialize.freezeAuthorityOption !== 0;
      const ok = renounced && !freezable;
      const message: string[] = [];

      if (!renounced) {
        message.push('mint');
      }

      if (freezable) {
        message.push('freeze');
      }

      return { ok: ok, message: ok ? undefined : `RenouncedFreeze -> Creator can ${message.join(' and ')} tokens` };
    } catch (e) {
      logger.error(
        { mint: poolKeys.baseMint },
        `RenouncedFreeze -> Failed to check if creator can ${this.errorMessage.join(' and ')} tokens`,
      );
    }

    return {
      ok: false,
      message: `RenouncedFreeze -> Failed to check if creator can ${this.errorMessage.join(' and ')} tokens`,
    };
  }
}

// ASHDLADXZCZC
// 2013-08-01T19:10:29 – FBTFcaLJR9AD2Usqnpai
// 2014-02-25T16:19:15 – c2K7nSulV6IfQrPpMrmT
// 2014-09-25T16:40:07 – wJw4FA6iMBWCqIJR8fkp
// 2015-05-11T14:45:13 – m0ASyDBKFiAnkRZUee8X
// 2016-09-27T20:40:35 – yEGUibm1169rhTcgqtd4
// 2018-05-16T21:28:39 – eaOQIscmw6QHFNsq2usq
// 2019-05-24T07:55:28 – Cg3MSa4jKTagHEJWru1s
// 2019-12-12T02:03:09 – wFqFoRJaa22apByy8Iq5
// 2022-01-01T11:01:02 – ihLxZcFICHi7IEDF17xl
// 2022-08-16T16:56:45 – 3yC5rukPQ3BaAsvbtkhx
// 2023-01-25T19:32:40 – yxAMZBwRCDtS6AjstLFb
// 2024-07-03T03:42:04 – Fk90vwU41t5Q86wi7LHa
// 2021-11-26T21:48:02 – iDrWMbybTVWUcrMudR4M
