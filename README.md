# neuroid-reactnative-sdk

Neuro-ID React Native SDK

## Beta & General Release

The Neuro-ID React Native SDK is currently still in private beta and not intended for general public use. For any questions, please contact your Neuro-ID sales representative for more information.

## Installation

- `yarn` from root directory
- Run `npm run updateSDK` in order to pull latest NeuroID Pod from Github and have it added to XCode project. Add the files to XCode, in the left hand rail file explorer. Make sure to select the TARGET when adding
- Add sqlite3 compiler options

If you are on a M1, install Podfile with `arch -x86_64 pod install` if you get stucks

## Usage

Run the example:
`yarn example ios`

```js
import { configure } from 'neuroid-reactnative-sdk';
configure('YOUR API KEY');
```

## Distributing to via Fastlane

Set the following in your ~/.zshrc with the following for iOS distribution.

Create an app store specific password here: https://appleid.apple.com/account/manage

ENV["SPACESHIP_2FA_SMS_DEFAULT_PHONE_NUMBER"]
ENV["FASTLANE_USER"]
ENV["FASTLANE_PASSWORD"]
ENV["FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD"]

`cd example/ios && fastlane beta`

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

Bad cache? `npx react-native start --reset-cache`

## License

MIT
