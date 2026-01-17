## アプリの概要

OpenWeather APIを使用し、指定した都市の天気を検索して表示するアプリです。

## 必要な環境

- Node.js 22
- APIキーおよび`.env`ファイル（`env.example`に従って作成）
- APIキー取得先: https://openweathermap.org/

## 開発環境の立ち上げ

プロジェクトrootで以下を実行します。

```bash
npm run dev
```

## ビルド

プロジェクトrootで以下を実行します。

```bash
npm run build
```

## 今後の改善点

- APIキーがフロントエンドに露出しているため、バックエンドを実装してよりセキュアにする
