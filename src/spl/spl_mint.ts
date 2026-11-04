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

// Mint address from initializing the SPL token in spl_init.ts
const mint = address("FCLqvupYkP1Sh19xYz1XkFRqV5TsCFDBiLYkwuGBXbEL");

const BASE_UNITS_PER_TOKEN = 1_000_000n;

(async () => {
  try {
    const client = await createClient()
      .use(signerFromFile(walletPath))
      .use(solanaDevnetRpc({ transactionConfig: { version: 1 } }))
      .use(tokenProgram());

    const [ata] = await findAssociatedTokenPda({
      mint,
      owner: client.payer.address,
      tokenProgram: TOKEN_PROGRAM_ADDRESS,
    });
    console.log(`Your ata is: ${ata}`);

    const { context, ...rest } = await client.token.instructions
      .mintToATA({
        mint,
        owner: client.payer.address, // your wallet owns the ATA
        mintAuthority: client.payer, // payer is the mint authority from spl_init
        amount: 20n * BASE_UNITS_PER_TOKEN, // 20 tokens @ 6 decimals
        decimals: 6,
      })
      .sendTransaction();

    console.log(`mint txid: ${context.signature}`);
  } catch (error) {
    console.log(error);
  }
})();
