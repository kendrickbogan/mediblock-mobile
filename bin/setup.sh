#!/usr/bin/env bash

source ./.env

plist_content="<?xml version=\"1.0\" encoding=\"UTF-8\"?><!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\"><plist version=\"1.0\"><dict><key>AppSecret</key><string>$APPCENTER_IOS_APP_SECRET</string></dict></plist>"
echo $plist_content > "./ios/AppCenter-Config.plist"

echo "✅ Added AppCenter config files for iOS"
