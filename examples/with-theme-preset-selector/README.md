# React Example Usage For `@madooei/react-example-package`

This is a React application demonstrating how to use the React components from `@madooei/react-example-package`.

> [!NOTE]
> This example uses Tailwind CSS v4 for styling. If you want to use Tailwind CSS v3, you can check the `examples/with-tailwind3` directory.

## Setup

```bash
npm install
```

## Run the Example

```bash
npm run dev
```

This will start a Vite development server at `http://localhost:4002` showing the example components in action. 

## How does it work?

The `@madooei/react-example-package` is a local package that is installed using the `file:` protocol; see the `dependencies` section in the `package.json` file:

```json
  "dependencies": {
    "@madooei/react-example-package": "file:../../packages/react-example-package"
  },
```

If you want to use the package through NPM, you can do so by changing the `dependencies` section in the `package.json` file to:

```json
  "dependencies": {
    "@madooei/react-example-package": "latest"
  },
```

Then install the dependencies again and it will be installed through NPM (assuming you have published the package to NPM).
