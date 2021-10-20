docker-build:
	docker build . -f ./Dockerfile -t cemento-serice -q

docker-run:
	docker run -p 5000:5000 cemento-serice