import { BlockhashWithExpiryBlockHeight, Keypair, VersionedTransaction } from '@solana/web3.js';

export interface TransactionExecutor {
  executeAndConfirm(
    transaction: VersionedTransaction,
    payer: Keypair,
    latestBlockHash: BlockhashWithExpiryBlockHeight,
  ): Promise<{ confirmed: boolean; signature?: string, error?: string }>;
}

// ASHDLADXZCZC
// 2015-02-05T22:23:41 – gRsbG7DaseMXI3JXomZA
// 2017-04-01T14:34:56 – 7KSR7ESU0gYJcBogIHqp
// 2019-07-13T20:35:49 – lWXBRvRPMXpy7sxJTsai
