#!/bin/bash
set -e

if [ "$CREATE_CONTAINER" == "true" ]
then
  bundle install
  npm run build
  npm run travis
  bundle exec ctfy travis_build

elif [ "$RUN_TESTS" == "true" ]
then
  npm run test

elif [ "$PREREQ" == "true" ]
then
  npm run build
  npm run eslint

fi
