export const mockMetricsData = {
    precision: {
        at10: 0.923,
        at20: 0.887,
        at50: 0.756,
        at100: 0.634
    },
    recall: {
        at10: 0.412,
        at20: 0.567,
        at50: 0.723,
        at100: 0.845
    },
    auc: {
        roc: 0.894,
        pr: 0.856
    },
    shap_coherence: 0.812,
    sample_counts: {
        ad: 1247,
        control: 892,
        total: 2139
    },
    feature_importance: [
        { name: 'Methylation Delta', importance: 0.92, category: 'methylation', shap_coherence: 0.89 },
        { name: 'Histone H3K4me3', importance: 0.87, category: 'histone', shap_coherence: 0.84 },
        { name: 'Network Degree', importance: 0.83, category: 'network', shap_coherence: 0.79 },
        { name: 'Chromatin Accessibility', importance: 0.78, category: 'chromatin', shap_coherence: 0.81 },
        { name: 'Histone H3K27ac', importance: 0.74, category: 'histone', shap_coherence: 0.76 },
        { name: 'Histone H3K9me3', importance: 0.69, category: 'histone', shap_coherence: 0.72 },
        { name: 'CpG Island Density', importance: 0.65, category: 'methylation', shap_coherence: 0.68 },
        { name: 'Transcription Factor Binding', importance: 0.61, category: 'chromatin', shap_coherence: 0.64 }
    ],
    cross_validation: {
        folds: 5,
        mean_auc: 0.887,
        std_auc: 0.023,
        fold_scores: [0.892, 0.878, 0.901, 0.869, 0.895]
    },
    confusion_matrix: {
        true_positive: 845,
        false_positive: 124,
        true_negative: 768,
        false_negative: 402
    }
}