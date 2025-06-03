<div align="center">
  <h1>astro-release-contributors 🙏</h1>
  <p>CLI tool to automatically generate a Markdown list of contributors in the Astro ecosystem since a given date.</p>
  <br />
</div>

## Getting Started

1. Clone this repository and navigate to the project directory.
1. Install dependencies:

   ```bash
   pnpm install
   ```

1. To avoid rate limiting, create a GitHub personal access token (classic) with the `repo` scope. Visit [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new) to create one.
1. Rename the `.env.example` file to `.env.local` and add your GitHub token to the `GITHUB_TOKEN` variable:

   ```env
   GITHUB_TOKEN=your_newly_created_token
   ```

1. Edit the `config.ts` file. Most of the time, you will only need to change the `SinceDate` variable to the date you want to start collecting contributors from.
1. Run the script to generate the contributors list:

   ```bash
   pnpm start
   ```

1. The generated list will be saved in the `result.md` file.

## License

Licensed under the MIT License, Copyright © HiDeoo.

See [LICENSE](https://github.com/HiDeoo/astro-release-contributors/blob/main/LICENSE) for more information.
