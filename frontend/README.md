<<<<<<< Updated upstream
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
<div align="center"><img src = "https://user-images.githubusercontent.com/31413093/197097625-5b3bd3cf-2bd6-4a3a-8059-a1fe9f28100b.svg" height="100px" alt="My Happy SVG"/></div>

<h2 align="center">template-vite-react-ts-tailwind</h2>

<div align="center">
<a href="https://reactjs.org/"><image src="https://img.shields.io/static/v1?label=React&message=19.1.1&style=for-the-badge&labelColor=FFFFFF&logo=react&color=61DAFB"/></a> <a href="https://www.typescriptlang.org/"><image src="https://img.shields.io/static/v1?label=TypeScript&message=5.8.3&style=for-the-badge&labelColor=FFFFFF&logo=typescript&color=3178C6"/></a> <a href="https://tailwindcss.com/"><image src="https://img.shields.io/static/v1?label=Tailwind%20CSS&message=4.1.12&style=for-the-badge&labelColor=FFFFFF&logo=tailwindcss&color=06B6D4"/></a> <a href="https://vite.dev/"><image src="https://img.shields.io/static/v1?label=Vite&message=7.1.4&style=for-the-badge&labelColor=FFFFFF&logo=vite&color=646CFF"/></a>
</div>

## Introduction

A starter [Vite](https://vitejs.dev/) template having:

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Multiple [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) plugins installed

> [!IMPORTANT]
> 
> The latest code of this template has updated Vite to version 7.0+, which requires [Node.js](https://nodejs.org/) version 20.19+ or 22.12+. Please upgrade if your package manager warns about it. Or you can use [this release](https://github.com/RoyRao2333/template-vite-react-ts-tailwind/releases/tag/release-2025.03.27) which is vite@5 and works with Node.js 18 or 20.
> 
> 该模板的最新代码中，已经将 Vite 的版本更新到了 7.0+，需要 20.19+ 或 22.12+ 版本的 [Node.js](https://nodejs.org/)。当你的包管理器发出警告时，请注意升级你的 Node.js 版本。如果你需要 vite@5，请使用[这个版本](https://github.com/RoyRao2333/template-vite-react-ts-tailwind/releases/tag/release-2025.03.27)，可兼容 Node.js 18 或 20。

> [!TIP]
> 
> This code repository may occasionally update its dependency versions. If the dependency versions in the latest code do not meet your expectations, please go to [Tags](https://github.com/RoyRao2333/template-vite-react-ts-tailwind/tags) section to download a previous version of this template. I will display the dependencies used in each Tag, please choose the one you need.
> 
> 这个代码仓库可能会不定期更新其依赖包的版本。如果最新代码中依赖的版本不符合你的期望，请移步[Tags](https://github.com/RoyRao2333/template-vite-react-ts-tailwind/tags)下载之前的模板。每个Tag中使用的依赖都会展示在Tag详情中，请选择你需要的版本。

## Usage

> [!TIP]
> 
> The fastest way to use this template is to click the “Use this template” button on the top right of this repository. It will help you create a new repository quickly, and you can make any modifications to your own repository. If you still want to download this template separately, please continue reading.
> 
> 使用该模板的最快方式，就是点击本仓库右上角的“使用该模板”按扭。这帮助你使用该模板迅速创建一个新的仓库，然后你可以对自己的仓库进行任何修改。如果你仍然希望单独下载此模板，可继续往下读。

If you need a copy of this repository. You can [download](https://github.com/RoyRao2333/template-vite-react-ts-tailwind/archive/refs/heads/main.zip) a copy as zip but [tiged](https://github.com/tiged/tiged) is recommended.

After you installed tiged, please excute the following commands:

```sh
$ cd path-to-save-your-project
$ tiged royrao2333/template-vite-react-ts-tailwind your-project-name
```

After getting a copy of this repository, you can use your package manager to install dependecies:

```sh
$ cd path-to-your-project
$ pnpm install

# npm install
# yarn install
```

Let's run!

```sh
$ pnpm run dev

# npm run dev
# yarn run dev
```

> We've already implemented some recommended configurations in `eslint.config.mjs`, `prettier.config.mjs`. Feel free to edit them if you have your own preferences.

## Contributing

Feel free to dive in! [Open an issue](https://github.com/RoyRao2333/template-vite-react-ts-tailwind/issues/new) or submit PRs.
>>>>>>> Stashed changes
