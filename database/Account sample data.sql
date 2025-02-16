INSERT INTO public."Accounts" (role, name, email, password, phone, address, birthday, gender, reputation_point, created_at, status) 
VALUES
    ('Admin', 'Alice Johnson', 'alice@example.com', 'hashed_password1', '1234567890', '123 Main St, City', '1990-05-15 00:00:00+00', 'Female', 100, NOW(), 1),
    ('Client', 'Bob Smith', 'bob@example.com', 'hashed_password2', '2345678901', '456 Oak St, City', '1985-08-22 00:00:00+00', 'Male', 75, NOW(), 1),
    ('Client', 'Charlie Brown', 'charlie@example.com', 'hashed_password3', '3456789012', '789 Pine St, City', '1992-03-10 00:00:00+00', 'Male', 50, NOW(), 1),
    ('Client', 'Diana Ross', 'diana@example.com', 'hashed_password4', '4567890123', '101 Maple St, City', '1988-07-30 00:00:00+00', 'Female', 120, NOW(), 1),
    ('Freelancer', 'Edward King', 'edward@example.com', 'hashed_password5', '5678901234', '202 Birch St, City', '1995-11-25 00:00:00+00', 'Male', 60, NOW(), 1),
    ('Freelancer', 'Fiona Green', 'fiona@example.com', 'hashed_password6', '6789012345', '303 Cedar St, City', '1993-09-18 00:00:00+00', 'Female', 80, NOW(), 1),
    ('Admin', 'George White', 'george@example.com', 'hashed_password7', '7890123456', '404 Elm St, City', '1980-06-05 00:00:00+00', 'Male', 110, NOW(), 1),
    ('Staff', 'Hannah Black', 'hannah@example.com', 'hashed_password8', '8901234567', '505 Walnut St, City', '1996-12-12 00:00:00+00', 'Female', 90, NOW(), 1),
    ('Admin', 'Ian Miller', 'ian@example.com', 'hashed_password9', '9012345678', '606 Chestnut St, City', '1983-04-08 00:00:00+00', 'Male', 130, NOW(), 1),
    ('Staff', 'Julia Adams', 'julia@example.com', 'hashed_password10', '0123456789', '707 Spruce St, City', '1991-02-20 00:00:00+00', 'Female', 70, NOW(), 1);
