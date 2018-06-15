# BigCommerce Store Design Microapp

## Introduction
The Store Design microapp allows users to customize the appearance and content of their storefront.

## Setup

The build process of this application is handled by [create-react-app](https://github.com/facebook/create-react-app), using our custom [bc-react-scripts](https://github.com/facebook/create-react-app).

Our version of `bc-react-scripts` uses a new `npm run dev` command to "transpile" the final build into the `bigcommerce/vendor/bower_components/store-design` directory when building locally.

Run the following commands to get started:

`npm install`

To **start development** `npm run dev`

To **start testing** `npm test`

If you are running [cloud-dev-vm](https://github.com/bigcommerce/cloud-dev-vm) and want to run this app, one option is to do the above while ssh'd into your vm. There is also work being done to support the traditional `npm run start` functionality from `create-react-app`, including hot reloading.

## Contribution
All code changes except for creating new releases should be reviewed and accepted by at least one reviewer. When you create a new pull request @mention the specific software engineers you'd like to review your code.

## Architecture

### Framework & libraries
The application is built using React and Typescript. Some notable libraries include:
* [React Router](https://github.com/ReactTraining/react-router) is used for managing client-side routing.
* [Redux](https://github.com/reduxjs/react-redux) is used for managing application state.
* [Styled Components](https://github.com/styled-components/styled-components) is used for styling components.
* [BigCommerce Pattern Lab](https://github.com/bigcommerce/pattern-lab) is used for building a consistent BigCommerce Control Panel UI.
