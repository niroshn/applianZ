package appliance

// Appliance
type Appliance struct {
	ApplianceID      *int `json:"appliance_id"`
	SerialNumber   string `json:"serial_number"`
	Brand          string `json:"brand"`
	Model          string `json:"model"`
	Status   	   string `json:"status"`
	DateBought     string `json:"date_bought"`
	ApplianceName  string `json:"appliance_name"`
}
