package main

import (
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/niroshn/applianz/webservices/database"
	"github.com/niroshn/applianz/webservices/appliance"
)

const basePath = "/api"

func main() {
	database.SetupDatabase()
	appliance.SetupRoutes(basePath)
	log.Fatal(http.ListenAndServe(":5000", nil))
}
