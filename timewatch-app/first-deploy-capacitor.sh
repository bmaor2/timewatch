#!/bin/bash
PINK='\033[0;35m'
NC='\033[0m'
if [ "$1" != "BYPASS" ]; then
	echo THIS SCRIPT SHOULD BE RUN ONLY ONCE
	echo GENERATED DIRECTORIES WILL BE DELETED
	echo ARE YOU SURE TO RUN IT? PLease INPUT YES/yes
	read ans
	if [ "$ans" != "yes" ] && [ "$ans" != "YES" ]; then
		echo leaving script
		exit
	fi

	echo cleaning UP!!!!
	[ -d node_modules ] && rm -rf node_modules
	[ -d build ] && rm -rf build
	[ -d android ] && rm -rvf android
	[ -d ios ] && rm -rf ios

	echo -n -e "${PINK}Which capacitor do you want to install? [ios/android/both] ${NC}"
	read platform
	if [ $platform != "ios" ] && [ $platform != "android" ] && [ $platform != "both" ]; then
		echo -n -e "${PINK}You have to choose ios/android/both${NC}"
		exit
	fi

	if [ ! -f "package.json" ]; then
		echo -e "${PINK}package.json does not exist. Please make sure you are in the right directory${NC}"
		exit
	fi

	if [ $platform == "ios" ] || [ $platform == "both" ]; then
		echo -n -e "${PINK} We need to install cocoapods. to continue press Y${NC}"
		read ans
		if [ $ans == 'y' ] || [ $ans == 'Y']; then
			# if sudo gem install cocoapods -n /usr/local/bin; then
			if true; then
				echo
			else
				echo -e "${PINK}Please make sure your device is ios${NC}"
				exit
			fi
		else
			echo -e "${PINK}OK, bye.."
			exit
		fi
	fi
else
	echo ANDROID PLATTFORM
	platform=android
fi
! grep -r "@capacitor/core" package.json && echo "npm install --save @capacitor/core" && echo ERROR && exit
! grep -r "@capacitor/cli" package.json && echo "npm install --save @capacitor/cli" && echo ERROR && exit
[ ! -f "capacitor.config.json" ] && echo "ADD file capicitor.config.json" && echo ERROR && exit
npm i
npm run build
if [ $? -ne 0 ]; then
	echo "ERROR ON BUILD (npm run build)"
	exit
fi
npx cap init
if [ $platform == 'ios' ] || [ $platform == 'both' ]; then
	echo
	npx cap add ios
fi
if [ $platform == 'android' ] || [ $platform == 'both' ]; then
	npx cap add android
fi

./update-capacitor-resources-into-build.sh
npx cap sync
[ -f android ] && cd android && ./gradlew assembleDebug
if [ $? -ne 0 ]; then
	echo "ERROR ON BUILD (gradlew assembleDebug)"
fi

echo ""
echo "*******************************************************************"
echo "debug APK was build successfully"
echo "you can download it using command"
printf "${PINK}adb install android/app/build/outputs/apk/debug/app-debug.apk${NC}\n"
echo "*******************************************************************"

if [ $platform == 'ios' ] || [ $platform == 'both' ]; then
	echo "To launch Xcode run:"
	printf "${PINK}npx cap open ios${NC}\n"
	echo
fi
if [ $platform == 'android' ] || [ $platform == 'both' ]; then
	echo "ensure CAPACITOR_ANDROID_STUDIO_PATH variable is set properly"
	echo 'ie: export CAPACITOR_ANDROID_STUDIO_PATH="/snap/bin/android-studio"'
	echo "you can the above command to your .bahrc file"
	echo "To launch AndroidStudio run:"
	printf "${PINK}npx cap open android${NC}"
	echo
fi
