import { readFile } from "node:fs/promises";
import {
  createGenericFile,
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
    // Points to local image path
    const image = await readFile("images/image.jpeg");

    // Specify the image name and mime type
    const file = createGenericFile(image, "image.jpeg", {
      contentType: "image/jpeg",
    });

    const [myUri] = await umi.uploader.upload([file]);
    console.log("Your image URI: ", myUri);
  } catch (error) {
    console.log(error);
  }
})();
