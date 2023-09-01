# Rental assistance finder tool

This tool allows users to view and filter emergency rental assistance programs funded by the U.S. Department of Treasury’s Emergency Rental Assistance Program.

## ⚠️ DEPRECATION NOTE ⚠️
The code for this tool is no longer maintained.

## React app

This tool is developed and maintained as a standalone React app. The app is then built, and the final, compiled Javascript and CSS files are used by our site. These compiled files can be found in the `dist` directory.

By distributing both the React source code and the final built Javascript and CSS files, we hope this package can be useful to more developers, as well as opening up our process for developing and publishing this application.

## To run locally as a React component

1. Clone repo
2. Run `yarn`
3. Run `yarn start`

   This runs the app in the development mode.

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
   The page will reload if you make edits.

## Testing

All linting and testing can be run with `yarn run test`. Otherwise, the individual checks can be done below:

### Linting

- Lint the application with `yarn run lint`.
- Autofix linting issues with `yarn run lint --fix`

### Unit tests

- Run unit tests with `yarn run test:unit`.

### Functional tests

Ensure a local server is running (with `yarn start`).

- Run functional tests with `yarn run cypress run`.
- Run functional tests interactively with `yarn run cypress open`
- Run component functional tests with `yarn run cypress run-ct`

## To use inside a website

1. (Optional) Install this package using `npm install`
2. Include the `main.js` and `main.css` files from the `dist/` folder in your HTML page.
3. Add a container element to the page with id `rental-assistance-finder`
4. From here, you may need to further adjust CSS rules to customize the style of the resulting elements.
