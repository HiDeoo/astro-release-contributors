import type { Repo } from './src/libs/github'

/**
 * The date since when we want to find contributors.
 * This usually corresponds to the date of the last minor Astro release.
 *
 * To easily grab the date, you can use the following approach:
 *
 *   1. Open on GitHub the release commit of the last minor Astro release, e.g.
 *      https://github.com/withastro/astro/commit/011f06106531419f27ce53d0641a3e6ef9db5108 for Astro 5.18.0.
 *   2. Append `.patch` at the end of the URL, e.g.
 *      https://github.com/withastro/astro/commit/011f06106531419f27ce53d0641a3e6ef9db5108.patch
 *   3. Copy the `Date` from the third line of the patch file, e.g.
 *      `Date: Wed, 25 Feb 2026 10:34:48 -0800` and paste it below.
 */
export const SinceDate = new Date('Wed, 25 Feb 2026 10:34:48 -0800')

/**
 * The list of repositories to find contributors in using the `owner/repo` format.
 */
export const Repos = ['withastro/astro', 'withastro/docs'] as const satisfies readonly Repo[]

/**
 * The list of GitHub logins to ignore when fetching contributors.
 * The login of a specific user can be found in the URL of their GitHub profile, e.g. after clicking on their username.
 */
export const IgnoredLogins: string[] = ['astrobot-houston']

/**
 * The list of the Astro core team members' GitHub logins.
 * The login of a specific user can be found in the URL of their GitHub profile, e.g. after clicking on their username.
 *
 * @todo Automate this list as a possible future improvement.
 *
 * @see https://github.com/withastro/.github/blob/main/MEMBERS.md#core
 */
export const CoreTeamLogins: string[] = [
  'aFuzzyBear',
  'alexanderniebuhr',
  'ArmandPhilippot',
  'ascorbic',
  'bholmesdev',
  'delucis',
  'ematipico',
  'florian-lefebvre',
  'Fryuni',
  'HiDeoo',
  'jasikpark',
  'matthewp',
  'natemoo-re',
  'Princesseuh',
  'sarah11918',
  'TheOtterlord',
  'yanthomasdev',
]

/**
 * The specific configuration for finding contributors for a future major release.
 */
export const Major: {
  branches: Record<(typeof Repos)[number], string>
  mergedBranches: { [key in (typeof Repos)[number]]?: { branch: string; sinceDate: Date } }
  sinceDate: Date
} = {
  /**
   * The branches where the next major release is being developed for each repository to find contributors in.
   * A branch for each repository must be specified here.
   *
   * @see Repos
   */
  branches: {
    'withastro/astro': 'next',
    'withastro/docs': 'v6',
  },
  /**
   * If some branches specified above were merged into another branch, you can define in this property which branch and
   * since when to also look for merged PRs to not miss any contributor.
   */
  mergedBranches: {
    'withastro/astro': {
      /**
       * The branch into which the development branch was merged.
       */
      branch: 'main',
      /**
       * The date since when we want to find contributors.
       * This usually corresponds to the date when the development branch was merged into the other branch.
       *
       * To easily grab the date, you can use the following approach:
       *
       *   1. Open on GitHub the commit merging the development branch into the other branch, e.g.
       *      https://github.com/withastro/astro/commit/955edb9f6d806d23942655cdabb60decb9cb491c for Astro 6.0.0.
       *   2. Append `.patch` at the end of the URL, e.g.
       *      https://github.com/withastro/astro/commit/955edb9f6d806d23942655cdabb60decb9cb491c.patch
       *   3. Copy the `Date` from the third line of the patch file, e.g.
       *      `Date: Mon, 15 Sep 2025 16:27:25 +0200` and paste it below.
       */
      sinceDate: new Date('Mon, 15 Sep 2025 16:27:25 +0200'),
    },
  },
  /**
   * The date since when we want to find contributors.
   * This usually corresponds to the date of the last major Astro release.
   *
   * To easily grab the date, you can use the following approach:
   *
   *   1. Open on GitHub the release commit of the last major Astro release, e.g.
   *      https://github.com/withastro/astro/commit/fcdd37f684833eeb00dcecad21d9f4308cd6caa4 for Astro 5.0.0.
   *   2. Append `.patch` at the end of the URL, e.g.
   *      https://github.com/withastro/astro/commit/fcdd37f684833eeb00dcecad21d9f4308cd6caa4.patch
   *   3. Copy the `Date` from the third line of the patch file, e.g.
   *      `Date: Tue, 3 Dec 2024 02:56:34 -0800` and paste it below.
   */
  sinceDate: new Date('Tue, 3 Dec 2024 02:56:34 -0800'),
}
