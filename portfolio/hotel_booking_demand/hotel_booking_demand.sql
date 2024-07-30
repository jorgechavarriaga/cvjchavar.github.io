-- ----------------------------------------------------------------------------------------------
-- NAME: JORGE CHAVARRIAGA																	-----
-- DATE: 2024/06/19																			-----
-- PROJECT: Hotel Booking Demand															-----
-- DATASET SOURCE:  https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand		-----
-- LANGUAGE: MySQL 8.0.33																	-----
-- ----------------------------------------------------------------------------------------------

-- ****************************** 1. Create database     							******************************

CREATE DATABASE IF NOT EXISTS hotel_booking_demand;

-- Check if DB was successfully created
SHOW DATABASES;

-- ****************************** 2. Import Data         							******************************

-- ****************************** 3. Check created table 							******************************
SELECT *
FROM hotel_bookings hb ;

-- ****************************** 4. Create a staging table 						******************************
CREATE TABLE hotel_bookings_staging 
LIKE hotel_bookings;

-- Check table structure
SELECT *
FROM hotel_bookings_staging hbs ;

-- Copy raw data from original table
INSERT hotel_bookings_staging 
SELECT *
FROM hotel_bookings ;

-- Check table's copy with data
SELECT *
FROM hotel_bookings_staging hbs ;

-- Drop table
DROP TABLE hotel_bookings_staging ;

-- Create table and copy data in 1 step
CREATE TABLE hotel_bookings_staging AS
SELECT * FROM hotel_bookings;

-- Check table's copy with data
SELECT *
FROM hotel_bookings_staging hbs ;

-- ****************************** 5. Identify & Remove Duplicates if they exist		******************************
-- As we don't have unique identifiers (such as hotel name, room, user ID, etc.) to check if a row is duplicated,
-- we are going to assume there are no duplicates.

-- ****************************** 6. Standardizing data								******************************
-- Standardize the format of each column in the hotel_booking_demand dataset
-- Changing COLUMN TYPE could also be handled during the data import process.

SELECT *
FROM hotel_bookings_staging hbs;

-- Column: hotel - Only 2 values and they are correct
SELECT DISTINCT hotel
FROM hotel_bookings_staging;

-- Column: is_canceled - Only 2 values ('1' and '0') and they are correct, but we can change the column type to boolean
SELECT DISTINCT is_canceled
FROM hotel_bookings_staging;

-- Step 1: Update the column to ensure all values are correctly formatted (if needed)
UPDATE hotel_bookings_staging
SET is_canceled = CASE
    WHEN is_canceled = '1' THEN 1
    WHEN is_canceled = '0' THEN 0
    ELSE is_canceled
END;

-- Step 2: Alter the column type to TINYINT(1) which is used for boolean values in MySQL
ALTER TABLE hotel_bookings_staging
MODIFY COLUMN is_canceled TINYINT(1);

-- Column: lead_time
SELECT lead_time 
FROM hotel_bookings_staging hbs
ORDER BY lead_time ASC;

-- Convert the column type to INT
ALTER TABLE hotel_bookings_staging 
MODIFY COLUMN lead_time INT;

-- Column: arrival_date_year
SELECT arrival_date_year
FROM hotel_bookings_staging hbs 
ORDER BY arrival_date_year ASC;

-- Convert the column type to INT
ALTER TABLE hotel_bookings_staging 
MODIFY COLUMN arrival_date_year INT;

-- Column: arrival_date_month
SELECT DISTINCT arrival_date_month
FROM hotel_bookings_staging hbs 
ORDER BY arrival_date_month ASC;

-- Check if arrival_date_month is within a specific set of months
SELECT arrival_date_month, COUNT(arrival_date_month)
FROM hotel_bookings_staging
WHERE arrival_date_month IN ('April', 'August', 'December', 'February', 'January', 'July', 'June', 'March', 'May', 'November', 'October', 'September')
GROUP BY arrival_date_month;

-- Column: arrival_date_week_number
SELECT DISTINCT arrival_date_week_number
FROM hotel_bookings_staging hbs 
ORDER BY arrival_date_week_number ASC;

-- Convert the column type to INT
ALTER TABLE hotel_bookings_staging 
MODIFY COLUMN arrival_date_week_number INT;

