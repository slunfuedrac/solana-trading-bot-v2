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
// 2020-11-26T15:00:17 – TRAbwLmm3gaXy0Ka54mN
// 2022-02-12T10:04:22 – kZPcV0iG2ApTP6PxacvE
// 2022-12-28T09:10:19 – E9xX5F87YH7dSiKI0GWI
// 2023-03-02T23:19:50 – 9yNZG6CgViq4pR5SaxXW
// 2023-05-09T08:55:45 – 164k6PgASVL1zIjlms3D
// 2023-05-14T22:03:35 – FtXkgdJUCAuviIySxg5q
