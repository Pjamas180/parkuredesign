drop database if exists parkudb;

create database if not exists parkudb;

use parkudb;

drop table if exists users;
drop table if exists vehicles;
drop table if exists parking_lots;

create table if not exists users (
	userId integer primary key auto_increment,
	username varchar(100) unique,
	password varchar(100),
	vehicle varchar(100)
) engine=innodb;

create table if not exists vehicles (
	vehicleId integer primary key auto_increment,
	userId integer not null,
	vehicleName varchar(100) not null,
	licen	sePlateNumber varchar(100) not null,
	foreign key (userId)
		references users(userId)
		on update cascade on delete restrict

) engine=innodb;

create table if not exists parking_lots (
	parking_lotId integer primary key auto_increment,
	lotName varchar(100) not null,
	lotNumber varchar(100)
) engine=innodb;