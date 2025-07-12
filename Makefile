#!/usr/bin/make

SHELL := /bin/bash
FONT_DIR = ./src/assets/fonts
BUILD = tmp

.DEFAULT_GOAL = webfonts

$(BUILD)/Lilex.zip:
	mkdir -p $(BUILD)
	wget "https://github.com/mishamyrt/Lilex/releases/latest/download/Lilex.zip" -O $(BUILD)/Lilex.zip

webfonts: $(BUILD)/Lilex.zip
	unzip -o $(BUILD)/Lilex.zip -d $(BUILD)
	mkdir -p "${FONT_DIR}"
	python3 -m venv venv
	source venv/bin/activate
	python3 -m pip install fonttools brotli

	fonttools ttLib "$(BUILD)/ttf/Lilex-Medium.ttf" --flavor woff2 -o "${FONT_DIR}/Lilex-Medium.woff2"
	fonttools ttLib "$(BUILD)/ttf/Lilex-Medium.ttf" --flavor woff -o "${FONT_DIR}/Lilex-Medium.woff"
	fonttools ttLib "$(BUILD)/ttf/Lilex-Regular.ttf" --flavor woff2 -o "${FONT_DIR}/Lilex-Regular.woff2"
	fonttools ttLib "$(BUILD)/ttf/Lilex-Regular.ttf" --flavor woff -o "${FONT_DIR}/Lilex-Regular.woff"

.PHONY: clean
clean:
	rm -rf venv ./src/assets/fonts $(BUILD)
