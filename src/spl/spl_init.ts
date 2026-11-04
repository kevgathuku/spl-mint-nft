import { createClient, generateKeyPairSigner } from "@solana/kit";
import { solanaDevnetRpc } from "@solana/kit-plugin-rpc";
import { signerFromFile } from "@solana/kit-plugin-signer";
import { tokenProgram } from "@solana-program/token";

// Path to wallet keypair file
const walletPath = "./devnet-wallet.json";

(async () => {
  try {
    // Build client:
    // 1. wallet as payer/identity
    // 2. devnet RPC (v1)
    // 3. token program
    const client = await createClient()
      .use(signerFromFile(walletPath))
      .use(
        solanaDevnetRpc({
          transactionConfig: {
            version: 1,
          },
        }),
      )
      .use(tokenProgram());

    // Generate new keypair for the mint account
    const mint = await generateKeyPairSigner();

    // Create account + initialize mint
    // then send and confirm
    const { context } = await client.token.instructions
      .createMint({
        newMint: mint,
        decimals: 6,
        mintAuthority: client.payer.address,
      })
      .sendTransaction();

    console.log(`mint address: ${mint.address}`);
    console.log(`transaction signature: ${context.signature}`);
  } catch (error) {
    console.log(error);
  }
})();
