const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to check working hours
function workingHoursMiddleware(req, res, next) {
    const date = new Date();
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = date.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Continue if it's working hours
    } else {
        res.send('<h1>Sorry, we are only open Monday to Friday from 9:00 to 17:00!</h1>');
    }
}

// Set the template engine
app.set('view engine', 'ejs');

// Apply middleware
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
