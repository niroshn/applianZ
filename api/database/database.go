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
	DbConn, err = sql.Open("mysql", "root:7870@VvV@tcp(127.0.0.1:3306)/applianzdb")
	if err != nil {
		log.Fatal(err)
	}
	DbConn.SetMaxOpenConns(3)
	DbConn.SetMaxIdleConns(3)
	DbConn.SetConnMaxLifetime(60 * time.Second)
}
