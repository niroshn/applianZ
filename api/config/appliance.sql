
-- CREATE DATABASE `applianzdb`;

CREATE TABLE `applianzdb`.`appliances` (
  `appliance_id` INT NOT NULL AUTO_INCREMENT,
  `serial_number` VARCHAR(255) NOT NULL,
  `brand` VARCHAR(60) NOT NULL,
  `model` VARCHAR(60) NOT NULL,
  `status` VARCHAR(60) NOT NULL,
  `date_bought` VARCHAR(60) NOT NULL,
  `appliance_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`appliance_id`));

INSERT INTO `applianzdb`.`appliances` (`appliance_name`, `serial_number`, `brand`, `model`, `status`, `date_bought`) VALUES ("Table Fan", "SN009", "OTIS", "GFT 9000", "", "2020-01-20") ;
INSERT INTO `applianzdb`.`appliances` (`appliance_name`, `serial_number`, `brand`, `model`, `status`, `date_bought`) VALUES ("Pressure Cooker", "SN007", "SONY", "GFH 9000", "", "2020-01-21") ;
