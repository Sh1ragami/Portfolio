// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  base: "/Portfolio/", // ← 👈 リポジトリ名と同じ大文字でOK（GitHub Pagesに合わせる）
  plugins: [react(), glsl()],
});
