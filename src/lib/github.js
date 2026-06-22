export async function fetchGitHubRepos(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }

    const repos = await response.json()
    return repos
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    throw error
  }
}

// Generate a simple hash for the OG image URL
export function generateSimpleHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).substring(0, 12)
}

// Generate GitHub OG image URL
export function getGitHubOGImageUrl(repo) {
  const hash = generateSimpleHash(`${repo.id}-${repo.updated_at}`)
  return `https://opengraph.githubassets.com/${hash}/${repo.owner.login}/${repo.name}`
}

// Get color for programming language
export function getLanguageColor(language) {
  const colors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    C: "#555555",
    "C++": "#f34b7d",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Go: "#00ADD8",
    Rust: "#dea584",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    "C#": "#178600",
    default: "#f1e05a", // Default to JavaScript color
  }

  return colors[language] || colors.default
} 