# Google Apps Script Rollup Build

Develop modular JavaScript with `import` and `export` statements, NPM packages, and `dev` and `prod` targets. Build to a `code.gs` file that is executable in your Google Apps Script project.

### Installation and commands

1. **Clone the repository** 

   ```bash
   git clone https://github.com/NathanielBrewer/gas-rollup-build.git
   cd gas-rollup-build
   ```

2. **Install dependencies**

    ```bash
    npm install

    ```

3. **Login to with Clasp**
    ```bash
    npx clasp login
    ```

4. **Configure Google Apps Script**

    - Navigate to your Google Apps Script project and open the Project Settings
    - Copy the Script ID and paste it into either the `devScriptId`, `prodScriptId`, or the `scriptId` variable in the .clasp.json file located at `/.clasp.json`
    - Adjust the appsscript.json as needed. Documentation available [here](https://developers.google.com/apps-script/manifest)

5. **Develop**

    - The entry file is `src/code.js`. This gets built to `build/<target>/code.gs`, which is a runnable Google Apps Script file. **Do not add exports to code.js** They don't make sense in the Apps Script context and will the resultant GS file will throw an error.
    - After making changes and any files in the `src/` directory, a `build:<target>` command must be run before those changes will be exectuable by Google Apps Script.
    - The entry file is `src/code.ts` when present. If you prefer plain JavaScript, remove or rename it and the bundler will fall back to `src/code.js`. Either option is compiled to `dist/<target>/code.gs`, which is a runnable Google Apps Script file.
    - TypeScript is configured with `allowJs`, so `.js` and `.ts` modules can live side by side and import one another. Add ambient types or JSDoc comments to your JavaScript files if you want improved editor IntelliSense.
    - Use `npm run compile` if you need to regenerate the intermediate `.tmp/` output without executing a full build.
    - After making changes to any files in the `src/` directory, a `build:<target>` command must be run before those changes will be executable by Google Apps Script.
    - While developing, make your changes and then use `reload:<target>` to run both `build:<target>` and `push:<target>` commands.

6. **Build**

    The build step is required to convert the files into a single Google Script file that can then be pushed and deployed to your Apps Script project.

    Command:
    ```bash
    npm run build:<target>
    ```
    where the "target" is either `prod` or `dev`

7. **Push**

    Invoke `clasp push` for either the `prod` or `dev` script ID
  
    ```bash
    npm run push:<target>
    ```

8. **Deploy**

    Invoke `clasp deploy` for either the `prod` or `dev` script ID
  
    ```bash
    npm run deploy:<target>
    ```

9. **Reload**

    For faster development, build and push in one command

    ```bash
    npm run reload:<target>
    ```
    where the "target" is either `prod` or `dev`