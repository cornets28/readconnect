import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes.js";
import booksRoutes from "./routes/BooksRoutes.js";
import readBooksRoutes from "./routes/ReadBooksRoutes.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: [process.env.PUBLIC_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads", express.static("uploads"));

app.use("/api/books", booksRoutes);
app.use("/api/read-books", readBooksRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})


