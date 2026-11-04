# Full flow — MOAR Coin on devnet

Mint: `8nVxM3y8XtyJvMgu7LFy4tR2PQQMedA5PgazA6dRbFNS` (decimals 6, authority `J5vmk4tRfK2KHdkovkY9z4FxoujVCf8YmxGKwJTN3JG6`)

## 1. Init — create mint

```
mint address: 8nVxM3y8XtyJvMgu7LFy4tR2PQQMedA5PgazA6dRbFNS
transaction signature: 5axC4BBbuJeL8cieT6wkbJ5Lzxov2yq1pEVQNDXmDRWLttqnMDrwPgxFUNuVgzzJ8EXX6X5Wcx525fwXhHjWbR6c
```

- https://explorer.solana.com/tx/5axC4BBbuJeL8cieT6wkbJ5Lzxov2yq1pEVQNDXmDRWLttqnMDrwPgxFUNuVgzzJ8EXX6X5Wcx525fwXhHjWbR6c?cluster=devnet
- `createAccount` (82 bytes, 1,066,800 lamports rent) + `initializeMint`, 236 CU, fee 10,000.

## 2. Mint — 20 tokens to your ATA

```
Your ata is: BHayZGG9ydBbR9eSa4jedbqcXFtnzuXukRTwz4SLjMq6
mint txid: 42fP8Ys3bhiwd36vwtMJxETiZ8zFjWmBLFWjcSE5mhrLK6bgqofm11rrfNt8UjE2bqiC4EGQG19abnN5MLdMAqZX
```

- https://explorer.solana.com/tx/42fP8Ys3bhiwd36vwtMJxETiZ8zFjWmBLFWjcSE5mhrLK6bgqofm11rrfNt8UjE2bqiC4EGQG19abnN5MLdMAqZX?cluster=devnet
- `createIdempotent` ATA + `mintToChecked` 20.0, 13,567 CU, fee 5,000.

## 3. Metadata — MOAR Coin / MOAR

```
signature: 63enjtWP7G3swzBheY2JxVuKeWH1VthiMG7PJ2BDvErDc8XmYc7CLueZy8tvwsuKKJDCXhRms9ksgQ5etnFSmmT5
```

- https://explorer.solana.com/tx/63enjtWP7G3swzBheY2JxVuKeWH1VthiMG7PJ2BDvErDc8XmYc7CLueZy8tvwsuKKJDCXhRms9ksgQ5etnFSmmT5?cluster=devnet
- `Create Metadata Accounts v3` → PDA `8sXxACDXo26ZEuaWfuKQ76TTs6NFi6CkaKmHpmLF19NB`, 36,028 CU, fee 5,000. No supply change.

## 4. Transfer — 1 token ATA-to-ATA

```
Your fromAta is: BHayZGG9ydBbR9eSa4jedbqcXFtnzuXukRTwz4SLjMq6
Your toAta is: cYotP2QtZMoZ3CuoYWWiS272ephEGPthQCMprBXcJSQ
transfer txid: 55VAMJB4nZoJQD8jskqsBBuHfX1RSK1pHbiL4xHK1ow1sSYKKVzNVA7gcnmUDgj7whwmd97ebGCu3PDMeFponvBA
```

- https://explorer.solana.com/tx/55VAMJB4nZoJQD8jskqsBBuHfX1RSK1pHbiL4xHK1ow1sSYKKVzNVA7gcnmUDgj7whwmd97ebGCu3PDMeFponvBA?cluster=devnet
- `createAssociatedToken` (recipient) + `TransferChecked` 1.0. Requires funded source — step 2 first.
