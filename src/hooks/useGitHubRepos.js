"use client"

import { useState, useEffect } from "react"
import { fetchGitHubRepos } from "../lib/github"

export function useGitHubRepos(username) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRepos = async () => {
    try {
      setLoading(true)
      const data = await fetchGitHubRepos(username)
      setRepos(data)
      setError(null)
    } catch (err) {
      setError("Failed to load repositories. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRepos()
  }, [username])

  return {
    repos,
    loading,
    error,
    refetch: fetchRepos,
  }
} 