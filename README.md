## OFX Quick Quote

This is a simple React Native app which consists of a form collecting data for an api call, a call to the OFX api and displaying the result on a separate screen.

This is iOS-only app. Some packages are not set up to run on Android.

## How to run the project

```
yarn install
cd ios && pod install

yarn start
yarn ios
```

You'll need an ENV file to run this project. Please find it in your email with a link to this repo.

## Testing

```
yarn test
```

## Key dependencies

- `react-hook-form` for controlling the form data
- `zod` for form validation
- `axios` for api calls
- `recoil` for state management
- `react-native-select-dropdown` for the currency selector

## Project structure

- **components**: Here we have all react components shared between multiple screens

- **data**: Static data used in the project, currently holds the list of currencies

- **navigation**: Contains an app stack navigator
- **screens**: Two main app screens, each in its own folder accompanied by the components which are relevant only to this particular screen and the relevant tests.
- **services**: Functions to abstract api calls and the relevant tests
- **state**: State recoil atoms
- **theme**: Includes dark and light themes
- **utils**: Utility functions used throughout the app and relevant tests

## Notes and Assumptions

### Skipped Features

I was running low on time, so i decided to skip the phone input since I thought the knowledge was already covered on other components and the data is not required for an api call.

### Header

I thought the provided designs look rather web-oriented and decided to go for a more native experience, so I didn't copy the header designs.

### Light and Dark themes

The project has both the Light and Dark themes set up.
However, I did not implement the dark theme on dropdowns for the timings reasons, so once a selector is opened, it still has some light background.

### Unit Tests

Since I was running out of time, I left a couple of unit tests out since I was having troubles mocking some of the APIs. I do realize that the production-ready code should have these tests.

### Styling

Since the exercise is not too big, I decided to go simple and not to use any libraries like styled components.

### State Management

Using Recoil to show one way of passing the data to another screen.

### Error Handling

Not being sure what was the desired UX would be, I decided to handle api errors with an alert.

### Currency list

Under [./src/data/currencies.ts](./src/data/currencies.ts) I have a list of all currencies, but decided to filter only a few 'popular' options to show on the dropdown, since I've noticed the api doesn't return values for some currencies.

### Fonts

I ran a tool and figured the font on the task document is Ciutadella, but since it is paid, I decided to go with RobotCondensed as a base and RobotoMono for returned numbers.

### Screenshots

![Form screen](https://i.postimg.cc/x1qmkvzF/Simulator-Screen-Shot-i-Phone-12-2022-10-14-at-13-55-17.png)
![Errors](https://i.postimg.cc/X7tj8dPP/Simulator-Screen-Shot-i-Phone-12-2022-10-14-at-14-00-26.png)
![Result screen](https://i.postimg.cc/RFvKZjQw/Simulator-Screen-Shot-i-Phone-12-2022-10-14-at-14-03-47.png)
![Form landscape](https://i.postimg.cc/MHmWKF5f/Simulator-Screen-Shot-i-Phone-12-2022-10-14-at-14-05-10.png)
