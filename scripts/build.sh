#!/bin/sh

babel index.js -d build/
babel app -d build/app
cp env.example build/.env
