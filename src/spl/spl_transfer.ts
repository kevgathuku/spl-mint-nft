import { address, createClient } from "@solana/kit";
import { solanaDevnetRpc } from "@solana/kit-plugin-rpc";
import { signerFromFile } from "@solana/kit-plugin-signer";
import {
  findAssociatedTokenPda,
  TOKEN_PROGRAM_ADDRESS,
  tokenProgram,
} from "@solana-program/token";

// Path to wallet keypair file
const walletPath = "./devnet-wallet.json";

//paste your mint address got from spl_init.ts
const mint = address("8nVxM3y8XtyJvMgu7LFy4tR2PQQMedA5PgazA6dRbFNS");

//paste the address of the recipient
const to = address("9EUd4VNcjMAysd7zQk3Q1a4tb28BYndLNBAQDiYnHJ64");

const BASE_UNITS_PER_TOKEN = 1_000_000n;

(async () => {
  try {
    const client = await createClient()
      .use(signerFromFile(walletPath))
      .use(solanaDevnetRpc({ transactionConfig: { version: 1 } }))
      .use(tokenProgram());

    const [fromAta] = await findAssociatedTokenPda({
      mint,
      owner: client.payer.address,
      tokenProgram: TOKEN_PROGRAM_ADDRESS,
    });
    console.log(`Your fromAta is : ${fromAta}`);

    // Derive ATA address
    const [toAta] = await findAssociatedTokenPda({
      mint,
      owner: to,
      tokenProgram: TOKEN_PROGRAM_ADDRESS,
    });
    console.log(`Your toAta is : ${toAta}`);

    const { context } = await client.token.instructions
      .transferToATA({
        mint,
        authority: client.payer,
        recipient: to,
        amount: 1n * BASE_UNITS_PER_TOKEN,
        decimals: 6,
      })
      .sendTransaction();

    console.log(`transfer txid: ${context.signature}`);
  } catch (error) {
    console.log(error);
  }
})();
