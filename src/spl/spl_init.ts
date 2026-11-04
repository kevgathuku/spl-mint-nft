import {
  appendTransactionMessageInstruction,
  appendTransactionMessageInstructions,
  assertIsTransactionWithBlockhashLifetime,
  createKeyPairSignerFromBytes,
  createSignerFromKeyPair,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  createTransactionMessage,
  generateKeyPairSigner,
  getSignatureFromTransaction,
  sendAndConfirmTransactionFactory,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
} from "@solana/kit";
import { getCreateAccountInstruction } from "@solana-program/system";
import {
  getCreateMintInstructionPlan,
  getInitializeMintInstruction,
  getMintSize,
  TOKEN_PROGRAM_ADDRESS,
} from "@solana-program/token";

//import your wallet
import wallet from "../../devnet-wallet.json";

const rpc = createSolanaRpc("https://api.devnet.solana.com");

const rpcSubscriptions = createSolanaRpcSubscriptions(
  "wss://api.devnet.solana.com",
);

(async () => {
  try {
    // Create signer from wallet
    const signer = await createKeyPairSignerFromBytes(new Uint8Array(wallet));

    // Generate a new mint signed for address
    const mint = await generateKeyPairSigner();

    // Get the size of the mint
    const space = BigInt(getMintSize());

    // Get the min balance for rent exemption
    const rent = await rpc.getMinimumBalanceForRentExemption(space).send();

    const sendAndConfirm = sendAndConfirmTransactionFactory({
      rpc,
      rpcSubscriptions,
    });

    const { value: latestBlockHash } = await rpc.getLatestBlockhash().send();

    const msg = createTransactionMessage({ version: 0 });

    const msgWithPayer = setTransactionMessageFeePayerSigner(signer, msg);

    const msgWithLifetime = setTransactionMessageLifetimeUsingBlockhash(
      latestBlockHash,
      msgWithPayer,
    );

    const txMessage = appendTransactionMessageInstructions(
      [
        getCreateAccountInstruction({
          payer: signer,
          newAccount: mint,
          lamports: rent,
          space,
          programAddress: TOKEN_PROGRAM_ADDRESS,
        }),

        getInitializeMintInstruction({
          mint: mint.address,
          decimals: 6,
          mintAuthority: signer.address,
        }),
      ],
      msgWithLifetime,
    );

    const signedTx = await signTransactionMessageWithSigners(txMessage);

    const signature = getSignatureFromTransaction(signedTx);

    assertIsTransactionWithBlockhashLifetime(signedTx);

    // Send and confirm the transaction
    await sendAndConfirm(signedTx, { commitment: "confirmed" });
    console.log(`mint address: ${mint.address}`);
    console.log(`transaction signature: ${signature}`);

    // Send and confirm the transaction
  } catch (error) {
    console.log(error);
  }
})();
