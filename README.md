# Steem Web Wallet

[![Build Status](https://travis-ci.org/superoo7/steem_web_wallet.svg?branch=master)](https://travis-ci.org/superoo7/steem_web_wallet)

![LOGO of SWW](https://ipfs.busy.org/ipfs/QmVZL3XdJJtN71SrR2WJPbC248Q235SfRzMWuWueecudh1)

Steem Web Wallet, also known as SWW in short. A Steem wallet that can be used on modern web browser, to do micro payment with ease.

![Demo Page](https://ipfs.busy.org/ipfs/QmVejukXfLJuSmtHPyzx3gjrYazZEDXHraELzCXUk8ikEf)

Master Branch is live on https://swallet.netlify.com

## Current feature

- Login and logout with Steem Active Key, the active key is being encrypted with AES and stored in IndexedDB
- Make transaction with memo
- Scan QR code to make transaction
- Generate QR code for transaction
- Claim discounted account with Resource Credit
- Progressive Web App (Add to homescreen, manifest.json, cache)
- Change API in settings
- Support test net API (implemented, but not tested)

## Roadmap (Plan to add soon)

-   Register new account with Claimed Discounted Account or Resource Credit
-   Support more keys (Owner Key)
-   Support multiple account and export account with QR code
-   Encrypted memo for transaction
-   Add Transaction History into Profile
-   Add Currency Conversion
-   End-to-End testing
-   Snapshot testing
-   Progressive Web App (half way done)
-   Change API in the Settings page. (Done but need to add in race condition for failed api call)
-   Reduce Web Sizes by using Preact, GZip, CDN
-   Add Copy to clipboard onto all the input field in the QR code page

## Development

-   `yarn dev` or `npm run dev` to start development server.
-   `yarn test` or `npm run test` to test the web app.
-   `yarn static` or `npm run static` to generate production version of the app.

## License

MIT
