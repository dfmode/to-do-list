all:
	tsc
	docker build -t nikita757/todobackend .
	docker compose up

build:
	tsc
	docker build -t nikita757/todobackend .
	docker push nikita757/todobackend

run:
	tsc
	node app.js
