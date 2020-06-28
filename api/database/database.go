package database

import (
	"database/sql"
	"log"
	"time"
)

var DbConn *sql.DB

// SetupDatabase
func SetupDatabase() {
	var err error
	DbConn, err = sql.Open("mysql", "root:@7870abcd@tcp(database-1.c9xxxtihqjho.us-east-1.rds.amazonaws.com:3306)/applianzdb")
	if err != nil {
		log.Fatal(err)
	}
	DbConn.SetMaxOpenConns(3)
	DbConn.SetMaxIdleConns(3)
	DbConn.SetConnMaxLifetime(60 * time.Second)
}
