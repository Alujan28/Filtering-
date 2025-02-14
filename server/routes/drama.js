const router = require("express").Router();
const Drama = require("../models/drama");
const dramaData = require("../config/dramas.json");

// GET Request: Retrieve a list of dramas
router.get("/drama", async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || '';
        let sort = req.query.sort || 'rating';
        let genre = req.query.genre || 'All';

        const genreOptions = [
            "Action",
            "Romance",
            "Fantasy",
            "Drama",
            "Crime",
            "Adventure",
            "Thriller",
            "Sci-fi",
            "Music",
            "Family"
        ];

        genre = genre === "All" ? [...genreOptions] : req.query.genre.split(",");
        sort = req.query.sort ? req.query.sort.split(",") : [sort];

        let sortBy = {};
        sortBy[sort[0]] = sort[1] || "asc";

        const drama = await Drama.find({ name: { $regex: search, $options: "i" } })
            .where("genre")
            .in([...genre])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);

        const total = await Drama.countDocuments({
            name: { $regex: search, $options: "i" },
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            genres: genreOptions,
            drama: drama,
        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// POST Request: Insert new drama data
router.post("/drama", async (req, res) => {
    try {
        // Destructure data from the request body
        const { name, img, year, genre, rating } = req.body;

        // Create a new drama entry
        const newDrama = new Drama({
            name,
            img,
            year,
            genre,
            rating
        });

        // Save the new drama to the database
        await newDrama.save();

        res.status(201).json({
            error: false,
            message: "Drama added successfully",
            drama: newDrama
        });
    } catch (err) {
        console.log("Error adding drama:", err);
        res.status(500).json({
            error: true,
            message: "Error adding new drama"
        });
    }
});


const insertDrama = async () => {
    try {
        const docs = await Drama.insertMany(dramaData);
        console.log("Data inserted successfully");
        return Promise.resolve(docs);
    } catch (err) {
        console.log("Error inserting data:", err);
        return Promise.reject(err);
    }
};

insertDrama()
.then((docs) => console.log(docs))
.catch((err) => console.log(err));


module.exports = router;
