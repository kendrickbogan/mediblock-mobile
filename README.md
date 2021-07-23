# MediblockID Mobile

## Local Development

### Environment

Create a .env file with the following content, also adding the values for each
key.

```
APPCENTER_IOS_APP_SECRET=
// get from AppCenter in the iOS project under Overview
GENIUS_SCAN_LICENSE_KEY=
// get from Hugh
BASE_API_URL=
// get from Hugh
REVENUE_CAT_API_KEY=
// get from RevenueCat, you may need to get a login from Hugh
TERMS_OF_USE_URL=
// get from Hugh, but it's probably https://www.mediblock.io/terms-of-use/
PRIVACY_POLICY_URL= 
// get from Hugh, but it's probably https://www.mediblock.io/privacy-policy/
JUMIO_API_SECRET=
// get from Hugh
JUMIO_API_TOKEN=
// get from Hugh
BUGSNAG_API_KEY=
// get from Bugsnag, you may need to get a login from Hugh

```

### Setup

`yarn`

`npx pod-install`

`yarn setup`

### Run

`yarn ios`

`yarn android`

## Deployment

### AppCenter

1. Navigate to the app you want to deploy, either iOS or Android

2. Select `Build`

3. Select the branch to deploy

4. If the branch configuration has not been set up, click the down arrow next to `Configure` to clone from an existing configuration

5. Press `Build now`
