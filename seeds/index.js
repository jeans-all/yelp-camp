const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = (a) => a[Math.floor(Math.random() * a.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    // const c = new Campground({title: 'purple field'});
    // await c.save();
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61da53fa3039fc3035a98b67', //bob's id
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/di0lqtoiv/image/upload/v1641862108/YelpCamp/x3etc6dzvqdq4vwbh6qx.jpg',
                    filename: 'YelpCamp/x3etc6dzvqdq4vwbh6qx',
                },
                {
                    url: 'https://res.cloudinary.com/di0lqtoiv/image/upload/v1641819381/YelpCamp/lautdzljzu0i0cagjgfx.jpg',
                    filename: 'YelpCamp/lautdzljzu0i0cagjgfx',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur consequuntur, blanditiis voluptatibus iusto cupiditate praesentium accusamus tempore, inventore amet vitae, architecto fugit voluptas ullam voluptate eaque ea. Praesentium, quibusdam ipsa.',
            price: price
        })
        await camp.save();
    }
}



seedDB().then(() => {
    mongoose.connection.close();
});