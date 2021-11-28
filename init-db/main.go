package main

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var recipes []Recipe

type Recipe struct {
	ID           string    `json:"id" bson:"id"`
	Name         string    `json:"name" bson:"name"`
	Tags         []string  `json:"tags" bson:"tags"`
	Ingredients  []string  `json:"ingredients" bson:"ingredients"`
	Instructions []string  `json:"instructions" bson:"instructions"`
	PublishedAt  time.Time `json:"publishedAt" bson:"publishedAt"`
}

func main() {
	recipes = make([]Recipe, 0)
	file, _ := ioutil.ReadFile("recipes.json")
	err := json.Unmarshal([]byte(file), &recipes)
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err != nil {
		panic(err)
	}
	if err = client.Ping(context.TODO(), readpref.Primary()); err != nil {
		log.Fatal(err)
	}
	log.Println("Connected to MongoDB")

	var listOfRecipes []interface{}
	for _, recipe := range recipes {
		listOfRecipes = append(listOfRecipes, recipe)
	}
	collection := client.Database(os.Getenv("MONGO_DATABASE")).Collection("recipes")
	insertManyResult, err := collection.InsertMany(ctx, listOfRecipes)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Inserted recipes: ", len(insertManyResult.InsertedIDs))

}
