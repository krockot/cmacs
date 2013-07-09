#!/usr/bin/env bash

SCRIPT=$0
ROOTNAME=$(dirname $SCRIPT)
ROOT=$(readlink -f $ROOTNAME)
ACE_DIR=$ROOTNAME/submodules/ace
CCC_DIR=$ROOTNAME/submodules/ccc
