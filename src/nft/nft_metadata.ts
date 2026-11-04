import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import wallet from "../../devnet-wallet.json";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(
  irysUploader({
    address: "https://devnet.irys.xyz/",
  }),
);

umi.use(signerIdentity(signer));

(async () => {
  try {
    // image uri obtained from nft_image.ts
    const image =
      "https://gateway.irys.xyz/GifMUEpWGQg1Ud1x1mEkGpJyySpU3DQxwfvnxBon7XKe";

    // json schema : https://www.metaplex.com/docs/smart-contracts/core/json-schema
    // update the metadata
    const metadata = {
      name: "Pikachu #0001",
      description:
        "Adorable Deadpool Pikachu Coloring Page Kawaii and Printable",
      image,
      external_url: "https://pin.it/5Tmg6btXH",
      attributes: [
        { trait_type: "character", value: "Pikachu" },
        { trait_type: "color", value: "monochrome" },
      ],
      properties: {
        files: [
          {
            uri: image,
            type: "image/png",
          },
        ],
        category: "image",
      },
    };

    const myUri = await umi.uploader.uploadJson(metadata);
    console.log(`metadata uri: ${myUri} `);
  } catch (error) {
    console.log("error", error);
  }
})();
