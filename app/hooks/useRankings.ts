import { useState, useEffect } from 'react'
import { Gene } from '../types/ranking'
import { mockRankings } from '../utils/mockData'

interface UseRankingsProps {
    region: string
    status: string
    limit: number
}

export const useRankings = ({ region, status, limit }: UseRankingsProps) => {
    const [data, setData] = useState<Gene[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRankings = async () => {
            setIsLoading(true)
            try {
                // Simulate API call with mock data
                await new Promise(resolve => setTimeout(resolve, 1000))

                let filteredData = [...mockRankings]

                // Apply filters
                if (region !== 'all') {
                    filteredData = filteredData.filter(g =>
                        region === 'stg' ? g.gene.startsWith('A') : g.gene.startsWith('B')
                    )
                }

                if (status !== 'all') {
                    filteredData = filteredData.filter(g => g.status === status)
                }

                // Apply limit
                filteredData = filteredData.slice(0, limit)

                setData(filteredData)
                setError(null)
            } catch (err) {
                setError('Failed to fetch rankings')
            } finally {
                setIsLoading(false)
            }
        }

        fetchRankings()
    }, [region, status, limit])

    const refetch = async () => {
        // Implement refetch logic
    }

    return { data, isLoading, error, refetch }
}