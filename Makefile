#!/usr/bin/make

SHELL = /bin/bash
FONT_DIR = ./src/assets/fonts
BUILD = .tmp

# Python Environment
VENV = .venv
VENV_PYTHON = $(VENV)/bin/python
SYSTEM_PYTHON= $(or $(shell which python3), $(shell which python))

.PHONY: build
build: deps
	GIT_SHA=$$(git rev-parse HEAD) yarn build

.PHONY: deps
deps: webfonts
	yarn install --immutable

.PHONY: serve
serve: webfonts
	GIT_SHA=$$(git rev-parse HEAD) yarn serve

.PHONY: webfonts
webfonts: $(BUILD)/Lilex.zip $(VENV_PYTHON)
	unzip -o $(BUILD)/Lilex.zip -d $(BUILD)
	mkdir -p "${FONT_DIR}"

	$(VENV)/bin/fonttools ttLib "$(BUILD)/ttf/Lilex-Medium.ttf" --flavor woff2 -o "${FONT_DIR}/Lilex-Medium.woff2"
	$(VENV)/bin/fonttools ttLib "$(BUILD)/ttf/Lilex-Medium.ttf" --flavor woff -o "${FONT_DIR}/Lilex-Medium.woff"
	$(VENV)/bin/fonttools ttLib "$(BUILD)/ttf/Lilex-Regular.ttf" --flavor woff2 -o "${FONT_DIR}/Lilex-Regular.woff2"
	$(VENV)/bin/fonttools ttLib "$(BUILD)/ttf/Lilex-Regular.ttf" --flavor woff -o "${FONT_DIR}/Lilex-Regular.woff"

$(BUILD)/Lilex.zip:
	mkdir -p $(BUILD)
	wget "https://github.com/mishamyrt/Lilex/releases/latest/download/Lilex.zip" -O $(BUILD)/Lilex.zip

$(VENV_PYTHON):
	$(SYSTEM_PYTHON) -m venv $(VENV)
	$(VENV_PYTHON) -m pip install fonttools brotli

.PHONY: clean
clean:
	rm -rf $(VENV) $(FONT_DIR) $(BUILD)
