CREATE DATABASE radical_work_management;


CREATE TABLE employee_info(
    emp_id BIGSERIAL PRIMARY KEY,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    dob VARCHAR(50) NOT NULL,
    age VARCHAR(20) NOT NULL,
    blood_group VARCHAR(20) NOT NULL,
    marital_status VARCHAR(50) NOT NULL,
    guardian_name VARCHAR(100) NOT NULL,
    ph_no VARCHAR(200) UNIQUE NOT NULL,
    user_status BOOLEAN NOT NULL,
    password VARCHAR(250) NOT NULL
);

CREATE TABLE address(
    add_id SERIAL PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    pincode INT NOT NULL,
    building_name VARCHAR(200) NOT NULL,
    area VARCHAR(100) NOT NULL,
    landmark VARCHAR(200),
    city VARCHAR(200) NOT NULL,
    state VARCHAR(200) NOT NULL,
    country VARCHAR(200) NOT NULL
);

CREATE TABLE job_info(
    job_id SERIAL PRIMARY KEY,
    doj VARCHAR(200) NOT NULL,
    account_no VARCHAR(200) NOT NULL UNIQUE,
    ifsc_code VARCHAR(100) NOT NULL,
    salary VARCHAR(200) NOT NULL
);

CREATE TABLE emergency_contact(
    contact_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200) NOT NULL,
    relation VARCHAR(50) NOT NULL,
    salary VARCHAR(200) NOT NULL,
    ph_no VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE leave_request(
    leave_id SERIAL PRIMARY KEY,
    requested_on VARCHAR(100) NOT NULL,
    leave_type VARCHAR(50) NOT NULL,
    from_date VARCHAR(100) NOT NULL,
    to_date VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL
);