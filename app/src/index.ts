import express from "express";

const app = express();
const port = 3000;

// ミドルウェア設定
app.use(express.json());

// ルートハンドラー
app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript!");
});

// サーバー起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
