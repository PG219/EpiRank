export const mockExplorerData = {
    genes: [
        {
            id: '1',
            name: 'APOE',
            full_name: 'Apolipoprotein E',
            description: 'Major risk factor for late-onset Alzheimer\'s disease. Involved in lipid transport and metabolism.',
            chromosome: '19',
            start: 44905791,
            end: 44909393,
            strand: '+',
            score: 0.98,
            status: 'known',
            evidence_level: 'high',
            pathways: ['Lipid Metabolism', 'Cholesterol Transport', 'Neuroinflammation'],
            diseases: ['Alzheimer\'s Disease', 'Cardiovascular Disease'],
            expression: {
                brain: 0.92,
                blood: 0.45,
                other: 0.67
            },
            interactions: 156,
            methylation_delta: 0.45,
            histone_marks: {
                h3k4me3: 0.92,
                h3k27ac: 0.87,
                h3k9me3: 0.12
            }
        },
        {
            id: '2',
            name: 'BIN1',
            full_name: 'Bridging Integrator 1',
            description: 'Involved in synaptic vesicle endocytosis and membrane trafficking. Associated with late-onset AD.',
            chromosome: '2',
            start: 127805238,
            end: 127865000,
            strand: '-',
            score: 0.95,
            status: 'known',
            evidence_level: 'high',
            pathways: ['Endocytosis', 'Synaptic Function', 'Membrane Trafficking'],
            diseases: ['Alzheimer\'s Disease', 'Myopathy'],
            expression: {
                brain: 0.88,
                blood: 0.32,
                other: 0.54
            },
            interactions: 89,
            methylation_delta: 0.32,
            histone_marks: {
                h3k4me3: 0.78,
                h3k27ac: 0.91,
                h3k9me3: 0.08
            }
        },
        {
            id: '3',
            name: 'ABCA7',
            full_name: 'ATP Binding Cassette Subfamily A Member 7',
            description: 'Involved in lipid homeostasis and phagocytosis. Risk factor for Alzheimer\'s disease.',
            chromosome: '19',
            start: 1040101,
            end: 1064300,
            strand: '+',
            score: 0.92,
            status: 'novel',
            evidence_level: 'high',
            pathways: ['Lipid Transport', 'Phagocytosis', 'Immune Response'],
            diseases: ['Alzheimer\'s Disease'],
            expression: {
                brain: 0.65,
                blood: 0.71,
                other: 0.48
            },
            interactions: 67,
            methylation_delta: -0.56,
            histone_marks: {
                h3k4me3: 0.45,
                h3k27ac: 0.52,
                h3k9me3: 0.67
            }
        },
        {
            id: '4',
            name: 'CLU',
            full_name: 'Clusterin',
            description: 'Molecular chaperone involved in protein aggregation and clearance. Associated with AD risk.',
            chromosome: '8',
            start: 27457367,
            end: 27470000,
            strand: '-',
            score: 0.89,
            status: 'known',
            evidence_level: 'high',
            pathways: ['Protein Folding', 'Apoptosis', 'Complement System'],
            diseases: ['Alzheimer\'s Disease', 'Cancer'],
            expression: {
                brain: 0.79,
                blood: 0.83,
                other: 0.62
            },
            interactions: 78,
            methylation_delta: 0.28,
            histone_marks: {
                h3k4me3: 0.82,
                h3k27ac: 0.79,
                h3k9me3: 0.15
            }
        },
        {
            id: '5',
            name: 'PICALM',
            full_name: 'Phosphatidylinositol Binding Clathrin Assembly Protein',
            description: 'Regulates clathrin-mediated endocytosis. Associated with Alzheimer\'s disease risk.',
            chromosome: '11',
            start: 85667897,
            end: 85780000,
            strand: '+',
            score: 0.87,
            status: 'known',
            evidence_level: 'high',
            pathways: ['Endocytosis', 'Vesicle Trafficking', 'Iron Metabolism'],
            diseases: ['Alzheimer\'s Disease'],
            expression: {
                brain: 0.84,
                blood: 0.56,
                other: 0.61
            },
            interactions: 92,
            methylation_delta: 0.21,
            histone_marks: {
                h3k4me3: 0.88,
                h3k27ac: 0.76,
                h3k9me3: 0.09
            }
        },
        {
            id: '6',
            name: 'SORL1',
            full_name: 'Sortilin Related Receptor 1',
            description: 'Involved in intracellular trafficking. Strong genetic risk factor for Alzheimer\'s disease.',
            chromosome: '11',
            start: 121452987,
            end: 121630000,
            strand: '-',
            score: 0.85,
            status: 'novel',
            evidence_level: 'high',
            pathways: ['Protein Trafficking', 'Endocytosis', 'APP Processing'],
            diseases: ['Alzheimer\'s Disease'],
            expression: {
                brain: 0.71,
                blood: 0.38,
                other: 0.44
            },
            interactions: 45,
            methylation_delta: -0.61,
            histone_marks: {
                h3k4me3: 0.34,
                h3k27ac: 0.41,
                h3k9me3: 0.73
            }
        },
        {
            id: '7',
            name: 'CR1',
            full_name: 'Complement C3b/C4b Receptor 1',
            description: 'Complement receptor involved in immune response. Associated with Alzheimer\'s risk.',
            chromosome: '1',
            start: 207669481,
            end: 207820000,
            strand: '+',
            score: 0.82,
            status: 'known',
            evidence_level: 'medium',
            pathways: ['Complement System', 'Immune Response', 'Inflammation'],
            diseases: ['Alzheimer\'s Disease', 'Systemic Lupus'],
            expression: {
                brain: 0.45,
                blood: 0.92,
                other: 0.51
            },
            interactions: 34,
            methylation_delta: 0.18,
            histone_marks: {
                h3k4me3: 0.71,
                h3k27ac: 0.83,
                h3k9me3: 0.11
            }
        },
        {
            id: '8',
            name: 'MS4A6A',
            full_name: 'Membrane Spanning 4-Domains A6A',
            description: 'May be involved in signal transduction. Associated with Alzheimer\'s disease risk.',
            chromosome: '11',
            start: 59937480,
            end: 59950000,
            strand: '-',
            score: 0.80,
            status: 'novel',
            evidence_level: 'medium',
            pathways: ['Signal Transduction', 'Immune Response'],
            diseases: ['Alzheimer\'s Disease'],
            expression: {
                brain: 0.62,
                blood: 0.74,
                other: 0.39
            },
            interactions: 28,
            methylation_delta: -0.49,
            histone_marks: {
                h3k4me3: 0.29,
                h3k27ac: 0.35,
                h3k9me3: 0.58
            }
        },
        {
            id: '9',
            name: 'CD2AP',
            full_name: 'CD2 Associated Protein',
            description: 'Adapter protein involved in cytoskeletal organization. Associated with AD risk.',
            chromosome: '6',
            start: 47445587,
            end: 47590000,
            strand: '+',
            score: 0.78,
            status: 'known',
            evidence_level: 'medium',
            pathways: ['Cytoskeleton', 'Endocytosis', 'Cell Adhesion'],
            diseases: ['Alzheimer\'s Disease', 'Kidney Disease'],
            expression: {
                brain: 0.69,
                blood: 0.51,
                other: 0.57
            },
            interactions: 41,
            methylation_delta: 0.15,
            histone_marks: {
                h3k4me3: 0.69,
                h3k27ac: 0.64,
                h3k9me3: 0.13
            }
        },
        {
            id: '10',
            name: 'EPHA1',
            full_name: 'EPH Receptor A1',
            description: 'Receptor tyrosine kinase involved in development. Associated with Alzheimer\'s risk.',
            chromosome: '7',
            start: 143488899,
            end: 143510000,
            strand: '-',
            score: 0.76,
            status: 'novel',
            evidence_level: 'medium',
            pathways: ['Kinase Signaling', 'Axon Guidance', 'Development'],
            diseases: ['Alzheimer\'s Disease'],
            expression: {
                brain: 0.58,
                blood: 0.42,
                other: 0.63
            },
            interactions: 23,
            methylation_delta: -0.44,
            histone_marks: {
                h3k4me3: 0.38,
                h3k27ac: 0.33,
                h3k9me3: 0.62
            }
        },
        {
            id: '11',
            name: 'TREM2',
            full_name: 'Triggering Receptor Expressed On Myeloid Cells 2',
            description: 'Immune receptor involved in microglial function. Strong risk factor for AD.',
            chromosome: '6',
            start: 41129252,
            end: 41138000,
            strand: '+',
            score: 0.74,
            status: 'known',
            evidence_level: 'high',
            pathways: ['Immune Response', 'Microglial Function', 'Phagocytosis'],
            diseases: ['Alzheimer\'s Disease', 'Nasu-Hakola Disease'],
            expression: {
                brain: 0.81,
                blood: 0.35,
                other: 0.29
            },
            interactions: 52,
            methylation_delta: 0.34,
            histone_marks: {
                h3k4me3: 0.73,
                h3k27ac: 0.68,
                h3k9me3: 0.21
            }
        },
        {
            id: '12',
            name: 'CD33',
            full_name: 'CD33 Molecule',
            description: 'Sialic acid-binding receptor on myeloid cells. Associated with Alzheimer\'s risk.',
            chromosome: '19',
            start: 51728362,
            end: 51744000,
            strand: '-',
            score: 0.72,
            status: 'known',
            evidence_level: 'high',
            pathways: ['Immune Response', 'Cell Adhesion', 'Phagocytosis'],
            diseases: ['Alzheimer\'s Disease'],
            expression: {
                brain: 0.54,
                blood: 0.87,
                other: 0.33
            },
            interactions: 38,
            methylation_delta: 0.23,
            histone_marks: {
                h3k4me3: 0.61,
                h3k27ac: 0.57,
                h3k9me3: 0.18
            }
        }
    ]
}