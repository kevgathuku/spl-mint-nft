import {
  type CreateMetadataAccountV3InstructionAccounts,
  type CreateMetadataAccountV3InstructionArgs,
  createMetadataAccountV3,
  type DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import bs58 from "bs58";
import wallet from "../../devnet-wallet.json";

//paste your mint address got from spl_init.ts
const mint = publicKey("8nVxM3y8XtyJvMgu7LFy4tR2PQQMedA5PgazA6dRbFNS");

const umi = createUmi("https://api.devnet.solana.com");

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

(async () => {
  try {
    const accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint,
      mintAuthority: signer,
    };

    // Add the metadata
    const data: DataV2Args = {
      name: "MOAR Coin",
      symbol: "MOAR",
      uri: "https://www.anchor-lang.com",
      sellerFeeBasisPoints: 1,
      creators: null,
      collection: null,
      uses: null,
    };

    const args: CreateMetadataAccountV3InstructionArgs = {
      data: data,
      isMutable: true,
      collectionDetails: null,
    };

    const tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });

    const result = await tx.sendAndConfirm(umi);
    console.log("signature: ", bs58.encode(Buffer.from(result.signature)));
  } catch (error) {
    console.log("error", error);
  }
})();
