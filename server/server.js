require('dotenv').config(); // MUST BE THE VERY FIRST LINE!
const express = require('express');
const app = express();
// ... rest of your server setup and imports
// process.env.PORT, process.env.MONGO_URI, etc., are now available
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
