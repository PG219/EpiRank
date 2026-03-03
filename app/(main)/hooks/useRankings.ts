import { useState, useEffect, useCallback } from 'react'
import { Gene } from '../types/ranking'

interface UseRankingsProps {
    region: string
    status: string
    limit: number
}

export const useRankings = ({ region, status, limit }: UseRankingsProps) => {
    const [data, setData] = useState<Gene[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchRankings = useCallback(async () => {
        setIsLoading(true)
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/rankings`
            )

            if (!res.ok) throw new Error('Failed to fetch')

            let fetchedData: Gene[] = await res.json()

            // Apply filters client-side
            if (region !== 'all') {
                fetchedData = fetchedData.filter(g => g.region === region)
            }

            if (status !== 'all') {
                fetchedData = fetchedData.filter(g => g.status === status)
            }

            // Apply limit
            fetchedData = fetchedData.slice(0, limit)

            setData(fetchedData)
            setError(null)
        } catch (err) {
            setError('Failed to fetch rankings — is the API running?')
        } finally {
            setIsLoading(false)
        }
    }, [region, status, limit])

    useEffect(() => {
        fetchRankings()
    }, [fetchRankings])

    return { data, isLoading, error, refetch: fetchRankings }
}
