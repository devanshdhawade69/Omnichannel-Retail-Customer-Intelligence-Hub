export interface RegressionResponse {
  r2_score: number;
  predictions: { actual: number; predicted: number }[];
}

export interface ClusteringResponse {
  centroids: number[][];
  summary: { recency: number; frequency: number; monetary: number }[];
  labels: number[];
}

export interface ClassificationResponse {
  decision_tree: {
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
    confusion_matrix: number[][];
  };
  naive_bayes: {
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
    confusion_matrix: number[][];
  };
}

export interface AssociationResponse {
  rules: {
    antecedents: string[];
    consequents: string[];
    support: number;
    confidence: number;
    lift: number;
  }[];
}
