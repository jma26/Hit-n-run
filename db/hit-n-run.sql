-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Hit-n-run
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Hit-n-run
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Hit-n-run` DEFAULT CHARACTER SET utf8 ;
USE `Hit-n-run` ;

-- -----------------------------------------------------
-- Table `Hit-n-run`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hit-n-run`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `email` VARCHAR(100) NULL,
  `password` VARCHAR(128) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hit-n-run`.`Incidents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hit-n-run`.`Incidents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `longitude` DOUBLE NULL,
  `latitude` DOUBLE NULL,
  `time_of_accident` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP,
  `User_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Incidents_User_idx` (`User_id` ASC),
  CONSTRAINT `fk_Incidents_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `Hit-n-run`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
