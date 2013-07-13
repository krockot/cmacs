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

VERSION=99.99.99.99

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

if [ $build_ace -eq 1 ]; then
  cd $ACE_DIR
  echo Building ACE...
  if npm install && node Makefile.dryice.js -m -nc; then
    echo "ACE built successfully"
  else
    echo "ERROR: Failed to build ACE"
    exit 1
  fi
fi

cd $CCC_DIR
echo Building Ccc...
if ./make; then
  echo "Ccc built successfully"
else
  echo "ERROR: Failed to build Ccc"
  exit 1
fi

echo Concatenating editor scripts...
cd $APP_DIR/js
cat $(find editor -name '*.js') > editor.js

ln -sf ../../submodules/ccc/ccc.min.js $APP_DIR/js/ccc.js
ln -sf ../../submodules/ace/build/src-min-noconflict $APP_DIR/js/ace

sed s/99.99.99.99/$VERSION/ $APP_DIR/manifest.json.in |
  sed s/\"key\".*// > $APP_DIR/manifest.json

if [ ! -d $BUILD_DIR ]; then mkdir $BUILD_DIR; fi
cd $APP_DIR
echo Creating zip file for upload...
rm $APP_ZIP
zip -r9 $APP_ZIP $APP_FILES > /dev/null

cd $BUILD_DIR
rm -rf cmacs 2> /dev/null
mkdir cmacs
cd cmacs
unzip ../cmacs.zip > /dev/null
cp $APP_DIR/manifest.json.in manifest.json

echo "Great success!"

