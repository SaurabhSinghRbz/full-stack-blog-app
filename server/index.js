const express = require('express');
const database = require('./configs/db');
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/categoery.routes');
const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes');
const multer = require('multer');


const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    return res.send('Hello World!');
});


const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: myStorage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    return res.status(200).json('File has been uploaded');
});



app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);



app.listen(8080, () => {
    database();
    console.log("Listening on port 8080");
});