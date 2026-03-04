# Website Development

This guide explains how to contribute to the documentation website you are currently reading!

The documentation is built using [VitePress](https://vitepress.dev/), an excellent static site generator designed for building fast, content-centric websites.

## Prerequisites

Before contributing to the documentation, ensure you have the following installed on your system:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (v18 or higher is recommended)

## Setup Locally

To run the documentation website on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/itsfatduck/optimizerduck-docs.git
    cd optimizerduck-docs
    ```

2.  **Install dependencies:**
    We recommend using `npm`:
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run docs:dev
    ```
    This will start a local server, usually at `http://localhost:5173`. Any changes you make to the markdown files or Vue components will be instantly reflected in the browser (Hot Module Replacement).

## Project Structure

Here is a quick overview of the key directories in this project:

- `docs/`: This is where all the markdown content lives. This is the directory you will spend most of your time in.
    - `docs/documentation/` or `docs/guides/`: General user guides.
    - `docs/contribute/`: The developer guides (including this page).
- `.vitepress/`: Contains all VitePress configuration and the custom theme.
    - `.vitepress/config/en.ts`: The main configuration file (navigation, sidebar, etc.).
    - `.vitepress/theme/`: Custom Vue components, global CSS, and layout overrides.

## Making Changes

### Editing Markdown

VitePress uses standard Markdown, but also supports frontmatter and Vue components inside Markdown (MDX-like).

- To add a new page, simply create a `.md` file in the `docs/` directory.
- To link to other pages, use relative URLs: `[Link text](/docs/path/to/page)`.

### Common Components

We have created several custom Vue components to make the documentation look beautiful:

- `<ImagePreview />`: Use this for all screenshots to get a nice zoomed lightbox effect.

You can use these directly in any markdown file without importing them, as they are globally registered in `.vitepress/theme/index.ts`.

## Submitting your work

Once you are happy with your changes:

1.  Commit your changes: `git commit -m "docs: add new page about X"`
2.  Push to your fork: `git push origin my-feature-branch`
3.  Open a Pull Request on the main `optimizerduck-docs` repository.

Thank you for helping us improve the documentation!
