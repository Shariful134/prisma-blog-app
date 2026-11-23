import app from "./app";
import { prisma } from "./lib/prisma"
const PORT = process.env.POSRT || 3000
async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to Database Successfully");
        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:3000")
        })

    } catch (err) {
        console.error("An error occured:", err)
        await prisma.$disconnect()
        process.exit(1)
    }
}

main();