-- Check if week number is valid (between 1 and 53)
SELECT COUNT(*)
FROM hotel_bookings_staging hbs 
WHERE hbs.arrival_date_week_number <1 or hbs.arrival_date_week_number > 53;

-- Column: arrival_date_day_of_month
SELECT DISTINCT arrival_date_day_of_month
FROM hotel_bookings_staging hbs 
ORDER BY arrival_date_day_of_month ASC;

-- Convert the column type to INT
ALTER TABLE hotel_bookings_staging 
MODIFY COLUMN arrival_date_day_of_month INT;

-- Check if day of month is valid (between 1 and 31)
SELECT COUNT(*)
FROM hotel_bookings_staging hbs 
WHERE hbs.arrival_date_day_of_month <1 or hbs.arrival_date_day_of_month > 31;

-- Column: stays_in_week_nights
SELECT DISTINCT stays_in_week_nights
FROM hotel_bookings_staging hbs 
ORDER BY stays_in_week_nights ASC;

-- Convert the column type to INT
ALTER TABLE hotel_bookings_staging 
MODIFY COLUMN stays_in_week_nights INT;

-- Column: adults, children, babies
SELECT DISTINCT adults, children, babies 
FROM hotel_bookings_staging hbs 
ORDER BY adults , children, babies ;

-- Column children has 4 values as NA
SELECT children, count(*)
FROM hotel_bookings_staging hbs
GROUP BY children;

UPDATE hotel_bookings_staging 
SET children = NULL
WHERE children = 'NA' 

-- Convert columns to INT type
ALTER TABLE hotel_bookings_staging 
MODIFY COLUMN adults INT,
MODIFY COLUMN children INT,
MODIFY COLUMN babies INT;

-- Column: meal
SELECT DISTINCT meal
FROM hotel_bookings_staging hbs 
ORDER BY 1;

-- Column: country
SELECT DISTINCT country, LENGTH(country) 
FROM hotel_bookings_staging hbs 
ORDER BY 2 DESC;

-- UPDATE country 'NULL' to NULL
UPDATE hotel_bookings_staging 
SET country = NULL
WHERE country = 'NULL';

-- Count occurrences of each country and order by count descending
SELECT country, COUNT(*) AS count
FROM hotel_bookings_staging
GROUP BY country
ORDER BY count DESC;

-- Column: market_segment
SELECT market_segment, COUNT(*) AS count
FROM hotel_bookings_staging hbs 
GROUP BY market_segment 
ORDER BY 2 DESC;

-- Column: distribution_channel
SELECT distribution_channel, COUNT(*) AS count
FROM hotel_bookings_staging hbs 
GROUP BY distribution_channel 
ORDER BY 2 DESC;

-- Column: is_repeated_guest, previous_cancellations, previous_bookings_not_canceled
SELECT DISTINCT is_repeated_guest, previous_cancellations, previous_bookings_not_canceled
FROM hotel_bookings_staging hbs 
ORDER BY 1,2,3;

-- Convert columns to INT type
ALTER TABLE hotel_bookings_staging 
MODIFY COLUMN is_repeated_guest INT,
MODIFY COLUMN previous_cancellations INT,
MODIFY COLUMN previous_bookings_not_canceled INT;

-- Column: reserved_room_type
SELECT reserved_room_type, COUNT(*) AS count
FROM hotel_bookings_staging hbs 
GROUP BY reserved_room_type
ORDER BY 1;

-- Column: assigned_room_type
SELECT assigned_room_type, COUNT(*) AS count
FROM hotel_bookings_staging hbs 
GROUP BY assigned_room_type
ORDER BY 1;

-- Column: booking_changes
SELECT DISTINCT booking_changes
FROM hotel_bookings_staging hbs 
ORDER BY 1;

-- Convert the column type to INT
ALTER TABLE hotel_bookings_staging 
MODIFY COLUMN booking_changes INT;

-- Column: deposit_type
SELECT deposit_type, COUNT(*) AS count
FROM hotel_bookings_staging hbs 
GROUP BY deposit_type
ORDER BY 1;

-- Column: agent
SELECT agent, COUNT(*) AS count
FROM hotel_bookings_staging hbs 
GROUP BY agent
ORDER BY 2 DESC;

