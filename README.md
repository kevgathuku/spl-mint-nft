# spl-mint-nft

1. Creates an SPL mint on Solana devnet
2. Mints tokens to your wallet-owned ATA
3. Attaches Metaplex metadata to the mint
4. Transfers tokens to another wallet

## Setup

Requirements: Node.js, npm, a funded devnet wallet.

1. Wallet file at project root

```
root/
└── devnet-wallet.json
```

Fund it if empty:

```bash
solana airdrop 2 --url devnet --keypair ./devnet-wallet.json
```

2. Install:

```bash
npm install
```

## Commands

```bash
npm run spl:init      # create mint on devnet
npm run spl:mint      # mint tokens to your ATA
npm run spl:metadata  # attach metadata to the mint
npm run spl:transfer  # transfer tokens to another wallet
npm run check    # tsc --noEmit typecheck
```

## Run

1. Create the mint:

```bash
npm run spl:init
```

Output:

```
mint address: <MINT>
transaction signature: <SIG>
```

2. Paste `<MINT>` into `src/spl/spl_mint.ts`, then:

```bash
npm run spl:mint
```

Output:

```
Your ata is: <ATA>
mint txid: <SIG>
```

Sends 20 tokens (decimals 6) to the ATA owned by your wallet.

3. Paste `<MINT>` into `src/spl/spl_metadata.ts`, then:

```bash
npm run spl:metadata
```

Output:

```
signature: <SIG>
```

Creates the metadata PDA (MOAR Coin / MOAR) via UMI + Token Metadata program. No supply change.

4. Paste `<MINT>` and recipient address into `src/spl/spl_transfer.ts`, then:

```bash
npm run spl:transfer
```

Output:

```
Your fromAta is: <ATA>
Your toAta is: <ATA>
transfer txid: <SIG>
```

Sends 1 token (decimals 6) ATA-to-ATA. Source ATA must already hold funds — run step 2 for the same mint first.

Verify:

```bash
solana confirm <SIG> --url devnet
solana account <MINT> --url devnet
```

Or: `https://explorer.solana.com/tx/<SIG>?cluster=devnet`.

## Notes

- Script resolves `./devnet-wallet.json` from where you run npm (project root)
