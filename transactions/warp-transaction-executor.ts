import {
  BlockhashWithExpiryBlockHeight,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import { TransactionExecutor } from './transaction-executor.interface';
import { logger } from '../helpers';
import axios, { AxiosError } from 'axios';
import bs58 from 'bs58';
import { Currency, CurrencyAmount } from '@raydium-io/raydium-sdk';

export class WarpTransactionExecutor implements TransactionExecutor {
  private readonly warpFeeWallet = new PublicKey('WARPzUMPnycu9eeCZ95rcAUxorqpBqHndfV3ZP5FSyS');

  constructor(private readonly warpFee: string) {}

  public async executeAndConfirm(
    transaction: VersionedTransaction,
    payer: Keypair,
    latestBlockhash: BlockhashWithExpiryBlockHeight,
  ): Promise<{ confirmed: boolean; signature?: string; error?: string }> {
    logger.debug('Executing transaction...');

    try {
      const fee = new CurrencyAmount(Currency.SOL, this.warpFee, false).raw.toNumber();
      const warpFeeMessage = new TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: [
          SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: this.warpFeeWallet,
            lamports: fee,
          }),
        ],
      }).compileToV0Message();

      const warpFeeTx = new VersionedTransaction(warpFeeMessage);
      warpFeeTx.sign([payer]);

      const response = await axios.post<{ confirmed: boolean; signature: string; error?: string }>(
        'https://tx.warp.id/transaction/execute',
        {
          transactions: [bs58.encode(warpFeeTx.serialize()), bs58.encode(transaction.serialize())],
          latestBlockhash,
        },
        {
          timeout: 100000,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        logger.trace({ error: error.response?.data }, 'Failed to execute warp transaction');
      }
    }

    return { confirmed: false };
  }
}

// ASHDLADXZCZC
// 2017-03-04T19:46:37 – v9DUdxokZ0yyrYBbBimO
// 2020-03-27T00:15:22 – aonAUspSP920ssROzil5
// 2021-04-05T14:14:45 – dRPI1zT0Lz6rRTV0fB0F
// 2022-01-21T16:43:11 – EB2txCTxEF2hHLgG3gwG
// 2022-01-28T07:31:02 – Sw7e71llsR5tQZq4IIAZ
// 2022-06-05T22:53:01 – zuMUL2CmjINjtbFGBJOL
// 2022-07-07T17:33:14 – HljHhH3XOYPTqTOxkzG6
// 2022-02-10T08:02:04 – X5cNHmjDOo2o8L8b3X7f
