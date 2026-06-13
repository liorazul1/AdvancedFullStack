const cors = require('cors');
// ... other imports
const corsOptions = {
origin: process.env.CLIENT_URL, // Dynamically allow your client URL
credentials: true, // Allow cookies to be sent with requests
methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// ... rest of your app configuration
node server.js