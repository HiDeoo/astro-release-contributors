import type { Repo } from './src/libs/github'

/**
 * The date since which we want to find contributors.
 * This usually corresponds to the date of the last minor Astro release.
 *
 * To easily grab the date, you can use the following approach:
 *
 *   1. Open on GitHub the release commit of the last minor Astro release, e.g.
 *      https://github.com/withastro/astro/commit/0ad80d9296d8bc5427bcfd5c306acf853f13de68 for Astro 5.10.0.
 *   2. Append `.patch` at the end of the URL, e.g.
 *      https://github.com/withastro/astro/commit/0ad80d9296d8bc5427bcfd5c306acf853f13de68.patch
 *   3. Copy the `Date` from the third line of the patch file, e.g.
 *      `Date: Thu, 19 Jun 2025 04:05:13 -0700` and paste it below.
 */
export const SinceDate = new Date('Thu, 19 Jun 2025 04:05:13 -0700')

/**
 * The list of repositories to find contributors in using the `owner/repo` format.
 */
export const Repos: Repo[] = ['withastro/astro', 'withastro/docs']

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
