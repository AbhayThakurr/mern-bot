import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(PORT, () => console.log("Server Started and Connected to Database👍"));
    }
    catch (error) {
        console.log(error);
    }
};
startServer();
//# sourceMappingURL=index.js.map