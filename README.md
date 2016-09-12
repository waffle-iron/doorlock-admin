# Doorlock admin

Admin user interface for managing members allowed to unlock hackerspace cabinet.
It also provides the admin with status of the current state of the lock, and an option to force it to lock or unlock from the ui.

<img src=/docs/images/ChangeMember.gif width=200/>
<img src=/docs/images/LockStatus.gif width=200/>



## How to get server running

This section will describe how to get the latest release running. By default it will start the server on port 3001.

#### Dependencies
- Node installed locally
- [Doorlock-servo](../doorlock-servo/) online and accessible on the network (compatible version)
- [Doorlock-api](../doorlock-api/) online and accessible on the network (compatible version)

#### Follow these steps:
1. Clone repository to a local folder
```bash
git clone https://github.com/oanylund/doorlock-admin.git
```
- Change directory into the new clone
```bash
cd ./doorlock-admin
```
- Install server dependencies:
```bash
npm install --production
```
- Run:
```bash
npm run prod
```
- When you open the page in the browser you will be prompted for a username and a password. Without the api, the authorization will fail.

## Development

To get the development environment, you have to run `npm install` to get all dev modules.

#### Storybook
Storybook displays your components in an isolated view.
If you make a change to any of the components, it will change in an instant inside storybook.

Storybook starts a new server, on port 9001.
Use storybook to understand, change or design new components. Most of the UI components are in there.

Start the server with `npm run storybook`  
Have a look at the [stories](./src/components/.stories) to understand how the components work and what props they want.
#### Development mode
To start dev mode use `npm start`.
In this mode, hot reloading is used. So changes in the source code will be displayed in the browser instantly. The development server starts on port 3000. The app mostly works without doorlock-servo, but the status page and the scanning of new id cards will fail.
