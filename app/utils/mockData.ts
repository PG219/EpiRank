import { Gene } from '../types/ranking'

export const mockRankings: Gene[] = [
    {
        rank: 1,
        gene: 'APOE',
        score: 0.98,
        status: 'known',
        chromosome: '19',
        network_degree: 156,
        top_features: ['Methylation Delta', 'Network Degree', 'Histone H3K4me3'],
        methylation_delta: 0.45,
        histone_marks: {
            h3k4me3: 0.92,
            h3k27ac: 0.87,
            h3k9me3: 0.12
        }
    },
    {
        rank: 2,
        gene: 'BIN1',
        score: 0.95,
        status: 'known',
        chromosome: '2',
        network_degree: 89,
        top_features: ['Network Degree', 'Chromatin Accessibility', 'Histone H3K27ac'],
        methylation_delta: 0.32,
        histone_marks: {
            h3k4me3: 0.78,
            h3k27ac: 0.91,
            h3k9me3: 0.08
        }
    },
    {
        rank: 3,
        gene: 'ABCA7',
        score: 0.92,
        status: 'novel',
        chromosome: '19',
        network_degree: 67,
        top_features: ['Methylation Delta', 'Histone H3K9me3', 'Network Degree'],
        methylation_delta: 0.56,
        histone_marks: {
            h3k4me3: 0.45,
            h3k27ac: 0.52,
            h3k9me3: 0.67
        }
    },
    {
        rank: 4,
        gene: 'CLU',
        score: 0.89,
        status: 'known',
        chromosome: '8',
        network_degree: 78,
        top_features: ['Chromatin Accessibility', 'Network Degree', 'Methylation Delta'],
        methylation_delta: 0.28,
        histone_marks: {
            h3k4me3: 0.82,
            h3k27ac: 0.79,
            h3k9me3: 0.15
        }
    },
    {
        rank: 5,
        gene: 'PICALM',
        score: 0.87,
        status: 'known',
        chromosome: '11',
        network_degree: 92,
        top_features: ['Network Degree', 'Histone H3K4me3', 'Chromatin Accessibility'],
        methylation_delta: 0.21,
        histone_marks: {
            h3k4me3: 0.88,
            h3k27ac: 0.76,
            h3k9me3: 0.09
        }
    },
    {
        rank: 6,
        gene: 'SORL1',
        score: 0.85,
        status: 'novel',
        chromosome: '11',
        network_degree: 45,
        top_features: ['Methylation Delta', 'Histone H3K9me3', 'Network Degree'],
        methylation_delta: 0.61,
        histone_marks: {
            h3k4me3: 0.34,
            h3k27ac: 0.41,
            h3k9me3: 0.73
        }
    },
    {
        rank: 7,
        gene: 'CR1',
        score: 0.82,
        status: 'known',
        chromosome: '1',
        network_degree: 34,
        top_features: ['Chromatin Accessibility', 'Network Degree', 'Histone H3K27ac'],
        methylation_delta: 0.18,
        histone_marks: {
            h3k4me3: 0.71,
            h3k27ac: 0.83,
            h3k9me3: 0.11
        }
    },
    {
        rank: 8,
        gene: 'MS4A6A',
        score: 0.80,
        status: 'novel',
        chromosome: '11',
        network_degree: 28,
        top_features: ['Methylation Delta', 'Histone H3K9me3', 'Network Degree'],
        methylation_delta: 0.49,
        histone_marks: {
            h3k4me3: 0.29,
            h3k27ac: 0.35,
            h3k9me3: 0.58
        }
    },
    {
        rank: 9,
        gene: 'CD2AP',
        score: 0.78,
        status: 'known',
        chromosome: '6',
        network_degree: 41,
        top_features: ['Network Degree', 'Histone H3K4me3', 'Chromatin Accessibility'],
        methylation_delta: 0.15,
        histone_marks: {
            h3k4me3: 0.69,
            h3k27ac: 0.64,
            h3k9me3: 0.13
        }
    },
    {
        rank: 10,
        gene: 'EPHA1',
        score: 0.76,
        status: 'novel',
        chromosome: '7',
        network_degree: 23,
        top_features: ['Methylation Delta', 'Histone H3K9me3', 'Network Degree'],
        methylation_delta: 0.44,
        histone_marks: {
            h3k4me3: 0.38,
            h3k27ac: 0.33,
            h3k9me3: 0.62
        }
    }
]