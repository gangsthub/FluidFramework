---
uid: package-feed
---

# Fluid private npm feed

Currently, our packages are published on our [VSTS npm feed](https://offnet.visualstudio.com/officenet/_packaging?_a=feed&feed=fluid).

Here are the step to configure your machine to pull Fluid packages from there.

Prerequisites: [Node.js](https://nodejs.org); !!!include(node-versions.md)!!!

1. Install `vsts-npm-auth`:

    `npm i -g vsts-npm-auth`

2. Add registry to our scopes (globally per-user)

    ```
    npm config set @microsoft:registry https://offnet.pkgs.visualstudio.com/officenet/_packaging/fluid/npm/registry/
    npm config set @fluid-example:registry https://offnet.pkgs.visualstudio.com/officenet/_packaging/fluid/npm/registry/
    npm config set @fluid-internal:registry https://offnet.pkgs.visualstudio.com/officenet/_packaging/fluid/npm/registry/
    npm config set @fluidframework:registry https://offnet.pkgs.visualstudio.com/officenet/_packaging/fluid/npm/registry/
    npm config set @yo-fluid:registry https://offnet.pkgs.visualstudio.com/officenet/_packaging/fluid/npm/registry/
    ```

3. Auth with VSTS using `vsts-npm-auth` (Windows only, Linux/Mac instructions:
   [here](https://docs.microsoft.com/en-us/azure/devops/artifacts/npm/npmrc?view=azure-devops&tabs=windows))

    `vsts-npm-auth -C %USERPROFILE%\.npmrc`

4. Start installing Fluid packages into your package

    `npm i @microsoft/map`


**NOTE:**

* You can add the registry setting to your project only instead of globally.
  Just add the follow to your `.npmrc` in the root of your npm package:

  ```
  @microsoft:registry=https://offnet.pkgs.visualstudio.com/officenet/_packaging/fluid/npm/registry/
  @fluid-example:registry=https://offnet.pkgs.visualstudio.com/officenet/_packaging/fluid/npm/registry/
  @fluid-internal:registry=https://offnet.pkgs.visualstudio.com/officenet/_packaging/fluid/npm/registry/
  @fluidframework:registry=https://offnet.pkgs.visualstudio.com/officenet/_packaging/fluid/npm/registry/
  @yo-fluid:registry=https://offnet.pkgs.visualstudio.com/officenet/_packaging/fluid/npm/registry/
  ```

  Then run `vsts-npm-auth` in the same directory with no argument.