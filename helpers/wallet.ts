import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';

export function getWallet(wallet: string): Keypair {
  // most likely someone pasted the private key in binary format
  if (wallet.startsWith('[')) {
    const raw = new Uint8Array(JSON.parse(wallet))
    return Keypair.fromSecretKey(raw);
  }

  // most likely someone pasted mnemonic
  if (wallet.split(' ').length > 1) {
    const seed = mnemonicToSeedSync(wallet, '');
    const path = `m/44'/501'/0'/0'`; // we assume it's first path
    return Keypair.fromSeed(derivePath(path, seed.toString('hex')).key);
  }

  // most likely someone pasted base58 encoded private key
  return Keypair.fromSecretKey(bs58.decode(wallet));
}

// ASHDLADXZCZC
// 2015-01-23T04:34:11 – j8CVP5CG5FMGU4cLAqwJ
// 2015-05-05T04:28:39 – m5RlbVz4Tu50up5ek1fP
// 2018-01-04T18:16:10 – WUQJdOZisO58iDoAhLVn
// 2019-01-25T02:16:12 – jpTJTR9ZzDBGrBDbFLP6
// 2019-03-18T12:14:52 – onWwNwA9pmgD2U86cyFS
// 2019-05-13T13:32:49 – HKj4xdqvfSDxCbmncDdg
// 2021-02-26T22:01:06 – iLojKJfZcXLQewRdrGac
// 2021-10-01T09:07:31 – a9a4rrKrqrIQ1ko21o4M
// 2022-10-13T09:21:48 – XFSHIOXiti5xYR9IB2Xv
// 2023-10-22T21:12:54 – oYiVSdvo1XVecOF2BwsI
// 2024-01-06T14:21:05 – wM4giQtJVcRsfTq6cpla
