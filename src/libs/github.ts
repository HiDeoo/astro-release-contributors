import { Octokit } from 'octokit'

import { CoreTeamLogins, IgnoredLogins, Major, SinceDate, type Repos } from '../../config'

const octokit = new Octokit({
  auth: process.env['GITHUB_TOKEN'],
})

export async function getRepoPrNumbers(repo: (typeof Repos)[number], isMajor: boolean): Promise<number[]> {
  const prs = await getMergedPrs(repo, [
    `base:${isMajor ? Major.branches[repo] : 'main'}`,
    `merged:${isMajor ? Major.sinceDate.toISOString() : SinceDate.toISOString()}..${new Date().toISOString()}`,
  ])

  const allPrs = prs.flat()

  const mergedBranch = Major.mergedBranches?.[repo]
  if (mergedBranch) {
    const prsSinceMerge = await getMergedPrs(repo, [
      `base:${mergedBranch.branch}`,
      `merged:${mergedBranch.sinceDate.toISOString()}..${new Date().toISOString()}`,
    ])
    allPrs.push(...prsSinceMerge.flat())
  }

  const prNumbers: number[] = []

  for (const pr of allPrs) {
    // Skip bots
    if (pr.user?.type === 'Bot') continue
    // Skip ignored users (core team members are not ignored as their PRs can contain other contributors)
    if (!pr.user?.login || IgnoredLogins.includes(pr.user.login)) continue

    prNumbers.push(pr.number)
  }

  return prNumbers
}

/**
 * Get all contributors of a PR.
 * @see https://github.com/delucis/better-github-coauthors/blob/latest/extension/scripts/content.js#L70-L102
 */
export async function getPrContributors(repo: Repo, prNumber: number, contributors: Contributors) {
  const [owner, name] = repo.split('/') as [string, string]
  const commomOptions = { owner, repo: name, pull_number: prNumber, per_page: 100 }

  const [pr, comments, reviewComments, reviews] = await Promise.all([
    octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', commomOptions),
    octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}/comments', {
      ...commomOptions,
      issue_number: prNumber,
    }),
    octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/comments', commomOptions),
    octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews', commomOptions),
  ])

  // Add PR author if not ignored and not a core team member.
  if (!(pr.data.user.login in contributors) && !isInvalidContributor(pr.data.user.login)) {
    contributors[pr.data.user.login] = {
      login: pr.data.user.login,
      name: await getUserName(pr.data.user.login),
      link: pr.data.user.html_url,
    }
  }

  // Add commenters
  for (const { user } of [...comments.data, ...reviewComments.data, ...reviews.data]) {
    // Skip known contributors
    if (!user?.login || user?.login in contributors) continue
    // Skip bot comments
    if (user?.type === 'Bot') continue
    // Skip ignored users and core team members
    if (isInvalidContributor(user.login)) continue

    // Add commenters
    contributors[user.login] = {
      login: user.login,
      name: await getUserName(user.login),
      link: user.html_url,
    }
  }

  return Object.fromEntries(Object.values(contributors).map(({ name, link }) => [name, link]))
}

function getMergedPrs(repo: (typeof Repos)[number], queryParameters: string[]) {
  return octokit.paginate('GET /search/issues', {
    advanced_search: 'true',
    per_page: 100,
    q: [`repo:${repo}`, 'is:pr', 'is:merged', ...queryParameters].join(' '),
  })
}

async function getUserName(login: string): Promise<string> {
  const user = await octokit.request('GET /users/{username}', {
    username: login,
  })
  return user.data.name?.trim() || login
}

function isInvalidContributor(login: string): boolean {
  return IgnoredLogins.includes(login) || CoreTeamLogins.includes(login)
}

export type Repo = `${string}/${string}`
export type Contributors = Record<string, { login: string; name: string; link: string }>
