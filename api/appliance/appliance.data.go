package appliance

import (
	"context"
	"database/sql"
	"errors"
	"log"
	"time"

	"github.com/niroshn/applianz/webservices/database"
)

func getAppliance(applianceID int) (*Appliance, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	row := database.DbConn.QueryRowContext(ctx, `SELECT 
	*
	FROM appliances 
	WHERE appliance_id = ?`, applianceID)

	appliance := &Appliance{}
	err := row.Scan(
		&appliance.ApplianceID,
		&appliance.SerialNumber,
		&appliance.Brand,
		&appliance.Model,
		&appliance.Status,
		&appliance.DateBought,
		&appliance.ApplianceName,
	)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		log.Println(err)
		return nil, err
	}
	return appliance, nil
}

func removeAppliance(applianceID int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	_, err := database.DbConn.ExecContext(ctx, `DELETE FROM appliances where appliance_id = ?`, applianceID)
	if err != nil {
		log.Println(err.Error())
		return err
	}
	return nil
}

func getApplianceList() ([]Appliance, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	results, err := database.DbConn.QueryContext(ctx, `SELECT 
	*
	FROM appliances`)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	defer results.Close()
	appliances := make([]Appliance, 0)
	for results.Next() {
		var appliance Appliance
		results.Scan(
		&appliance.ApplianceID,
		&appliance.SerialNumber,
		&appliance.Brand,
		&appliance.Model,
		&appliance.Status,
		&appliance.DateBought,
		&appliance.ApplianceName)

		appliances = append(appliances, appliance)
	}
	return appliances, nil
}

func updateAppliance(appliance Appliance) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	if appliance.ApplianceID == nil || *appliance.ApplianceID == 0 {
		return errors.New("appliance has invalid ID")
	}
	_, err := database.DbConn.ExecContext(ctx, `UPDATE appliances SET 
		serial_number =?, 
		brand =?, 
		model=?, 
		status=?, 
		date_bought=?, 
		appliance_name=?
		WHERE appliance_id=?`,
		appliance.SerialNumber,
		appliance.Brand,
		appliance.Model,
		appliance.Status,
		appliance.DateBought,
		appliance.ApplianceName,
		appliance.ApplianceID)
	if err != nil {
		log.Println(err.Error())
		return err
	}
	return nil
}

func insertAppliance(appliance Appliance) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	result, err := database.DbConn.ExecContext(ctx, `INSERT INTO appliances  
	(serial_number, 
	brand, 
	model, 
	status, 
	date_bought, 
	appliance_name) VALUES (?, ?, ?, ?, ?, ?)`,
		appliance.SerialNumber,
		appliance.Brand,
		appliance.Model,
		appliance.Status,
		appliance.DateBought,
		appliance.ApplianceName)
	if err != nil {
		log.Println(err.Error())
		return 0, err
	}
	insertID, err := result.LastInsertId()
	if err != nil {
		log.Println(err.Error())
		return 0, err
	}
	return int(insertID), nil
}

func searchAppliance(serialNumber string, brand string, model string, status string, dateBought string) (*Appliance, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	row := database.DbConn.QueryRowContext(ctx, `SELECCT * FROM appliances WHERE  
	serial_number = ? AND
	brand = ? AND
	model = ? AND
	status = ? AND
	date_bought = ? 
	`,
		serialNumber,
		brand,
		model,
		status,
		dateBought,
	)
	appliance := &Appliance{}
	err := row.Scan(
		&appliance.ApplianceID,
		&appliance.SerialNumber,
		&appliance.Brand,
		&appliance.Model,
		&appliance.Status,
		&appliance.DateBought,
		&appliance.ApplianceName,
	)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		log.Println(err)
		return nil, err
	}
	return appliance, nil
}
