package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/mlabouardy/recipes-api/models"
	"github.com/stretchr/testify/assert"
)

func TestListRecipesHandler(t *testing.T) {
	ts := httptest.NewServer(SetupServer())
	defer ts.Close()

	resp, err := http.Get(fmt.Sprintf("%s/recipes", ts.URL))
	defer resp.Body.Close()
	assert.Nil(t, err)
	assert.Equal(t, http.StatusOK, resp.StatusCode)
	data, _ := ioutil.ReadAll(resp.Body)

	var recipes []models.Recipe
	json.Unmarshal(data, &recipes)
	assert.Equal(t, len(recipes), 10)
}

func TestUpdateRecipeHandler(t *testing.T) {
	r := SetupServer()

	recipe := models.Recipe{
		Id:   "c0283p3d0cvuglq85log",
		Name: "Oregano Marinated Chicken",
		Tags: []string{"main", "chicken"},
	}

	raw, _ := json.Marshal(recipe)
	req, err := http.NewRequest("PUT", fmt.Sprintf("/recipes/%s", recipe.Id), bytes.NewBuffer(raw))
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Nil(t, err)
	assert.Equal(t, http.StatusOK, w.Code)
	data, _ := ioutil.ReadAll(w.Body)

	var payload map[string]string
	json.Unmarshal(data, &payload)

	assert.Equal(t, payload["message"], "Recipe has been updated")
}

func TestFindRecipeHandler(t *testing.T) {
	r := SetupServer()

	expectedRecipe := models.Recipe{
		Id:   "c0283p3d0cvuglq85log",
		Name: "Oregano Marinated Chicken",
		Tags: []string{"main", "chicken"},
	}

	req, err := http.NewRequest("GET", "/recipes/c0283p3d0cvuglq85log", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Nil(t, err)
	assert.Equal(t, http.StatusOK, w.Code)
	data, _ := ioutil.ReadAll(w.Body)

	var actualRecipe models.Recipe
	json.Unmarshal(data, &actualRecipe)

	assert.Equal(t, expectedRecipe.Name, actualRecipe.Name)
	assert.Equal(t, len(expectedRecipe.Tags), len(actualRecipe.Tags))
}

func TestDeleteRecipeHandler(t *testing.T) {
	r := SetupServer()

	req, err := http.NewRequest("DELETE", "/recipes/c0283p3d0cvuglq85log", nil)
	assert.Nil(t, err)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusOK, w.Code)
	data, _ := ioutil.ReadAll(w.Body)

	var payload map[string]string
	json.Unmarshal(data, &payload)

	assert.Equal(t, payload["message"], "Recipe has been deleted")
}
