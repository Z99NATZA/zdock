.PHONY: preview preview-desktop

preview:
	python3 -m http.server 8765 --bind 127.0.0.1 --directory preview

preview-desktop:
	bash preview/run-desktop.sh
