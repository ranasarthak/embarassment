import express from "express";
import userRouter from "./routes/user";
import todoRouter from "./routes/todo";
// import todoRouter from "./routes/todo";

const app = express();

app.use(express.json());
                   
app.use("/api/v1", userRouter);
app.use("/api/v1/todo", todoRouter);

app.listen(3000, () => {
    console.log("Server started at port: 3000");
});