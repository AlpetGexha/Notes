# Notes 

[Content of this Blog ](https://github.com/AlpetGexha/Notes/tree/master/src/content/blog)

## Install

```bash
npm install
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

### 🐳 Docker Commands

All Docker commands are run from the root of the project, from a terminal:

| Command                           | Action                                                   |
| :-------------------------------- | :------------------------------------------------------- |
| `docker build -t app:1.0.0 .`     | Build the Docker image for the Astro application.        |
| `docker run -p 80:4321 app:1.0.0` | Run a Docker container with the built Astro application. |
| `docker pull edwardb11/app:2.0.0` | Download the Docker image from Docker Hub.               |
