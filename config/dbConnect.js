import mongoose from "mongoose";

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Database Connected!');
}).catch((err) => { console.log(err) });