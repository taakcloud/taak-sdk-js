<p align="center">
<img src="https://taakcloud.com/assets/img/appicon.svg" width="250" alt="dev-to-js">
</p>
<h1 align="center">
taak-sdk-js
</h1>
<p align="center">
A tiny, universal client for the Taakcloud.com API written in Typescript.
</p>

<div>
<a href="https://www.npmjs.com/package/taak-sdk"><img src="https://img.shields.io/npm/v/taak-sdk" alt="taak-sdk"></a>
<a href="https://unpkg.com/taak-sdk"><img src="https://img.badgesize.io/https://unpkg.com/taak-sdk@1.1.0/dist/index.js?compression=gzip" alt="gzip size"></a>
<a href="https://unpkg.com/taak-sdk"><img src="https://img.badgesize.io/https://unpkg.com/taak-sdk@1.1.0/dist/index.js?compression=brotli" alt="brotli size"></a>
</div>

## ✨ Features:
- Tiny <1KB size gzip
- Works in Node.js and in Browser
- Built-in Typescript support

## 🔧 Installation

```bash
npm i taak-sdk
```

## 🌐 Usage

Import `taak-sdk` module in your project and initialize it with your [apiKey](https://taakcloud.com/apps/credentials).

```js
import TaakSDK from 'taak-sdk'

const TaakSdkClient = new TaakSDK({ apiKey: '%apiKey%' })

TaakSdkClient.getWebPushesByUserId('user-id-001').then((data) => {
    console.log(data)
})

```
