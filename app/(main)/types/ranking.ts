export interface Gene {
    rank: number
    gene: string
    score: number
    status: 'known' | 'novel'
    chromosome: string
    network_degree: number
    top_features: string[]
    methylation_delta?: number
    histone_marks?: {
        h3k4me3?: number
        h3k27ac?: number
        h3k9me3?: number
    }
}

export interface RankingsResponse {
    data: Gene[]
    total: number
    page: number
    limit: number
    filters: {
        region: string
        status: string
    }
}

export interface SortConfig {
    field: 'rank' | 'gene' | 'score' | 'chromosome' | 'degree'
    direction: 'asc' | 'desc'
}