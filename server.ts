import { app } from "./app"
import mongoose from 'mongoose';
const uri = process.env.MONGOURL
const port = process.env.PORT || 6000;

(async () => {
    try {
        if (!uri) {
        console.error('MONGOURL is not defined in .env');
        process.exit(1); 
}
        await mongoose.connect(uri)
        console.log("DB Connected")
        app.listen(port, () => 
            {
            console.log(`Server Started On http://localHost:${port}`)
            });
        }
    catch (err) {
        console.error(' DB connection failed:', err);
        process.exit(1);
    }
})();

