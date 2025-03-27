import express from "express";
import { useExpressServer } from "routing-controllers";
import { UserController } from "./controllers/userController";
import "reflect-metadata";

const app = express();
const port = 3000;

// ミドルウェア設定
app.use(express.json());

useExpressServer(app, {
  controllers: [UserController],
});

// サーバー起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
