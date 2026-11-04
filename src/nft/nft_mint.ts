import { create, mplCore } from "@metaplex-foundation/mpl-core";
import {
  createSignerFromKeypair,
  generateSigner,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from "../../devnet-wallet.json";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

umi.use(mplCore());

(async () => {
  try {
    const metadataUri =
      "https://gateway.irys.xyz/7ajRyhx4fi6t2fAWCtY32sVnQRAqS14GQPmG6qAJ277Q";
    const asset = generateSigner(umi);

    //add you nft name and metadata uri
    const tx = create(umi, {
      asset,
      name: "Pikachu #0001",
      uri: metadataUri,
      owner: signer.publicKey,
    })
    
    const result = await tx.sendAndConfirm(umi);

    const signature = base58.deserialize(result.signature)[0];

    console.log(`signature ${signature} \nasset: ${asset.publicKey}`);
  } catch (e) {
    console.log(`error ${e}`);
  }
})();
