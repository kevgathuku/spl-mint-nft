# Full flow — Pikachu #0001 NFT (MPL Core, devnet)

Owner/payer: `J5vmk4tRfK2KHdkovkY9z4FxoujVCf8YmxGKwJTN3JG6`

## 1. Image — upload to Irys

```
Your image URI: https://gateway.irys.xyz/GifMUEpWGQg1Ud1x1mEkGpJyySpU3DQxwfvnxBon7XKe
```

- `src/nft/nft_image.ts` reads `images/image.jpeg` → `createGenericFile` → `umi.uploader.upload`.
- Permanent bytes for the 73K monochrome Pikachu/Deadpool coloring page.

## 2. Metadata — upload JSON to Irys

```
metadata uri: https://gateway.irys.xyz/7ajRyhx4fi6t2fAWCtY32sVnQRAqS14GQPmG6qAJ277Q
```

- `src/nft/nft_metadata.ts` builds `{ name: "Pikachu #0001", image, attributes, properties }` → `umi.uploader.uploadJson`.
- Attributes: character Pikachu, color monochrome (+ cosplay/style per file). `external_url` holds the Pinterest source link.

## 3. Mint — Core asset

```
signature stWn3f1if6AQxwnmoptVevBtgHDzQ1hGZyfWLb4nSscVboEYZ4fkJPTiUdCRdYSv5CZT8QpoXSe2EwdZ3y3YcfB
asset : 9tLcGSQMWPHbJP9kLxYzfaXr18pZbvSkLvxRqWU5JdY5
```

- https://explorer.solana.com/tx/stWn3f1if6AQxwnmoptVevBtgHDzQ1hGZyfWLb4nSscVboEYZ4fkJPTiUdCRdYSv5CZT8QpoXSe2EwdZ3y3YcfB?cluster=devnet
- https://core.metaplex.com/explorer/9tLcGSQMWPHbJP9kLxYzfaXr18pZbvSkLvxRqWU5JdY5?env=devnet
- `src/nft/nft_mint.ts`: `create(umi, { asset, name, uri: metadataUri, owner })` → `sendAndConfirm`. `CreateV2`, 7,996 CU, fee 10,000, asset 157 B.
