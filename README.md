# pnpm-workspace
configure my pnpm workspace.

<br>

## Quick Start
```bash
# The way you choose to install pnpm depends on your environment.
$ npm install -g pnpm 

# Make sure you have PNPM installed already.
$ pnpm -v

# Use pnpm install to initialize the workspace.
$ pnpm install

# Now you can find the package "hello" installed in your workspace.
dependencies:
+ hello <- packages/hello
```

<br>

## Settings

Create folders: apps\、packages\
```bash
 # such as react, angular, vite, next.js
 * - apps
 # such as math, utils, tools, libraries
 * - packages
```

```yaml
@ file: pnpm-workspace.yaml

packages:
  - 'apps/**'
  - 'packages/**'
```

<br>

## Test packages/hello
let's create a hello module in packages folder

```json
// @file: package.json
{
  "name": "pnpm-workspace",
  "dependencies": {
    "hello": "workspace:*",  // <= your custom module can be shared to other app
}
```

```bash
$ node index.js
[from hello module]: hello!
```

<br>

## Create Next App in apps folder.
Now, we create a my-next-app in apps/

```
cd apps
pnpx create-next-app@latest my-next-app
...
```

In my-next-app, all packages stored in the node_modules directory are symbolic links to pnpm packages. This means that these packages can be reused by other Next.js projects, which helps reduce disk storage usage.

