const express = require('express');
const database = require('./configs/db');
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/categoery.routes');
const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes');
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    return res.send('Hello World!');
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);

app.listen(8080, () => {
    database();
    console.log("Listening on port 8080");
});