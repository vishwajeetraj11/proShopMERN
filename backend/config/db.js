import mongoose from "mongoose"

const connectDB = async() => {
    try {
        let database_url = process.env.DATABASE_URL
        database_url = database_url.replace("<password>", process.env.DATABASE_PASSWORD)

        const connection = await mongoose.connect(database_url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB Connected: ${connection.connection.host}`.cyan.underline)
    }catch(error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        // process.exit(1) -> it going to exit with failure
        process.exit(1);
    }
}

export default connectDB