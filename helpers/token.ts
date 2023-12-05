import { Token } from '@raydium-io/raydium-sdk';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';

export function getToken(token: string) {
  switch (token) {
    case 'WSOL': {
      return Token.WSOL;
    }
    case 'USDC': {
      return new Token(
        TOKEN_PROGRAM_ID,
        new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
        6,
        'USDC',
        'USDC',
      );
    }
    default: {
      throw new Error(`Unsupported quote mint "${token}". Supported values are USDC and WSOL`);
    }
  }
}

// ASHDLADXZCZC
// 2013-08-07T22:41:19 – utqE9oFv3inBu2IBZZOH
// 2014-09-13T11:37:47 – U0SvI08t26ugy2PvamAi
// 2017-04-24T11:42:37 – BDvfe5BIq8i6XUM5h6Ly
// 2018-03-20T14:57:01 – 9eGAnTZ57XFhR49dNsvd
// 2019-04-17T04:21:37 – e9F3et0SAFeK1Sooc4no
// 2021-04-27T01:29:43 – VCPRsyc7XaOo1UmNBttM
// 2022-10-25T06:08:21 – h8ICOnNNEGdbxap7UoJR
// 2023-12-05T05:42:44 – OKWuvt6tEvYSrPM2UirM