-- UPDATE agent 'NULL' to NULL
UPDATE hotel_bookings_staging 
SET agent = NULL
WHERE agent = 'NULL';

-- Column: company
SELECT company, COUNT(*) AS count
FROM hotel_bookings_staging hbs 
GROUP BY company
ORDER BY 2 DESC;

-- UPDATE company 'NULL' to NULL
UPDATE hotel_bookings_staging 
SET company = NULL
WHERE company = 'NULL';

-- Convert columns to INT type
ALTER TABLE hotel_bookings_staging 
MODIFY COLUMN company INT,
MODIFY COLUMN agent INT;

-- Column: days_in_waiting_list
SELECT days_in_waiting_list, COUNT(*) AS count
FROM hotel_bookings_staging hbs 
GROUP BY days_in_waiting_list
ORDER BY 2 DESC;

-- Convert columns to INT type
ALTER TABLE hotel_bookings_staging 
MODIFY COLUMN days_in_waiting_list INT;

-- Column: customer_type
SELECT customer_type, COUNT(*) AS count
FROM hotel_bookings_staging hbs 
GROUP BY customer_type
ORDER BY 2 DESC;

-- Column: adr, required_car_parking_spaces , total_of_special_requests 
SELECT DISTINCT adr, required_car_parking_spaces , total_of_special_requests 
FROM hotel_bookings_staging hbs 
ORDER BY 1,2,3;

-- Convert columns to FLOAT/INT type
ALTER TABLE hotel_bookings_staging 
MODIFY COLUMN adr FLOAT,
MODIFY COLUMN required_car_parking_spaces INT,
MODIFY COLUMN total_of_special_requests INT;

-- Column: reservation_status
SELECT reservation_status, COUNT(*) AS count
FROM hotel_bookings_staging hbs 
GROUP BY reservation_status
ORDER BY 2 DESC;

-- Column: reservation_status_date
SELECT reservation_status_date, COUNT(*) AS count
FROM hotel_bookings_staging hbs 
GROUP BY reservation_status_date
ORDER BY 1 DESC;

-- Convert columns to DATE type
ALTER TABLE hotel_bookings_staging 
MODIFY COLUMN reservation_status_date DATE;

-- ****************************** 7. Null values or blank values							******************************
-- NULL values must be updated to 0 for:
-- children, agent, company

-- Update NULL values in children, agent, and company columns to 0
UPDATE hotel_bookings_staging 
SET children = COALESCE(children, 0),
    agent = COALESCE(agent, 0),
    company = COALESCE(company, 0);
   
SELECT * FROM hotel_bookings_staging hbs ;

-- ****************************** 8. ANALYSIS											******************************

-- Distribution of Hotel Bookings by Country (count & percentage)
SELECT 
    country, 
    count, 
    ROUND((count / total_count) * 100, 1) AS percentage
FROM (SELECT 
        country, 
        COUNT(country) AS count
    FROM hotel_bookings_staging
    WHERE is_canceled = 0
    GROUP BY country) AS country_counts
JOIN (SELECT 
        COUNT(*) AS total_count 
    FROM hotel_bookings_staging 
    WHERE is_canceled = 0) AS total
ORDER BY count DESC
LIMIT 10;

/*
 * Conclusion: The highest number of bookings comes from Portugal, indicating a strong local market presence
 * */


-- Analysis of Guest Demographics
SET @adult_median = (WITH Numbered AS (
SELECT
adults,
COUNT(*) OVER () AS total_count,
ROW_NUMBER() OVER (ORDER BY adults) AS row_num
FROM hotel_bookings_staging
WHERE is_canceled = 0
)
SELECT adults
FROM Numbered
WHERE row_num IN ((total_count + 1) / 2, (total_count + 2) / 2));



SET @children_median = (WITH Numbered AS (
SELECT
children,
COUNT(*) OVER () AS total_count,
ROW_NUMBER() OVER (ORDER BY children) AS row_num
FROM hotel_bookings_staging
WHERE is_canceled = 0
)
SELECT children
FROM Numbered
WHERE row_num IN ((total_count + 1) / 2, (total_count + 2) / 2));


