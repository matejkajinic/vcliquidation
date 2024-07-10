# VC Liquidation Preference Simulation

## Description

This project is a React-based web application that simulates venture capital (VC) liquidation preferences and their impact on payout structures for VCs and founders at different exit values. It provides an interactive tool for entrepreneurs, investors, and students to understand how different liquidation preference terms affect the distribution of returns in various exit scenarios.

## Explanation
This simulation shows how liquidation preferences affect the payout structure between VCs and founders at different exit values. Adjust the parameters to see how they impact the distribution of returns.

- Investment Amount: The amount invested by the VC.
- Liquidation Preference Multiple: Determines the preference amount (Investment * Multiple).
- VC Ownership Percentage: The VC's equity stake in the company.
- Participation: If off, VC gets the greater of preference or ownership %. If on, VC gets preference plus pro-rata share of remaining (capped at 100% of exit value).

## AI-Assisted Development
This entire project, including the code, documentation, and this README, was created with the assistance of Claude, an AI language model developed by Anthropic. Claude is part of the Claude 3 model family, specifically version 3.5 Sonnet, with knowledge cut-off in April 2024.

## Features

- Interactive simulation of VC liquidation preferences
- Preset scenarios: "Founder-friendly", "VC-friendly", "Balanced", and "Custom"
- Adjustable parameters for custom scenarios:
  - Investment amount (up to $100M)
  - Liquidation preference multiple
  - VC ownership percentage
  - Participation option
- Real-time visualization of payout structures using dynamic charts
- Responsive design with a dark mode interface

## Technology Stack

- React: A JavaScript library for building user interfaces
- Vite: A modern frontend build tool that provides a faster and leaner development experience
- Recharts: A composable charting library built on React components
- Tailwind CSS: A utility-first CSS framework for rapidly building custom user interfaces

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js (version 14.0 or later)
- You have a basic understanding of React and JavaScript

## Installation

To install the VC Liquidation Preference Simulation, follow these steps:

1. Clone the repository

2. Navigate to the project directory
   
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the VC Liquidation Preference Simulation, use the following command:

```
npm run dev
```

This will start the development server. Open your web browser and navigate to `http://localhost:5173` (or the URL provided in your terminal) to view the application.

## Customizing Scenarios

You can customize the simulation by:

1. Selecting a preset scenario from the dropdown menu
2. Choosing the "Custom" option to adjust individual parameters:
   - Use the sliders to change the investment amount, liquidation preference multiple, and VC ownership percentage
   - Toggle the checkbox to enable or disable participation

The chart will update in real-time to reflect your changes.

## Deployment

To build the project for production, use the following command:

```
npm run build
```

This will generate a `dist` folder with production-ready files. You can deploy these files to any static site hosting service like Vercel, Netlify, or GitHub Pages.

## Contributing

Contributions to the VC Liquidation Preference Simulation are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b <branch_name>`
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

If you want to contact the maintainer of this project, please reach out through GitHub: [@matejkajinic](https://github.com/matejkajinic).

## Acknowledgements

- This project was created using [Vite](https://vitejs.dev/)
- Charting functionality provided by [Recharts](https://recharts.org/en-US/)
- Styling powered by [Tailwind CSS](https://tailwindcss.com/)
- Development assisted by Claude, an AI model by Anthropic, version Claude 3.5 Sonnet on July 10th 2024