package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// swagger:parameters recipes newRecipe
type Recipe struct {
	//swagger:ignore
	ID           primitive.ObjectID `json:"_id" bson:"_id"`
	Id           string             `json:"id" bson:"id"`
	Name         string             `json:"name" bson:"name"`
	Tags         []string           `json:"tags" bson:"tags"`
	Ingredients  []string           `json:"ingredients" bson:"ingredients"`
	Instructions []string           `json:"instructions" bson:"instructions"`
	PublishedAt  time.Time          `json:"publishedAt" bson:"publishedAt"`
}
