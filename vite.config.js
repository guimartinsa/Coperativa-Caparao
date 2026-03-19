import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserPageRepo = repository?.toLowerCase().endsWith(".github.io");
const defaultBase = repository && !isUserPageRepo ? `/${repository}/` : "/";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || defaultBase,
  plugins: [react()],
});
