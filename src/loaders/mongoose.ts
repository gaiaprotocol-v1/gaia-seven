import mongoose from 'mongoose'

if (process.env.NODE_ENV === 'production') {
    //await mongoose.connect('mongodb://localhost:27017/test');
    console.log('Connected to Production DataBase');
} else {
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@cluster0.kyjzu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        .then(() => {
            console.log('Connected to Development DataBase');
        }).catch((err) => {
            console.log(err);
        })
}