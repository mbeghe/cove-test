# Cove Full Stack Engineer Coding Challenge

Welcome to the Cove coding challenge! 👋

Adam just signed a deal with a large real estate owner 🎉. Before we can launch our *powered by Cove* platform in their office building, we need to set up a reservation system.

### Problem Statement

In our backlog grooming session, Jeremy (our Product Manager) presented the problem we aim to solve for our users:

> *As Angela at Allsafe (an office user), I want to book the large conference room for a strategy meeting and need to find a time when it's available.*

The team broke this problem down and prioritized this User Story:

* **User Story:** As an office user, I want to view the schedule for a selected room and date so that I can find an available time slot.

### Your Task

We have provided you with a basic application designed to display a list of reservations and allow users to filter them by date and room. Your challenge is to complete this application so it works as intended.

If you have questions along the way, please reach out to us.

---

## Getting Started

1. Install dependencies:

   ```bash
   yarn
   ```
2. Start the application:

   ```bash
   yarn start
   ```

---

## Part 1: Connect Components

### Objective

* Connect the existing components using React hooks.
* Use the `useMemo` hook for optimized rendering. [Read about `useMemo` here.](https://react.dev/reference/react/useMemo)

### Instructions

* Manage state for the filters (`DatePicker` and `DropDownSelect`).
* Fetch a list of reservations from the API: [Reservation API](https://cove-coding-challenge-api.herokuapp.com/reservations)
* Populate the `DropDownSelect` with room options (e.g., "Room A", "Room B").
* Filter the reservations based on the selected room and date, displaying them in the `ReservationList`.

### Expected Outcome

Users should be able to change the filter values and see only the reservations that match their selections.

### Approach

**TODO:** Explain your approach here.

---

## Part 2: Enhance the UI

### Objective

Make the reservation list visually match the mockups provided:


Desktop:

<img src="public/imgs/mock-up-desktop.png" alt="desktop" />

Mobile:

<img src="public/imgs/mock-up-mobile.png" alt="mobile" width="300"/>

### Instructions

* Implement responsive design using a CSS breakpoint for mobile and desktop views.
* Choose any styling approach you prefer:

  * [Styled Components](https://styled-components.com/)
  * [React-JSS](https://cssinjs.org/react-jss/?v=v10.6.0)
  * [Tailwind CSS](https://tailwindcss.com/)
  * SASS/LESS
  * CSS Modules
  * Plain CSS

### Approach

**TODO:** Explain your approach here.

---

## Part 3: Add Testing

### Objective

* Complete the `isScheduleConflict` utility to detect reservation conflicts.
* Add test coverage in `utils.test.ts`.

### Instructions

* Review the existing `isScheduleConflict` util in `utils.ts`.
* Complete the implementation to detect conflicts between reservations.
* Write additional tests in `utils.test.ts` to ensure full coverage.
* Run tests with:

  ```bash
  yarn test
  ```

### Notes

* Do not connect this util to the UI.
* Focus on readable and maintainable code, even if it is not the most efficient.

### Approach

**TODO:** Explain your approach here.

---

## Final Steps

* Complete the "Explain your approach" sections for each part.
* Search the codebase for `TODO:` to ensure all have been addressed.

## Submission Guidelines

When you are done:
* run tests (see How To Get Started)
* run `npm run lint:fix`, it should not have any errors (there is a warning about the Typescript version, which is fine...)
* remove the node_module: `rm -rf ./node_modules`
* compress the repo into a ZIP file and
* upload the zip to Dropbox/Drive/... (in the past we had issues  sharing the zip directly via email due to our malware scanning, it should technically work now, but a file-share is playing it safe)
* email us your submission back!

Once done, you are all set! 👏