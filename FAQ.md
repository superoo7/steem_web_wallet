# Frequently Asked Question (FAQ)

**DISCLAIMER**

This app are still under development, so it might have breaking change and buggy. Please use it with care. The password are not kept anywhere in the app, so you need to remember it.

## About Steem Wallet

### 1. What is Steem Wallet?

![SWW logo](https://steemitimages.com/0x0/https://ipfs.busy.org/ipfs/QmVZL3XdJJtN71SrR2WJPbC248Q235SfRzMWuWueecudh1)
Steem Web Wallet, also known as SWW in short. A Steem wallet that can be used on modern web browser, to do micro payment with ease.

### 2. How does it work?

SWW used AES encryption which is common approach that being used by Vessel, Steem Wallet and LastPass, in order to encrypt sensitive data with an easy to remember password. SWW use AES to encrypt Steem Active Key, and users are required to remember the password that they set. The hashed version of the active key is kept in IndexedDB on the browser engine.

**SWW has no responsible on any lost password.**

### 3. How can I contact the developer?

SWW is developed and mantain by [@superoo7](https://steemit.com/@superoo7). You can email me at **johnsonlwh7@gmail.com**.

## Developer site

### 1. Is this project open source?

This project is open source and all the codes are hosted on Github. You can checkout the [Github Repository here](https://github.com/superoo7/steem_web_wallet).

### 2. What license do SWW use?

MIT

### 3. What technology stack is being used by SWW?

SWW used mostly front end tools to make it work (React, TypeScript, Redux, RxJS, DSteem, Scss), there is no backend involved in this app.

### 4. How can I contribute?

This project has Travis CI for Continuous Intergration, and also deployed automatically to Netlify at https://swallet.netlify.com/ . Pull Request and Issues filling are welcome on github.
