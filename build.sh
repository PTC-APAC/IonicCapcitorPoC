#!/usr/bin/env bash

while getopts ":e:p:" opt; do
  case $opt in
    e) env="$OPTARG"
    ;;
    p) platform="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    ;;
  esac
done

if [ ! -z "$env" ]; then
  printf "Env now: $env"
  # cp -a environments/$env/.env .env
  # cp -a environments/$env/google-services.json android/app/google-services.json
  # cp -a environments/$env/GoogleService-Info.plist ios/Runner/GoogleService-Info.plist
  printf "\nFinish"

  if [ ! -z "$platform" ]; then
    printf "\nPlatform now: $platform\n"
    if [ "$platform" == "ios" ]; then
      # capacitor copy ios
      # ng run app:build
      # capacitor sync ios
      /usr/bin/xcodebuild archive   \
        -project MyApp.xcodeproj  \
        -scheme MyApp             \
        -archivePath MyApp
    elif [ "$platform" == "android" ]; then
      ionic capacitor copy android
      ionic capacitor build android
    else
      printf "\nPlatform invalid.\n"
    fi
  else 
    printf "\nPlatform must be set.\n"
  fi
else
  printf "\nEnvironment must be set.\n"
fi

