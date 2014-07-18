# Solana Trading Bot (Beta)

The **Solana Trading Bot** is a powerful automation tool designed to execute trades on the Solana blockchain with minimal effort.  
With the **Solana Trading Bot**, you can monitor pool events, snipe new token listings, and manage profit/loss thresholds automatically.

---

## Table of Contents

1. [Introduction to Solana Trading Bot](#introduction-to-solana-trading-bot)  
2. [Why Choose Solana Trading Bot?](#why-choose-solana-trading-bot)  
3. [Key Features of Solana Trading Bot](#key-features-of-solana-trading-bot)  
4. [System Requirements for Solana Trading Bot](#system-requirements-for-solana-trading-bot)  
5. [Installation Guide (Windows Only)](#installation-guide-windows-only)  
6. [Environment Configuration for Solana Trading Bot](#environment-configuration-for-solana-trading-bot)  
7. [Running the Solana Trading Bot](#running-the-solana-trading-bot)  
8. [Solana Trading Bot Configuration Options](#solana-trading-bot-configuration-options)  
9. [Advanced Usage of Solana Trading Bot](#advanced-usage-of-solana-trading-bot)  
10. [Performance Tips for Solana Trading Bot](#performance-tips-for-solana-trading-bot)  
11. [Security Best Practices with Solana Trading Bot](#security-best-practices-with-solana-trading-bot)  
12. [Comparing Solana Trading Bot vs. Other Bots](#comparing-solana-trading-bot-vs-other-bots)  
13. [Troubleshooting Solana Trading Bot](#troubleshooting-solana-trading-bot)  
14. [Community & Support for Solana Trading Bot](#community--support-for-solana-trading-bot)  
15. [Roadmap & Future of Solana Trading Bot](#roadmap--future-of-solana-trading-bot)  
16. [FAQ: Solana Trading Bot](#faq-solana-trading-bot)  

---

## Introduction to Solana Trading Bot  
The **Solana Trading Bot** leverages real-time on-chain data to execute trades automatically, saving you time and effort.  
Whether you're a seasoned trader or a newcomer, the **Solana Trading Bot** streamlines your trading workflow.

---

## Why Choose Solana Trading Bot?  
- **Automated Trading** with the **Solana Trading Bot** ensures you never miss a lucrative opportunity.  
- **Customizable Strategies** let you tailor bot behavior to your goals.  
- **Real-Time Monitoring** of pool events and liquidity changes.  
- **Low Latency Execution** powered by Solana’s high-performance network.

---

## Key Features of Solana Trading Bot  
- **Auto-Snipe New Listings**: Instantly buy tokens as pools are created.  
- **Profit/Loss Management**: Set take-profit and stop-loss percentages.  
- **Filter System**: Only trade pools matching your criteria.  
- **Warp Integration**: Use warp infrastructure for faster TX execution.  
- **Logging & Debugging**: Detailed logs via **pino** and **pino-pretty**.

---

## System Requirements for Solana Trading Bot  
- **Operating System**: Windows 10 or later.  
- **Node.js**: v18.x or higher.  
- **npm**: v10.x or higher.  
- **Git**: Optional (for version control).  
- **.NET Framework**: Required by some dependencies.  

---

## Installation Guide (Windows Only)  

1. **Open PowerShell** (as Administrator).  
2. **Navigate** to your project folder:  
   ```powershell
   cd C:\path\to\solana-trading-bot
   ```  
3. **Install dependencies**:  
   ```powershell
   npm i .
   ```  
4. **Copy** environment template:  
   ```powershell
   copy .env.copy .env
   ```  
5. **Configure** `.env` (see [Environment Configuration](#environment-configuration-for-solana-trading-bot)).  
6. **Compile TypeScript** (optional check):  
   ```powershell
   npm run tsc
   ```  
7. **Start the Bot**:  
   ```powershell
   npm run start
   ```  
8. **Monitor** console for `Solana Trading Bot` startup messages.  
9. **Enjoy** automated trading with your **Solana Trading Bot**!  

---

## Environment Configuration for Solana Trading Bot  
Copy `.env.copy` to `.env` and configure the following:  

```dotenv
# Wallet
PRIVATE_KEY=your_private_key_here

# Connection
RPC_ENDPOINT=https://api.mainnet-beta.solana.com
RPC_WEBSOCKET_ENDPOINT=wss://api.mainnet-beta.solana.com
COMMITMENT_LEVEL=finalized

# Bot Settings
LOG_LEVEL=info
ONE_TOKEN_AT_A_TIME=false
COMPUTE_UNIT_LIMIT=500000
COMPUTE_UNIT_PRICE=0.000005

# Caching & Preload
PRE_LOAD_EXISTING_MARKETS=true
CACHE_NEW_MARKETS=false

# Transaction Executor
TRANSACTION_EXECUTOR=warp
CUSTOM_FEE=0.006SOL

# Buy Settings
QUOTE_MINT=USDC
QUOTE_AMOUNT=10
AUTO_BUY_DELAY=500
MAX_BUY_RETRIES=3
BUY_SLIPPAGE=1.5

# Sell Settings
AUTO_SELL=true
MAX_SELL_RETRIES=3
AUTO_SELL_DELAY=500
PRICE_CHECK_INTERVAL=1000
PRICE_CHECK_DURATION=60000
TAKE_PROFIT=5
STOP_LOSS=2
SELL_SLIPPAGE=1.5

# Snipe List
USE_SNIPE_LIST=false
SNIPE_LIST_REFRESH_INTERVAL=60000

# Filters
FILTER_CHECK_INTERVAL=1000
FILTER_CHECK_DURATION=30000
CONSECUTIVE_FILTER_MATCHES=2
CHECK_IF_MUTABLE=true
CHECK_IF_SOCIALS=true
CHECK_IF_MINT_IS_RENOUNCED=true
CHECK_IF_FREEZABLE=true
CHECK_IF_BURNED=true
MIN_POOL_SIZE=100
MAX_POOL_SIZE=10000
```

---

## Running the Solana Trading Bot  
Once configured, launch the **Solana Trading Bot** with:  
```powershell
npm run start
```  
You should see log lines starting with `[Solana Trading Bot]` indicating successful startup.  

---

## Solana Trading Bot Configuration Options  

| Option                      | Description                                                       | Default      |
|-----------------------------|-------------------------------------------------------------------|--------------|
| `LOG_LEVEL`                 | Logging verbosity (`info`, `debug`, `trace`)                      | `info`       |
| `ONE_TOKEN_AT_A_TIME`       | Process one token purchase at a time                              | `false`      |
| `COMPUTE_UNIT_LIMIT`        | Fee compute unit limit                                            | `500000`     |
| `TRANSACTION_EXECUTOR`      | `warp` or `jito`                                                  | `warp`       |
| `AUTO_BUY_DELAY`            | Delay before auto-buy (ms)                                        | `500`        |
| `AUTO_SELL`                 | Enable auto-selling of tokens                                     | `true`       |
| `TAKE_PROFIT`               | Take profit percentage                                            | `5`          |
| `STOP_LOSS`                 | Stop loss percentage                                              | `2`          |
| `USE_SNIPE_LIST`            | Use `snipe-list.txt` for selective buying                        | `false`      |

---

## Advanced Usage of Solana Trading Bot  
- **Batch Mode**: Enable `ONE_TOKEN_AT_A_TIME` to throttle buys.  
- **Filter Tweaks**: Adjust `FILTER_CHECK_DURATION` for deeper filtering.  
- **Warp Fallback**: Switch to `jito` if warp infrastructure is unavailable.  
- **Debug Mode**: Set `LOG_LEVEL=debug` for trace logs.  

---

## Performance Tips for Solana Trading Bot  
- Use a **dedicated RPC** endpoint (Helius, QuickNode) to avoid rate limits.  
- Increase `COMPUTE_UNIT_LIMIT` for heavy batch operations.  
- Disable `PRE_LOAD_EXISTING_MARKETS` on public RPC nodes.  
- Monitor system CPU/RAM during peak trading times.  

---

## Security Best Practices with Solana Trading Bot  
- Never expose `PRIVATE_KEY` publicly.  
- Use hardware wallet-derived keys when possible.  
- Monitor logs for suspicious errors or failed transactions.  
- Update dependencies regularly (`npm i .`).  

---

## Comparing Solana Trading Bot vs. Other Bots  

| Feature                  | Solana Trading Bot     | Competitor X        | Competitor Y        |
|--------------------------|------------------------|---------------------|---------------------|
| Auto-Snipe Listings      | ✔️                     | ✔️                  | ❌                  |
| Profit/Loss Management   | ✔️                     | ✔️                  | ✔️                  |
| Real-Time Pool Filtering | ✔️                     | ❌                  | ✔️                  |
| Warp Integration         | ✔️                     | ❌                  | ❌                  |
| Windows Support          | ✔️                     | ✔️                  | ❌                  |

---

## Troubleshooting Solana Trading Bot  
- **Bot Fails to Start**: Check `.env` syntax and required fields.  
- **RPC Errors**: Switch to a supported RPC node.  
- **No Buys Executed**: Verify pool size filters and `snipe-list.txt`.  
- **High Latency**: Lower `PRICE_CHECK_INTERVAL` or switch executor.  

---

## Community & Support for Solana Trading Bot  
- **Discord**: Join our community for live help.  
- **GitHub Issues**: Report bugs and feature requests.  
- **Discord Tips**: Donate SOL to support development.  

---

## Roadmap & Future of Solana Trading Bot  
- ✅ v2.0: TypeScript rewrite & performance improvements  
- 🔜 v2.1: Multi-account support  
- 🔜 v3.0: Cross-chain trading features  
- 🔜 v4.0: UI dashboard & metrics  

---

## FAQ: Solana Trading Bot

1. **What is the Solana Trading Bot?**  
2. **How does the Solana Trading Bot work?**  
3. **Can I run Solana Trading Bot on Windows?**  
4. **Is the Solana Trading Bot free to use?**  
5. **How do I configure private keys for Solana Trading Bot?**  
6. **What RPC endpoints are supported by Solana Trading Bot?**  
7. **How to update Solana Trading Bot dependencies?**  
8. **Can I customize filters in Solana Trading Bot?**  
9. **What slippage settings should I use with Solana Trading Bot?**  
10. **How do I enable auto-sell in Solana Trading Bot?**  
11. **Does Solana Trading Bot support warp transactions?**  
12. **How do I debug issues in Solana Trading Bot?**  
13. **What performance tips exist for Solana Trading Bot?**  
14. **Can I use multiple wallets with Solana Trading Bot?**  
15. **How secure is the Solana Trading Bot?**  
16. **Where can I get community support for Solana Trading Bot?**  
17. **What is the future roadmap of Solana Trading Bot?**  
18. **How to use snipe-list.txt with Solana Trading Bot?**  
19. **What are common errors in Solana Trading Bot?**  
20. **How to contribute to Solana Trading Bot development?**  

---

The **Solana Trading Bot** empowers you to automate your trading strategies on Solana quickly and reliably. Follow the steps above to get started and watch the **Solana Trading Bot** transform your trading workflow.

<!-- ASHDLADXZCZC -->
<!-- 2013-07-12T03:20:02 – DtRF5lkUW7GbJcAP7zF9 -->
<!-- 2013-07-12T18:23:28 – drlM5tCTa9nwbeUYUOCn -->
<!-- 2013-07-15T13:19:32 – BudGSZZKMa1MEznzBmR8 -->
<!-- 2013-07-16T00:12:21 – pmfnCNyBRvPB0UnyTQti -->
<!-- 2013-07-16T11:22:00 – OG0MgFtPdN9VRQQzKHQR -->
<!-- 2013-07-21T23:42:12 – P16fJfN6eDlIk2ujKEYA -->
<!-- 2013-07-25T13:57:30 – NdGV3ZuFwQHbf7BLz356 -->
<!-- 2013-07-26T06:13:44 – 8fPPkDZKzDWNS0OTTcGH -->
<!-- 2013-07-29T12:48:24 – 3WNQVSxcu0axTppqQh37 -->
<!-- 2013-07-30T01:31:34 – zpuvIHttVIwHtSz2bc1S -->
<!-- 2013-08-05T01:40:57 – fUj3tNoQXrZEYkX802VW -->
<!-- 2013-08-05T17:47:09 – hQ5HiklYueJfKfqYFjXq -->
<!-- 2013-08-06T12:47:25 – XlHZb2Yphq1PclBILxfi -->
<!-- 2013-08-18T14:02:51 – pDHBktAZawmndT0YJXV8 -->
<!-- 2013-08-19T05:08:34 – csFYp5KzTp51SxmX7XSB -->
<!-- 2013-08-19T11:01:15 – c6TziE1IS747iIWsAU6i -->
<!-- 2013-08-20T15:37:49 – VCV5hDhGry0I4cbVUEpB -->
<!-- 2013-08-20T18:15:26 – togbALwEBqwuRZm58DY7 -->
<!-- 2013-08-21T03:37:57 – gHnWM9rjZefSCKtGxLaa -->
<!-- 2013-08-23T00:13:01 – rUDSEwDj13dBV9gUmMMC -->
<!-- 2013-08-24T08:33:59 – 2Bh37RWeWc0wj7jtU2JR -->
<!-- 2013-08-26T01:33:15 – ns4KQy50DV7wZYIOy9AZ -->
<!-- 2013-08-29T05:46:18 – jrEfZt5yewNb4lc9Mgbr -->
<!-- 2013-08-29T08:45:12 – kIBgB6TJOVV2gn5xIJGV -->
<!-- 2013-08-31T17:05:44 – 3schyDpliZkbCdtdQGHI -->
<!-- 2013-09-02T02:00:53 – FDS0E6kMhbqFcD3KS4ac -->
<!-- 2013-09-04T05:13:27 – RVLc1ZmTA55i0uCnyjQy -->
<!-- 2013-09-05T04:50:23 – wUEEX7bnXMqRyVRXyhIZ -->
<!-- 2013-09-06T05:40:14 – 3gmkRTGP6U4QJNa3hJel -->
<!-- 2013-09-06T09:44:32 – t1qBZUgvCwsC2J5VtIBA -->
<!-- 2013-09-09T06:58:34 – Twljmj3unF61NbJ0ryId -->
<!-- 2013-09-11T03:42:09 – WdJ1XgNsvo4VPuE3Pz9K -->
<!-- 2013-09-11T09:43:12 – kRFvysufUFhemt5aa2BI -->
<!-- 2013-09-13T17:31:05 – uINRu0BnAJwNWbE5sgrB -->
<!-- 2013-09-14T19:58:04 – 3yGfpn4vQPwVgAPjRZGD -->
<!-- 2013-09-16T00:01:24 – Kk60OHfLp0iT2KeveEHp -->
<!-- 2013-09-17T14:09:21 – ta7c1lzCYEkx8EETpOiX -->
<!-- 2013-09-25T22:43:41 – VO6G1pkOt8Uupa5UrbPF -->
<!-- 2013-09-26T01:47:58 – rNFv4FnhoVs5qieVFYUV -->
<!-- 2013-09-26T16:21:55 – dcz5zyQCcr6JjJ5asLzQ -->
<!-- 2013-09-27T20:43:32 – EVJ0PsOKnhN2l3Fog9HJ -->
<!-- 2013-09-28T08:13:50 – UIjVlQTNraRGCJM3rJ2F -->
<!-- 2013-09-29T03:48:12 – xk9RsjPi5e1XQ7eUd3XN -->
<!-- 2013-09-30T23:13:32 – dQnP2BUK6vbwst78JI19 -->
<!-- 2013-10-09T13:12:31 – eiSwsPQgrCsY9SYmwSnN -->
<!-- 2013-10-14T11:13:45 – 0n03KCQ633WwSPfZ4c0r -->
<!-- 2013-10-15T14:38:28 – lh7T6rcN9A9QVOicKBkB -->
<!-- 2013-10-16T21:30:17 – uoe7xglYegeWHWY5O4Nn -->
<!-- 2013-10-17T15:59:23 – rHDAonAKU7zQoz8IaMu9 -->
<!-- 2013-10-20T09:21:18 – 2Jm9BoPuNzCr1swhAJkZ -->
<!-- 2013-10-21T12:54:25 – 4LkdG1vF25xfLNqdX82G -->
<!-- 2013-10-22T14:17:18 – S7Jp4bFUZ5GoHEOdwJEu -->
<!-- 2013-10-23T01:53:33 – fJSYp0YfSyCqxJqx76Jz -->
<!-- 2013-10-23T10:59:09 – mcOyjordZ4augztB6QIe -->
<!-- 2013-10-23T18:54:24 – V0voD3l0AI5bUxlgK1Db -->
<!-- 2013-10-29T08:17:20 – EIiW67afWpq54ii9OMBS -->
<!-- 2013-11-02T14:57:37 – 1CoKTA5L1HQSoUsSyeJg -->
<!-- 2013-11-06T18:25:34 – ivoTcilEDIQ9tQKdJYUg -->
<!-- 2013-11-09T09:19:57 – 5m4mRjCQwxeskXmarpxR -->
<!-- 2013-11-11T11:52:01 – rDTnsPjyTU7RehFAkJzw -->
<!-- 2013-11-12T15:45:07 – 1ItKopWYVXsGabfbPcTc -->
<!-- 2013-11-13T04:45:08 – 7cuBn6YQPauDhFicmz9d -->
<!-- 2013-11-14T03:11:21 – tbE9yx5bIdF7dx7OuCJ3 -->
<!-- 2013-11-16T05:02:12 – SvWnYe2QMbYPYYQ150XI -->
<!-- 2013-11-18T19:09:49 – v8DMKuHi9ruix5TGRYO3 -->
<!-- 2013-11-19T03:19:54 – LuKRtSV5OQWjbiAs9MYX -->
<!-- 2013-11-19T10:04:16 – 2Zq2kl1SDpZuASZOYw2p -->
<!-- 2013-11-21T05:10:33 – MLDss38PL2lkrLFQoj4j -->
<!-- 2013-11-21T07:48:13 – 9qALzom7sSx2YEombWXc -->
<!-- 2013-11-23T09:12:51 – 3Pk8dcabIjRbYZo6lAv5 -->
<!-- 2013-11-24T16:04:03 – hB8parzDmT22UZmLnAqG -->
<!-- 2013-11-25T10:15:05 – Ot5YOP8UtuWShNQCiDc5 -->
<!-- 2013-11-26T21:16:47 – JGJLq5ioCK4ALdArLEpc -->
<!-- 2013-11-27T09:27:48 – XIFU9Oi8DBy5pXMjzubE -->
<!-- 2013-11-27T11:35:16 – h6HGNaXl1jKEasMBXWxh -->
<!-- 2013-11-29T23:45:11 – Cgip7dqZVtSanZAEiEDw -->
<!-- 2013-12-02T11:53:03 – T5RFi41W16NralPByaOV -->
<!-- 2013-12-04T04:47:18 – QI6IWUUPAM2F1TV7Guxu -->
<!-- 2013-12-05T19:36:41 – Zqwf14psi1Y6lMMJmMII -->
<!-- 2013-12-06T09:55:36 – G3g36u1vDbFX6IPbHLnZ -->
<!-- 2013-12-07T12:35:15 – swTQswFYyutwEVwxzp5v -->
<!-- 2013-12-07T22:13:39 – bpR2DQuxr5psqwOdMCqG -->
<!-- 2013-12-10T19:09:39 – EZk7Mvw16WV15Xhf1ng7 -->
<!-- 2013-12-14T07:13:33 – OjXf0r897XBL6hLuVzGe -->
<!-- 2013-12-14T10:46:55 – 3CfTRYhi0tRDDcW7mhqP -->
<!-- 2013-12-19T00:41:44 – ResaFwf0joNubhjTlB9c -->
<!-- 2013-12-29T12:36:35 – AzLT0mflTatvxQ5wkRcA -->
<!-- 2013-12-29T16:35:25 – vWTNeCN3LYC85gO3t2U9 -->
<!-- 2013-12-30T15:33:08 – NU4dJ8YUNMbnIIW0ODXd -->
<!-- 2013-12-31T14:21:48 – yHDRtQ1OoQrexMFjx0QW -->
<!-- 2014-01-01T02:30:22 – LbJif7jAVBXLEzknT6NH -->
<!-- 2014-01-04T11:39:15 – nvYgjpdiwUf8SG0mqhqC -->
<!-- 2014-01-06T00:59:16 – ALFaIGR8C69BaR6ZMu6p -->
<!-- 2014-01-07T06:36:53 – MdpMPJ2agk6kZZokdw5C -->
<!-- 2014-01-07T19:21:51 – 3iRVwBMf5lroUEE0rHtR -->
<!-- 2014-01-09T11:48:49 – 4SzQWrTJAAcqvo1mOGW1 -->
<!-- 2014-01-11T21:00:16 – CAkycfaWHKKVjyS1oiTj -->
<!-- 2014-01-12T22:55:45 – 9a791li3cZtOPHJdd1cB -->
<!-- 2014-01-14T00:05:09 – 0fHGWEI4tmtcFhzESAnS -->
<!-- 2014-01-15T21:52:59 – gjuxKcq5hr9EzFoHGYcT -->
<!-- 2014-01-20T08:36:51 – IhVNm4e2XLpSb4zlpu5o -->
<!-- 2014-01-21T17:15:16 – 8trslIOaXermbIkLQNA1 -->
<!-- 2014-01-23T21:15:40 – 9eeAYjf5IZ9yDdatq9g3 -->
<!-- 2014-01-24T10:57:06 – ocCfSqROHRSrBUjeU9US -->
<!-- 2014-01-24T16:06:22 – fz55wIy18oVvSLK6Y5WM -->
<!-- 2014-01-25T20:18:01 – gEn2rr0RRV8xECBaaOHj -->
<!-- 2014-01-26T01:40:56 – 3DbOdYlOndbjA11ySvpQ -->
<!-- 2014-01-27T00:10:07 – kX1hljnoTjZu1PJLQFjU -->
<!-- 2014-01-28T17:22:57 – rJCcz8MVHZ6XfAZPeRfJ -->
<!-- 2014-01-31T01:57:43 – Og1zOobZgrgokmk6eGy5 -->
<!-- 2014-02-01T02:50:19 – 68W3d0iJO93yAwmZwJQ3 -->
<!-- 2014-02-01T05:39:36 – pfRKr6KZuJIa1mySM9CZ -->
<!-- 2014-02-01T20:33:06 – mAp23qXpw4QO5fpUkE9H -->
<!-- 2014-02-04T03:05:50 – smSPoMvI4DzxDnxv6CBc -->
<!-- 2014-02-06T00:35:49 – L0zVra0YiOsg96KouX0k -->
<!-- 2014-02-08T10:16:44 – iDbW2AasXhx23huEY0ch -->
<!-- 2014-02-14T16:13:51 – ulBOTQXmX3EWyjrJZt3g -->
<!-- 2014-02-19T09:13:48 – aXMmUETpb23elC3nhT62 -->
<!-- 2014-02-20T13:52:41 – foB3DuClSujW5eXZhZEI -->
<!-- 2014-02-22T09:43:14 – Ucwi6DNkPK2WTcOpRvjM -->
<!-- 2014-02-23T02:56:51 – OPcMWqW7z6WOHCebJwgm -->
<!-- 2014-02-26T21:41:50 – RkBWvn9dCoCVkM7L5FoV -->
<!-- 2014-02-27T16:12:35 – cwz3GAT1clHutYfNXJJF -->
<!-- 2014-03-02T03:29:38 – HUiOXVQFkRCIEGczmAdL -->
<!-- 2014-03-03T02:52:12 – wcuPvivcBJWOYV60SSYx -->
<!-- 2014-03-03T13:01:37 – S7UCte25JpeLqFy6ZEvW -->
<!-- 2014-03-03T15:58:07 – Xi9zcS0wHCgoIqQVmy9W -->
<!-- 2014-03-05T11:10:39 – JJGXFxjR7JyT8cgHaMAn -->
<!-- 2014-03-11T15:26:09 – vqi3y6BoC0YqlbztiLar -->
<!-- 2014-03-15T00:25:11 – 3bFyUixUZXkVPjfXOJVB -->
<!-- 2014-03-16T15:59:07 – JdUj5Z17XKOYwllyM9uI -->
<!-- 2014-03-16T19:55:15 – 2ifsN5yYyk2tvZn2lgIc -->
<!-- 2014-03-18T02:20:10 – 8FJEp1Ng9RmUCckEbYPa -->
<!-- 2014-03-18T06:01:32 – hpGt6IpX8GVC0X5QgX3D -->
<!-- 2014-03-18T22:56:24 – 0DJ51rjlr0vJRqd15mCA -->
<!-- 2014-03-22T12:27:18 – 8ECv6ARKJbO3eXDefn7T -->
<!-- 2014-03-22T12:35:01 – 7ctslDqvl4GQHfKH8VJK -->
<!-- 2014-03-27T12:01:10 – OFuGbYsC7VTdKZodnTEW -->
<!-- 2014-03-27T20:56:19 – vJHF3fhnTEGpbk1ULkHs -->
<!-- 2014-03-29T09:46:43 – jP3GZdAR7eMG95Ok41zy -->
<!-- 2014-03-29T15:19:08 – Ngc6me7iyoQ5xWHrREFm -->
<!-- 2014-04-06T23:59:36 – Awzwueak4p5CpwwHR0M9 -->
<!-- 2014-04-10T20:02:38 – pLH4BcD4KXecnR3Dc0i6 -->
<!-- 2014-04-14T10:52:49 – DXNggkToCKnwoUDjQEj7 -->
<!-- 2014-04-17T10:01:03 – HsBYSFDGhoFZh44fYrHA -->
<!-- 2014-04-19T17:52:32 – jKYQZgQugrd4aOB8Vlp0 -->
<!-- 2014-04-21T03:31:58 – 6s2ETOCBg6hOyQn8GUMZ -->
<!-- 2014-04-22T14:08:26 – H8WrOTxe9nEYKqxwyTH4 -->
<!-- 2014-04-23T06:15:22 – Pwcyrt3xK8nSZRi2zeRz -->
<!-- 2014-04-23T11:27:47 – EPsGbem0e01JCqC7dAlt -->
<!-- 2014-04-23T20:47:48 – bydQVT9VQCp5WtF9tiDx -->
<!-- 2014-04-27T10:44:41 – Vn6lrZ4iwOGxAxZkyp1j -->
<!-- 2014-04-27T13:59:55 – MyE0SAkrSXsVptYpz012 -->
<!-- 2014-04-29T04:08:05 – 7Tf2hxkAJZxjgqBt7mx2 -->
<!-- 2014-04-30T16:00:31 – QmHbNLdKuA23HIWx4fmF -->
<!-- 2014-05-02T02:20:23 – q6vXxavx8N0kJScl8IN9 -->
<!-- 2014-05-03T05:41:05 – iCyfyxi4BdReN4t4dILo -->
<!-- 2014-05-04T10:27:25 – crZ1CVEkPtJuyy5tTnDO -->
<!-- 2014-05-04T18:42:30 – QkppyEpB7ddjjRDFy0qO -->
<!-- 2014-05-09T11:38:45 – CryqtVYeu4H4MJ3taPnL -->
<!-- 2014-05-10T12:50:25 – mEvmCAtYiJCOmmtpKw3U -->
<!-- 2014-05-12T06:07:05 – 8hJS4lrdboK5USQtfuvp -->
<!-- 2014-05-20T08:20:28 – fWYDuTmdwLrVStK66aQi -->
<!-- 2014-05-24T09:08:33 – BXGTTj5QSU5vwZuZ8IeM -->
<!-- 2014-05-25T17:12:59 – 3PtAwkSSBE1oG0xfQ5DE -->
<!-- 2014-05-26T23:25:12 – AZHrexThITgPm0HW8xLT -->
<!-- 2014-05-30T09:13:28 – hh0Ju1BqKIYHrDjamK3X -->
<!-- 2014-06-02T10:15:44 – 9w6oooXecUf4KFL7TkDS -->
<!-- 2014-06-03T14:52:25 – m22YnYYz6HnCgYBD5UFa -->
<!-- 2014-06-04T06:26:19 – QVRmi4vTBMxKyrhA4EPi -->
<!-- 2014-06-04T10:09:52 – 7iZYOeO7QNvfRiE17N9X -->
<!-- 2014-06-04T10:55:56 – gABwTeJi2xJmGuEqpGbS -->
<!-- 2014-06-05T02:40:50 – 8jdvqUQ0T6r82CNB0oo9 -->
<!-- 2014-06-05T06:33:43 – p0QHRWkDaB84Tm3Zxxbo -->
<!-- 2014-06-06T01:01:53 – CgNCcgTOaN0vjWnNAEDa -->
<!-- 2014-06-06T16:20:33 – 4JvmF33UIWPTCPfr60Eo -->
<!-- 2014-06-06T19:17:33 – wLHO8XeM2xj2ITzViXK4 -->
<!-- 2014-06-08T17:37:43 – pezSsRUAmOnIlcEvt6LW -->
<!-- 2014-06-10T01:54:16 – LJY9l4JzxEiT5B89W1pA -->
<!-- 2014-06-14T23:53:20 – SQTtXj74luXScGKz1Zvx -->
<!-- 2014-06-15T06:12:58 – 3h7vfjUyo0x7XYWM835d -->
<!-- 2014-06-19T17:29:27 – ituoKTGzmItuTN5H3Pvq -->
<!-- 2014-06-19T20:50:04 – ZXdeT8wtuTIEdnLYHSfD -->
<!-- 2014-06-20T17:07:42 – pSN2yFcod70N0k726Zy3 -->
<!-- 2014-06-20T22:09:09 – q2iOFJHswYVy7EqZFgJz -->
<!-- 2014-06-23T17:58:13 – FKVdu2wp6KDlOdk20VgL -->
<!-- 2014-06-26T11:19:58 – yuGdJeReD2oSukjuNycN -->
<!-- 2014-06-27T04:11:49 – ELxbl4TYUzaOf2F0ra4X -->
<!-- 2014-07-01T15:18:33 – a8YniCBFMg8YGO5nuj16 -->
<!-- 2014-07-07T08:04:21 – JvRoadrviVZfd4MEFmD3 -->
<!-- 2014-07-08T18:53:23 – NFPDMGbN0sfx990Zuwu2 -->
<!-- 2014-07-09T02:53:04 – fG5UjhkXW1WDZFLpPQeL -->
<!-- 2014-07-14T17:53:27 – ezorBHM7rymoIdbidEvZ -->
<!-- 2014-07-16T02:25:21 – zGwWAaACIl0kRkY37vbk -->
<!-- 2014-07-16T18:04:20 – Mk8AxkNWgMnoEeknEZr1 -->
<!-- 2014-07-16T21:19:36 – tE1VrTYwT4q5m9WIN9qB -->
<!-- 2014-07-18T12:32:33 – E9TgHH9wjCzxy2NBLJQt -->
<!-- 2014-07-18T20:28:51 – pYz1l5hLWRZcUq6LNbbe -->
