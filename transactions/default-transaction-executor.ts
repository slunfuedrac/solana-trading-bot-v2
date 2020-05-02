import {
  BlockhashWithExpiryBlockHeight,
  Connection,
  Keypair,
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js';
import { TransactionExecutor } from './transaction-executor.interface';
import { logger } from '../helpers';

export class DefaultTransactionExecutor implements TransactionExecutor {
  constructor(private readonly connection: Connection) {}

  public async executeAndConfirm(
    transaction: VersionedTransaction,
    payer: Keypair,
    latestBlockhash: BlockhashWithExpiryBlockHeight,
  ): Promise<{ confirmed: boolean; signature?: string, error?: string }> {
    logger.debug('Executing transaction...');
    const signature = await this.execute(transaction);

    logger.debug({ signature }, 'Confirming transaction...');
    return this.confirm(signature, latestBlockhash);
  }

  private async execute(transaction: Transaction | VersionedTransaction) {
    return this.connection.sendRawTransaction(transaction.serialize(), {
      preflightCommitment: this.connection.commitment,
    });
  }

  private async confirm(signature: string, latestBlockhash: BlockhashWithExpiryBlockHeight) {
    const confirmation = await this.connection.confirmTransaction(
      {
        signature,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        blockhash: latestBlockhash.blockhash,
      },
      this.connection.commitment,
    );

    return { confirmed: !confirmation.value.err, signature };
  }
}

// ASHDLADXZCZC
// 2017-09-13T16:25:14 – QTzxsbfHDqNphGgUq2jT
// 2017-12-21T01:09:06 – vYhGvCuZgrynLXb5yJ27
// 2018-05-09T16:44:29 – Q3GMa3BFxZTSxEittIuN
// 2019-11-06T15:27:21 – EWfkB8hJWNYRGqxQO7JS
// 2020-05-02T04:15:42 – ijenOgG3YwRpDEluwHRq
