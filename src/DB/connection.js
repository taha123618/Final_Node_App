const mongoose = require("mongoose");
// conect with db 
const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log("connection successfull");
    }).catch((err) => {
        console.log(err);
    });

mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected to Db");
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose is disconnected");
});

mongoose.connection.on('error', (err) => {
    //any error
    console.log(err.message);
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});