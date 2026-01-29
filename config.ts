import type { Repo } from './src/libs/github'

/**
 * The date since which we want to find contributors.
 * This usually corresponds to the date of the last minor Astro release.
 *
 * To easily grab the date, you can use the following approach:
 *
 *   1. Open on GitHub the release commit of the last minor Astro release, e.g.
 *      https://github.com/withastro/astro/commit/08d38c6ca489142e923383a8b19ad1038313d30d for Astro 5.17.0.
 *   2. Append `.patch` at the end of the URL, e.g.
 *      https://github.com/withastro/astro/commit/08d38c6ca489142e923383a8b19ad1038313d30d.patch
 *   3. Copy the `Date` from the third line of the patch file, e.g.
 *      `Date: Thu, 29 Jan 2026 03:07:19 -0800` and paste it below.
 */
export const SinceDate = new Date('Thu, 29 Jan 2026 03:07:19 -0800')

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
export const Major: { branches: Record<(typeof Repos)[number], string>; sinceDate: Date } = {
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
   * The date since which we want to find contributors.
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
