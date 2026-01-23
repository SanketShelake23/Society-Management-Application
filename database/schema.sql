use societydb;

CREATE TABLE societies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15),
  password VARCHAR(255) NOT NULL,

  role ENUM(
    'SUPER_ADMIN',
    'SOCIETY_ADMIN',
    'COMMITTEE_MEMBER',
    'RESIDENT',
    'GUARD',
    'ACCOUNTANT'
  ) NOT NULL,
  

  society_id INT NULL,   -- NULL allowed for SUPER_ADMIN
  status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (society_id) REFERENCES societies(id)
);

CREATE TABLE blocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  society_id INT NOT NULL,

  FOREIGN KEY (society_id) REFERENCES societies(id)
);

CREATE TABLE flats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  flat_number VARCHAR(20) NOT NULL,
  block_id INT NOT NULL,
  resident_id INT NULL,

  FOREIGN KEY (block_id) REFERENCES blocks(id),
  FOREIGN KEY (resident_id) REFERENCES users(id)
);


CREATE TABLE bills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  flat_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  billing_month VARCHAR(20),
  due_date DATE,
  status ENUM('PENDING','PAID') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (flat_id) REFERENCES flats(id)
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bill_id INT NOT NULL,
  amount DECIMAL(10,2),
  payment_mode VARCHAR(50),
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (bill_id) REFERENCES bills(id)
);

CREATE TABLE complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  resident_id INT NOT NULL,
  society_id INT NOT NULL,
  title VARCHAR(100),
  description TEXT,
  status ENUM('OPEN','IN_PROGRESS','RESOLVED') DEFAULT 'OPEN',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (resident_id) REFERENCES users(id),
  FOREIGN KEY (society_id) REFERENCES societies(id)
);

CREATE TABLE notices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  society_id INT NOT NULL,
  title VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (society_id) REFERENCES societies(id)
);

CREATE TABLE visitor_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  visitor_name VARCHAR(100),
  flat_id INT NOT NULL,
  guard_id INT NOT NULL,
  entry_time TIMESTAMP,
  exit_time TIMESTAMP,

  FOREIGN KEY (flat_id) REFERENCES flats(id),
  FOREIGN KEY (guard_id) REFERENCES users(id)
);


select * from users;
select * from societies;
select * from blocks;
select * from flats;
select * from complaints;
select * from notices;



insert into complaints (resident_id, society_id, title, description) values (8,1,"Air Problem", "Air quality index goes lower due to nearby factories.");