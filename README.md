# Cove Full Stack Engineer Coding Challenge

Welcome to the Cove coding challenge! 👋

Adam just signed a deal with a large real estate owner 🎉. Before we can launch our _powered by Cove_ platform in their office building, we need to set up a reservation system.

### Problem Statement

In our backlog grooming session, Jeremy (our Product Manager) presented the problem we aim to solve for our users:

> _As Angela at Allsafe (an office user), I want to book the large conference room for a strategy meeting and need to find a time when it's available._

The team broke this problem down and prioritized this User Story:

- **User Story:** As an office user, I want to view the schedule for a selected room and date so that I can find an available time slot.

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

- Connect the existing components using React hooks.
- Use the `useMemo` hook for optimized rendering. [Read about `useMemo` here.](https://react.dev/reference/react/useMemo)

### Instructions

- Manage state for the filters (`DatePicker` and `DropDownSelect`).
- Fetch a list of reservations from the API: [Reservation API](https://cove-coding-challenge-api.herokuapp.com/reservations)
- Populate the `DropDownSelect` with room options (e.g., "Room A", "Room B").
- Filter the reservations based on the selected room and date, displaying them in the `ReservationList`.

### Expected Outcome

Users should be able to change the filter values and see only the reservations that match their selections.

### Approach

**Implemented a robust, enterprise-level solution:**

**Architecture & State Management:**
- Created custom hooks (`useReservations`, `useFilters`) for clean separation of concerns
- Implemented comprehensive TypeScript interfaces for type safety
- Used `useMemo` for performance optimization of filtered data and room options
- Organized code into modular structure: `components/`, `hooks/`, `services/`, `types/`, `utils/`

**API Integration:**
- Built resilient API service with retry logic, timeout handling, and error management
- Implemented client-side caching (5-minute duration) to reduce API calls
- Added data transformation layer to convert API responses to internal data models
- Used Day.js for consistent date handling throughout the application

**Filtering & Data Processing:**
- Created efficient filtering system using Set lookups for O(1) room filtering
- Implemented date-based filtering with Day.js for accurate comparisons
- Added grouping functionality to organize reservations by room
- Built sorting mechanism to display reservations chronologically by start time

**Performance Optimizations:**
- Memoized expensive computations (filtered reservations, room options)
- Implemented early returns in filter functions to avoid unnecessary processing
- Used Set data structures for O(1) lookup performance
- Added client-side caching to minimize network requests

---

## Part 2: Enhance the UI

### Objective

Make the reservation list visually match the mockups provided:

Desktop:

<img src="public/imgs/mock-up-desktop.png" alt="desktop" />

Mobile:

<img src="public/imgs/mock-up-mobile.png" alt="mobile" width="300"/>

### Instructions

- Implement responsive design using a CSS breakpoint for mobile and desktop views.
- Choose any styling approach you prefer:
  - [Styled Components](https://styled-components.com/)
  - [React-JSS](https://cssinjs.org/react-jss/?v=v10.6.0)
  - [Tailwind CSS](https://tailwindcss.com/)
  - SASS/LESS
  - CSS Modules
  - Plain CSS

### Approach

**Delivered a modern, professional UI with comprehensive enhancements:**

**Design System & Styling:**
- Migrated to **Tailwind CSS** for utility-first styling and maintainability
- Implemented custom color palette matching design requirements:
  - Primary background: Dark navy (#0A0E20)
  - Text: Light beige (#FDEEDC) 
  - DatePicker: Bright blue (#2563EB)
  - Room Select: Mint green (#34D399)
  - Reservation blocks: Intermediate blue (#1D4ED8)
- Created responsive grid layout with breakpoints: mobile (1 col), tablet (2 cols), desktop (3 cols)

**Component Architecture:**
- Built custom `DropDownSelect` component with advanced functionality:
  - Multi-room selection capability
  - "All Rooms" intelligent toggle
  - Visual checkmarks for selected items
  - Click-outside-to-close behavior
  - Smooth animations and hover effects
- Enhanced `DatePicker` with custom styling and icon integration
- Updated `ReservationList` for organized room-based display

**User Experience Improvements:**
- Implemented chronological sorting of reservations by start time
- Added room grouping for better organization and comparison
- Integrated Heroicons for consistent, professional iconography
- Built loading states, error handling, and empty state messaging
- Added image display for room thumbnails with fallback handling

**Responsive Design:**
- Mobile-first approach with progressive enhancement
- Flexible grid system that adapts to screen size
- Optimized touch targets for mobile interaction
- Consistent spacing and typography across all breakpoints

---

## Part 3: Add Testing

### Objective

- Complete the `isScheduleConflict` utility to detect reservation conflicts.
- Add test coverage in `utils.test.ts`.

### Instructions

- Review the existing `isScheduleConflict` util in `utils.ts`.
- Complete the implementation to detect conflicts between reservations.
- Write additional tests in `utils.test.ts` to ensure full coverage.
- Run tests with:

  ```bash
  yarn test
  ```

### Notes

- Do not connect this util to the UI.
- Focus on readable and maintainable code, even if it is not the most efficient.

### Approach

**Implemented comprehensive testing with robust conflict detection:**

**Algorithm Design:**
- Built `isScheduleConflict` function using efficient sorting and comparison approach
- **Time Complexity: O(n log n)** due to sorting step, then **O(n)** for comparison
- **Space Complexity: O(n)** for the sorted array copy
- Handles edge cases: empty arrays, single reservations, touching reservations (non-conflicting)

**Test Coverage:**
- Created comprehensive test suite with 8 test cases covering:
  - Empty and single reservation scenarios
  - Non-overlapping and touching reservations (should return false)
  - Various overlap patterns: partial, complete, and nested overlaps
  - Unsorted input data handling
  - Multiple conflicts detection
- All tests pass with 100% coverage of the utility function

**Implementation Details:**
- Uses Day.js for reliable date parsing and comparison
- Sorts reservations by start time for efficient pairwise comparison
- Implements strict overlap detection: `current.end > next.start` (touching is allowed)
- Returns early for performance optimization on simple cases

**Code Quality:**
- Clear, readable implementation with comprehensive documentation
- Follows single responsibility principle
- Maintains consistent naming conventions
- Includes detailed JSDoc comments explaining algorithm and edge cases

---

## Final Steps

- Complete the "Explain your approach" sections for each part.
- Search the codebase for `TODO:` to ensure all have been addressed.

## Submission Guidelines

When you are done:

- run tests (see How To Get Started)
- run `npm run lint:fix`, it should not have any errors (there is a warning about the Typescript version, which is fine...)
- remove the node_module: `rm -rf ./node_modules`
- compress the repo into a ZIP file and
- upload the zip to Dropbox/Drive/... (in the past we had issues sharing the zip directly via email due to our malware scanning, it should technically work now, but a file-share is playing it safe)
- email us your submission back!

Once done, you are all set! 👏
