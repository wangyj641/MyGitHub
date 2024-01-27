import { LRUCache } from "lru-cache"

const isServer = typeof window === 'undefined'

const options = {
  //max: 500,
  // how long to live in ms
  ttl: 1000 * 60 * 60, // 1 hour
}

// apply LRU cache, after TTL, delete the cache
const repoCache = new LRUCache(options)

export function cacheRepo(repo) {
  repoCache.set(repo.full_name, repo)
}

export function getRepoFromCache(repoFullName) {
  return repoCache.get(repoFullName)
}

export function cacheRepos(repos) {
  if (repos && Array.isArray(repos)) {
    repos.forEach(repo => cacheRepo(repo))
  }
}