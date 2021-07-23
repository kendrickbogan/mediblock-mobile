#!/usr/bin/env bash

echo "√ Running post-clone script"

plist_content="<?xml version=\"1.0\" encoding=\"UTF-8\"?><!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\"><plist version=\"1.0\"><dict><key>AppSecret</key><string>$APPCENTER_IOS_APP_SECRET</string></dict></plist>"
echo $plist_content > "./ios/AppCenter-Config.plist"

echo APPCENTER_IOS_APP_SECRET=$APPCENTER_IOS_APP_SECRET >> .env
echo BASE_API_URL=$BASE_API_URL >> .env
echo BUGSNAG_API_KEY=$BUGSNAG_API_KEY >> .env
echo GENIUS_SCAN_LICENSE_KEY=$GENIUS_SCAN_LICENSE_KEY >> .env
echo JUMIO_API_SECRET=$JUMIO_API_SECRET >> .env
echo JUMIO_API_TOKEN=$JUMIO_API_TOKEN >> .env
echo PRIVACY_POLICY_URL=$PRIVACY_POLICY_URL >> .env
echo REVENUE_CAT_API_KEY=$REVENUE_CAT_API_KEY >> .env
echo TERMS_OF_USE_URL=$TERMS_OF_USE_URL >> .env
