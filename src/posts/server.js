import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const port = 3001; // Reactアプリとは別のポート

// ES Modulesで __dirname を再現
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); // 開発中のクロスオリジンリクエストを許可
app.use(express.json()); // JSONリクエストボディをパース

// ブログ記事を保存するAPIエンドポイント
app.post('/api/posts', async (req, res) => {
  try {
    const { title, authorId, excerpt, tags, content } = req.body;

    if (!title || !authorId || !content) {
      return res.status(400).json({ message: 'タイトル、著者ID、本文は必須です。' });
    }

    // フロントマターの作成
    const today = new Date();
    const date = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    const tagsString = tags ? `["${tags.split(',').map(t => t.trim()).join('", "')}"]` : '[]';

    const frontmatter = `---
title: "${title}"
date: "${date}"
authorId: "${authorId}"
excerpt: "${excerpt || ''}"
imageUrl: "https://placehold.co/400x250/cccccc/FFFFFF?text=Image"
tags: ${tagsString}
---

`;

    const fileContent = frontmatter + content;

    // ファイル名の生成 (簡易版: タイトルを小文字にしてスペースをハイフンに)
    const fileName = `${title.toLowerCase().replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, '-')}.md`;
    
    // プロジェクトルートからの相対パスで保存先を指定
    const filePath = path.join(__dirname, '..', 'src', 'posts', fileName);

    await fs.writeFile(filePath, fileContent);

    res.status(201).json({ message: 'ブログ記事が正常に作成されました！', filePath });
  } catch (error) {
    console.error('ブログ記事の作成中にエラーが発生しました:', error);
    res.status(500).json({ message: 'ブログ記事の作成に失敗しました。' });
  }
});

app.listen(port, () => {
  console.log(`APIサーバーが http://localhost:${port} で起動しました`);
});