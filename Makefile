SHELL = /bin/bash
FONT_DIR = ./src/assets/fonts
BUILD = .tmp

.PHONY: build
build: deps $(FONT_DIR)/Lilex-*.woff*
	GIT_SHA=$$(git rev-parse HEAD) yarn build

.PHONY: deps
deps:
	yarn install --immutable

.PHONY: serve
serve: deps $(FONT_DIR)/Lilex-*.woff*
	GIT_SHA=$$(git rev-parse HEAD) yarn serve

$(FONT_DIR)/Lilex-*.woff* &: $(BUILD)/Lilex.zip
	unzip -o $(BUILD)/Lilex.zip -d $(BUILD)
	mkdir -p "${FONT_DIR}"

	cp $(BUILD)/webfonts/Lilex-Medium.woff*  \
	   $(BUILD)/webfonts/Lilex-Regular.woff* \
	   --target-directory="${FONT_DIR}/"

$(BUILD)/Lilex.zip:
	mkdir -p $(BUILD)
	wget --quiet "https://github.com/mishamyrt/Lilex/releases/latest/download/Lilex.zip" -O $(BUILD)/Lilex.zip

.PHONY: clean
clean:
	rm -rf $(FONT_DIR) $(BUILD)
	yarn cache clean
