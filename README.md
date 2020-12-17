# React Admin Dashboard

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Additional Information](#additional-information)
- [TODOs](#todos)

## About The Project

This app is for our clients, it provides analytics for different widgets, user management, moderation, and revenue settings.

### Built With

- [NextJS](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Saga](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html)
- [Bootstrap](https://getbootstrap.com/)
- [Blueprint](https://blueprintjs.com/)

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

2. Register FontAwesome Pro in NPM

```sh
npm config set "@fortawesome:registry" https://npm.fontawesome.com/ && \
  npm config set "//npm.fontawesome.com/:_authToken" CBF04C6E-FA67-4045-B7D5-28ECE4303E6F
  ```
  For more info https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers


3. Install NPM packages

```sh
npm install
```

## Usage

To start the development server:

```sh
npm run dev
```

## Additional Information

This dashboard app is based on dashforge theme, you can find theme files inside the `OTHER/dashforge-template` folder.
Note that this is static template, if you want to use something from there you need to migrate it to react.

📦 I used the current folder structure, if app grows and you find it uncomfortable please try another ways:

```sh
├── components                # Shared components that can be used beetween different pages
├── HOC                       # Global HOCs that can be used for different pages
├── pages                     # Next.js pages that wrap scenes
├── scenes                    # Scenes are folders that display content of the pages
│  ├── SceneName              # Folder separation of scenes
│      ├── SceneName.js       # Main scene file (container)
│      ├── components         # Folder that contains components if any
│      ├── ducks              # Redux redux-ducks files if any
│      ├── sagas              # Redux-saga files if any
│      ├── services           # Services folder if any
│      │      ├── api         # API folder or file if any
├── services                  # Global services, redux files, sagas, etc.
├── static                    # Folder with static files
├── store                     # Main store initialization
├── env                       # Environment variables (dotenv used so you can improve it and usie different files)
```

❓ If you have issues with SSR you can try to use [Next.js Dynamic Import](https://nextjs.org/docs#dynamic-import). I used it for the chart library.

## TODOs

- [ ] Discuss with back-end if it's possible to include user details inside get permissions API or make another API that will return permissions and user details.
      it's desirable to have them in one API as we already call 2 APIs on initial load (permissions, site list). We need this for user dropdown in header.
- [ ] Maybe setup imports from the root folder like '@/components/...' so we will not write long paths like '../../../components'
- [ ] Find a way to simplify axios requests to don't pass token every time. Explore axios docs it has different solutions
- [ ] Organize component folder
- [ ] Improve folder structure if needed
- [ ] Improve withProtection HOC (it replaces you back to login page on hot-reloading)
- [ ] [LATER] Organize dependencies

* ...
