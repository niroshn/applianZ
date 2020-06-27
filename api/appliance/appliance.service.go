package appliance

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/niroshn/applianz/webservices/cors"
)

const path = "appliances"

func handleAppliances(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		applianceList, err := getApplianceList()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		j, err := json.Marshal(applianceList)
		if err != nil {
			log.Fatal(err)
		}
		_, err = w.Write(j)
		if err != nil {
			log.Fatal(err)
		}
	case http.MethodPost:
		var appliance Appliance
		err := json.NewDecoder(r.Body).Decode(&appliance)
		if err != nil {
			log.Print(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		applianceID, err := insertAppliance(appliance)
		if err != nil {
			log.Print(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(fmt.Sprintf(`{"appliance_id":%d}`, applianceID)))
	case http.MethodOptions:
		return
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func handleAppliance(w http.ResponseWriter, r *http.Request) {
	urlPathSegments := strings.Split(r.URL.Path, fmt.Sprintf("%s/", path))
	if len(urlPathSegments[1:]) > 1 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	applianceID, err := strconv.Atoi(urlPathSegments[len(urlPathSegments)-1])
	if err != nil {
		log.Print(err)
		w.WriteHeader(http.StatusNotFound)
		return
	}
	switch r.Method {
	case http.MethodGet:
		appliance, err := getAppliance(applianceID)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		if appliance == nil {
			w.WriteHeader(http.StatusNotFound)
			return
		}
		j, err := json.Marshal(appliance)
		if err != nil {
			log.Print(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		_, err = w.Write(j)
		if err != nil {
			log.Fatal(err)
		}

	case http.MethodPut:
		var appliance Appliance
		err := json.NewDecoder(r.Body).Decode(&appliance)
		if err != nil {
			log.Print(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if *appliance.ApplianceID != applianceID {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		err = updateAppliance(appliance)
		if err != nil {
			log.Print(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
	case http.MethodDelete:
		err := removeAppliance(applianceID)
		if err != nil {
			log.Print(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

	case http.MethodOptions:
		return
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

// SetupRoutes :
func SetupRoutes(apiBasePath string) {
	appliancesHandler := http.HandlerFunc(handleAppliances)
	applianceHandler := http.HandlerFunc(handleAppliance)
	http.Handle(fmt.Sprintf("%s/%s", apiBasePath, path), cors.Middleware(appliancesHandler))
	http.Handle(fmt.Sprintf("%s/%s/", apiBasePath, path), cors.Middleware(applianceHandler))
}
