import fs from 'node:fs/promises'

import { getPrContributors, getRepoPrNumbers, type Contributors, type Repo } from './libs/github'
import { Repos, SinceDate } from '../config'

const pullRequestsByRepo = new Map<Repo, number[]>()

console.info(`Finding PRs since ${SinceDate.toLocaleDateString()} ${SinceDate.toLocaleTimeString()}.\n`)

// Fetch PR numbers for each repo since the date specified in the `config.ts` file.
for (const repo of Repos) {
  const prs = await getRepoPrNumbers(repo)
  pullRequestsByRepo.set(repo, prs)

  console.info(`Found ${prs.length} PRs for repo '${repo}'.`)
}

console.info('')

// PR contributors keyed by their login.
let contributors: Contributors = {}

// Fetch contributors for each PR.
for (const [repo, prs] of pullRequestsByRepo) {
  if (prs.length === 0) continue

  for (const [index, pr] of prs.entries()) {
    process.stdout.write(`\rFetching contributors for repo '${repo}'… (${index + 1}/${prs.length}) `)

    await getPrContributors(repo, pr, contributors)
  }

  process.stdout.write('\n')
}

// Sort alphabetically and format contributors for Markdown output.
const sortedContributors = Object.values(contributors).sort((a, b) => a.name.localeCompare(b.name, 'en'))
const mdContributors = sortedContributors.map(({ name, link }) => `[${name}](${link})`)

await fs.writeFile(
  'result.md',
  new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(mdContributors),
  'utf-8',
)

console.info(`\n🎉 Wrote ${sortedContributors.length} contributors to \`result.md\`.`)
