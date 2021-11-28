run:
	MONGO_URI="mongodb://admin:password@localhost:27017/demo?authSource=admin" MONGO_DATABASE=demo go run main.go

test:
	MONGO_URI="mongodb://admin:password@localhost:27017/demo?authSource=admin" MONGO_DATABASE=demo go test

newman:
	newman run recipes_api_postman_collection.json --env-var "url=http://localhost:8080"