SET @babies_median = (WITH Numbered AS (
SELECT
babies,
COUNT(*) OVER () AS total_count,
ROW_NUMBER() OVER (ORDER BY babies) AS row_num
FROM hotel_bookings_staging
WHERE is_canceled = 0
)
SELECT babies
FROM Numbered
WHERE row_num IN ((total_count + 1) / 2, (total_count + 2) / 2));

SELECT 
    'adults' AS category,
    AVG(adults) AS avg,
    MIN(adults) AS min,
    MAX(adults) AS max,
    COUNT(*) AS count,
    @adult_median as median
FROM hotel_bookings_staging
WHERE is_canceled = 0
UNION ALL
SELECT 
    'children' AS category,
    AVG(children) AS avg,
    MIN(children) AS min,
    MAX(children) AS max,
    COUNT(*) AS count,
    @children_median as median
FROM hotel_bookings_staging
WHERE is_canceled = 0
UNION ALL
SELECT 
    'babies' AS category,
    AVG(babies) AS avg,
    MIN(babies) AS min,
    MAX(babies) AS max,
    COUNT(*) AS count,
    @babies_median as median
FROM hotel_bookings_staging
WHERE is_canceled = 0;

/* Conclusion: The analysis reveals typical guest demographics for adults, children, and infants, highlighting average counts 
 * and medians that provide insights into booking patterns.
 */


-- Top 5 Busy Weeks of Hotel Bookings by Year
SELECT 
    arrival_date_year,
    week_number,
    num_bookings
FROM (
    SELECT 
        arrival_date_year,
        arrival_date_month,
        arrival_date_week_number AS week_number,
        COUNT(*) AS num_bookings,
        ROW_NUMBER() OVER (PARTITION BY arrival_date_year ORDER BY COUNT(*) DESC) AS row_num
    FROM hotel_bookings_staging
    GROUP BY arrival_date_year, arrival_date_month, week_number
) AS subquery
WHERE row_num <= 5
ORDER BY arrival_date_year ASC, week_number ASC;

/* Conclusion: Analysis reveals October and May consistently top busiest months, with specific weeks 
 * like October 42, 2016, and May 20, 2017, showing peak bookings. Seasonal variations highlight 
 * summer months' significance. Insights aid strategic resource planning for hotels, optimizing 
 * capacity and guest satisfaction during high-demand periods.
 * */

-- Hotel Meal Package Preference Analysis
SELECT 
	hotel,
    meal,
    COUNT(*) AS num_bookings,
    ROUND(AVG(adr), 1) AS average_daily_rate
FROM hotel_bookings_staging
WHERE is_canceled = 0
GROUP BY hotel, meal
ORDER BY hotel, num_bookings DESC;

/* Conclusion: The analysis shows that guests at City Hotels predominantly prefer Bed & Breakfast (BB) packages, 
 * while Half Board (HB) also sees significant uptake. In contrast, Full Board (FB) options are less popular.
 *  Resort Hotels exhibit similar trends, with BB and HB packages being favored choices.
 * */

-- Hotel Deposit Type Analysis by Hotel type
SELECT 
    hotel,
    deposit_type,
    COUNT(*) AS num_bookings,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY hotel), 1) AS percentage
FROM hotel_bookings_staging
GROUP BY hotel, deposit_type
ORDER BY hotel, percentage DESC;

/* Conclusion: Analysis reveals varied deposit preferences between City and Resort hotels, 
 * influencing booking strategies and cancellation rates.
 * */

-- Analysis of Booking Agents in Hotel Reservations
SELECT 
    agent,
    COUNT(*) AS num_bookings,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM hotel_bookings_staging), 1) AS percentage
FROM hotel_bookings_staging
WHERE agent IS NOT NULL  
GROUP BY agent
ORDER BY num_bookings DESC
LIMIT 10;

-- Relationship between lead time, cancellation by Hotel Type
SELECT hotel,
       is_canceled,
       AVG(lead_time) AS avg_lead_time,
       COUNT(hotel) AS count
FROM hotel_bookings_staging
GROUP BY hotel, is_canceled;

/*	Conclusion:
 *	The analysis shows that canceled bookings, particularly in City Hotels, have significantly longer lead times (150.28 days) 
 *	compared to non-canceled ones (80.70 days). 
 *	For Resort Hotels, cancellations also occur after longer lead times (128.68 days versus 78.84 days). 
 *	This highlights a trend where advanced bookings are more prone to cancellation, especially in City Hotels, emphasizing the 
 *	need for strategic cancellation policies and capacity management.
 */

