---
title: "How to Get Your Polymarket API Keys"
description: "A step-by-step guide to generating the API credentials you need to connect Ypero to your Polymarket account."
date: "2026-03-26"
---

## Before you start

To use Ypero, you need API credentials from Polymarket. These allow the bot to read market data and place trades on your behalf — without ever sharing your private key with us.

You'll need five values:

- `POLYMARKET_API_KEY`
- `POLYMARKET_API_SECRET`
- `POLYMARKET_API_PASSPHRASE`
- `POLYMARKET_PRIVATE_KEY`
- `POLYMARKET_FUNDER`

## Step 1: Create a Polymarket account

If you don't have one already, head to [polymarket.com](https://polymarket.com) and create an account. You'll need to deposit USDC on the Polygon network to trade.

> **Note:** Polymarket is restricted in some countries. If you're in a restricted region, you'll need a VPN connected to an allowed country (Canada, UK, Germany, Singapore are popular choices).

## Step 2: Access the API settings

Once logged in to Polymarket:

1. Click your profile icon in the top right
2. Go to **Settings**
3. Navigate to the **API** section
4. Click **Generate API Key**

You'll receive three values: your API Key, API Secret, and API Passphrase. **Copy these immediately** — the secret is only shown once.

## Step 3: Find your wallet details

For the `POLYMARKET_PRIVATE_KEY` and `POLYMARKET_FUNDER` values:

- **Private Key** — This is the private key of the wallet you use on Polymarket. If you use a browser wallet like MetaMask, you can export it from the wallet settings. **Never share this with anyone.**
- **Funder Address** — This is your wallet's public address (starts with `0x`).

## Step 4: Enter credentials in Ypero

Open the Ypero app, go to **Settings**, and paste each value into the corresponding field:

```
POLYMARKET_API_KEY=your_key_here
POLYMARKET_API_SECRET=your_secret_here
POLYMARKET_API_PASSPHRASE=your_passphrase
POLYMARKET_PRIVATE_KEY=your_wallet_key
POLYMARKET_FUNDER=your_wallet_address
```

Click **Save**, and you're ready to start trading.

## Security notes

- Your credentials are stored **locally on your machine** in an encrypted file
- Ypero never transmits your private key to any server
- We recommend using a dedicated wallet with only the funds you want to trade with
- Enable 2FA on your Polymarket account for additional security
