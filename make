#!/usr/bin/env bash

SCRIPT=$0
ROOTNAME=$(dirname $SCRIPT)
ROOT=$(readlink -f $ROOTNAME)
ACE_DIR=$ROOT/submodules/ace
CCC_DIR=$ROOT/submodules/ccc
APP_DIR=$ROOT/app
APP_FILES="js css html resources manifest.json"

BUILD_DIR=$ROOT/build
APP_ZIP=$BUILD_DIR/cmacs.zip

if [ -d submodules/ace/build/src-min-noconflict ]; then
  build_ace=0
else
  build_ace=1
fi

VERSION=$(cat $BUILD_DIR/VERSION)
VERSION=$(echo $VERSION | awk -F. '{ print $1"."$2"."$3"."$4 + 1 }')

while getopts av: flag; do
  case $flag in
    a)
      build_ace=1
      ;;
    v) 
      VERSION=$OPTARG
      ;;
  esac
done

echo $VERSION > $BUILD_DIR/VERSION

if [ $build_ace -eq 1 ]; then
  pushd $ACE_DIR > /dev/null
  echo Building ACE...
  if npm install && node Makefile.dryice.js -m -nc; then
    echo "ACE built successfully"
  else
    echo "ERROR: Failed to build ACE"
    exit 1
  fi
  popd > /dev/null
fi

pushd $CCC_DIR > /dev/null
echo Building Ccc...
if ./make > /dev/null; then
  echo "Ccc built successfully"
else
  echo "ERROR: Failed to build Ccc"
  exit 1
fi
popd > /dev/null

ln -sf ../../submodules/ccc/ccc.min.js $APP_DIR/js/ccc.js
ln -sf ../../submodules/ace/build/src-min-noconflict $APP_DIR/js/ace

sed s/99.99.99.99/$VERSION/ $APP_DIR/manifest.json.in > $APP_DIR/manifest.json

if [ ! -d $BUILD_DIR ]; then mkdir $BUILD_DIR; fi
pushd $APP_DIR > /dev/null
echo Creating zip file for upload...
rm $APP_ZIP
zip -r9 $APP_ZIP $APP_FILES > /dev/null
popd > /dev/null

pushd $BUILD_DIR > /dev/null
rm -rf cmacs 2> /dev/null
mkdir cmacs
pushd cmacs > /dev/null
unzip ../cmacs.zip > /dev/null
popd > /dev/null
popd > /dev/null

echo "Great success!"