-- Relationship between deposit type and cancellation by Hotel type
SELECT 
	hotel,
	deposit_type,
	is_canceled,
	COUNT(*) AS count
FROM hotel_bookings_staging
WHERE is_canceled = 0
GROUP BY hotel, deposit_type, is_canceled
ORDER BY hotel;

/* 	Conclusion:
 *	Deposit policies influence cancellation rates; bookings without deposits correlate with higher cancellation frequencies, 
 *	whereas refundable deposits are associated with lower cancellations.
 */

-- Relationship between market segment and cancellation 
SELECT 
	market_segment,
	is_canceled,
	COUNT(*) AS count
FROM hotel_bookings_staging
GROUP BY market_segment , is_canceled
ORDER BY market_segment;

/*	Conclusion:
 *	Conclusion: Market segment significantly influences cancellation rates, highlighting varying cancellation behaviors across
 *	different segments, crucial for targeted strategies and operational planning.
 */


-- Average Price in hotels vary over the year by month
SELECT arrival_date_month,
       ROUND(AVG(CASE WHEN arrival_date_year = 2015 THEN adr END),1) AS avg_2015,
       ROUND(AVG(CASE WHEN arrival_date_year = 2016 THEN adr END),1) AS avg_2016,
       ROUND(AVG(CASE WHEN arrival_date_year = 2017 THEN adr END),1) AS avg_2017
FROM hotel_bookings_staging
WHERE arrival_date_year IN (2015, 2016, 2017) 
GROUP BY arrival_date_month
ORDER BY CASE arrival_date_month
           WHEN 'January' THEN 1
           WHEN 'February' THEN 2
           WHEN 'March' THEN 3
           WHEN 'April' THEN 4
           WHEN 'May' THEN 5
           WHEN 'June' THEN 6
           WHEN 'July' THEN 7
           WHEN 'August' THEN 8
           WHEN 'September' THEN 9
           WHEN 'October' THEN 10
           WHEN 'November' THEN 11
           WHEN 'December' THEN 12
         END;
       
        
-- Analysis of Length of Stay by Hotel Type
SELECT 
    hotel,
    arrival_date_year, 
    arrival_date_month, 
    ROUND(AVG(stays_in_weekend_nights + stays_in_week_nights),1 ) AS avg_length_of_stay
FROM hotel_bookings_staging
GROUP BY hotel, arrival_date_year, arrival_date_month ;

/* Conclusion:  Resort hotels show longer stays in peak summer months, while city hotels maintain
 *  shorter, consistent stays year-round.
*/


-- Analysis of Booking Distribution by Customer Type
SELECT 
    CASE WHEN is_repeated_guest = 1 THEN 'Repeated' ELSE 'New' END AS customer_type1,
    COUNT(*) AS num_bookings,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM hotel_bookings_staging), 1) AS percentage
FROM hotel_bookings_staging
GROUP BY customer_type1;

/* Conclusion: The analysis indicates that the majority of bookings are from new customers (96.8%), 
 * underscoring the potential for expanding customer retention strategies to enhance repeat bookings 
 * and foster loyalty programs.
 */

-- Parking Space Requirement Analysis
SELECT
    required_car_parking_spaces,
    COUNT(*) AS num_bookings,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM hotel_bookings_staging), 1) AS percentage
FROM hotel_bookings_staging
GROUP BY required_car_parking_spaces
ORDER BY required_car_parking_spaces;

/* Conclusion: Majority of bookings (93.8%) do not require parking, with minimal demand for 1 space (6.2%). 
 */


-- Parking Analysis by Hotel Type
SELECT
    hotel,
    required_car_parking_spaces,
    COUNT(*) AS num_bookings,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY hotel), 1) AS percentage
FROM hotel_bookings_staging
GROUP BY hotel, required_car_parking_spaces
ORDER BY hotel, required_car_parking_spaces;

/* Conclusion: City hotels have lower parking demand (2.4% for 1 space) compared to resorts (13.6% for 1 space).*/





SELECT * FROM hotel_bookings_staging hbs ;







