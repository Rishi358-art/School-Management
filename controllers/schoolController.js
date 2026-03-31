const db = require('../config/db');
const calculateDistance = require('../utils/distance');

// ✅ ADD SCHOOL
const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Validation
    if (!name || !address || latitude == null || longitude == null) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ message: "Latitude and Longitude must be numbers" });
    }

    if (latitude < -90 || latitude > 90) {
        return res.status(400).json({ message: "Invalid latitude range" });
    }

    if (longitude < -180 || longitude > 180) {
        return res.status(400).json({ message: "Invalid longitude range" });
    }

    const query = `
        INSERT INTO schools (name, address, latitude, longitude)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }

        res.status(201).json({
            message: "School added successfully",
            id: result.insertId
        });
    });
};

// ✅ LIST SCHOOLS (sorted by distance)
const listSchools = (req, res) => {
    const { lat, lng } = req.query;

    // Validation
    if (lat == null || lng == null) {
        return res.status(400).json({ message: "Latitude and Longitude are required" });
    }

    if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ message: "Invalid coordinates" });
    }

    const query = "SELECT * FROM schools";

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }

        // Calculate distance for each school
        const schoolsWithDistance = results.map((school) => {
            const distance = calculateDistance(
                parseFloat(lat),
                parseFloat(lng),
                school.latitude,
                school.longitude
            );

            return { ...school, distance };
        });

        // Sort by distance
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    });
};

module.exports = {
    addSchool,
    listSchools
};