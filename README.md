# 自己紹介ランディングページ

1 ファイル完結型のポートフォリオ LP です。Tailwind CDN を使用していて、ビルド不要、`index.html` をブラウザで開くだけで動作します。

---
## 1. 画像を差し替える

```
assets/
├─ banner.jpg   ← ヒーローバナー（横長）
├─ avatar.png   ← プロフィールアイコン（円形切抜き推奨）
└─ ogp.png      ← OGP/Twitter 用 1200×630
```

ファイル名を変えずに置き換えるだけで OK です。JPEG/PNG/WebP 可。

> 画像を最適化するには [Squoosh](https://squoosh.app/) を使用することをおすすめします。

---
## 2. 文言・カラーを編集する

`index.html` 内にセクションコメント（`<!-- ---- Hero Section -->` など）があるので、ブロック単位でテキストを更新してください。カラーは `<head>` の `tailwind.config` 内で `primary`/`secondary` を変更すると全体に反映されます。

---
## 3. お問い合わせフォーム（Formspree）

1. [Formspree](https://formspree.io/) でフォームを作成し、エンドポイント URL（例: `https://formspree.io/f/abcde123`）を取得。
2. `index.html` の `Contact` セクション `<form action="...">` に貼り付け。
3. 送信テストでメールを受信できれば完了。

---
## 4. デプロイ手順

### GitHub Pages

```bash
# リポジトリ作成後
$ git clone https://github.com/<username>/<repo>.git
$ cd <repo>
$ git add . && git commit -m "init" && git push origin main
```

1. リポジトリ **Settings → Pages** で `Deploy from a branch` → `main / (root)` を選択。
2. 数分後 `https://<username>.github.io/<repo>/` で公開。

### Cloudflare Pages

1. Cloudflare Dashboard → **Pages** → **Create a project**。
2. GitHub リポジトリを選択し、ビルド設定を以下に変更。
   * Framework preset: `None`
   * Build command: _(空)_
   * Publish directory: `./`
3. デプロイ後、サブドメイン URL が発行されます。

---
## 5. Lighthouse で品質チェック

1. Chrome DevTools → **Lighthouse** タブ → `Mobile` を選択。
2. Performance / Accessibility / Best Practices / SEO を選択して `Generate report`。
3. 90 点以上が目安。低い場合は画像サイズ・`alt`・メタタグを見直してください。

---
## 6. 不要ファイルの削除

旧サンプルの `style.css` と `script.js` は未使用のため削除推奨です。

```bash
$ rm style.css script.js
```

---
## 7. ライセンス

MIT
