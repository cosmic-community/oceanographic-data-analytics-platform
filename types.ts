// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Dataset interface
export interface Dataset extends CosmicObject {
  type: 'datasets';
  metadata: {
    dataset_id: string;
    collection_date?: string;
    location?: string;
    directory_path?: string;
    processing_status?: {
      key: ProcessingStatus;
      value: string;
    };
    files_present?: string[];
    description?: string;
    notes?: string;
  };
}

// Data Analysis interface
export interface DataAnalysis extends CosmicObject {
  type: 'data-analyses';
  metadata: {
    analysis_title: string;
    dataset?: string | Dataset;
    analysis_type?: {
      key: AnalysisType;
      value: string;
    };
    processing_date?: string;
    key_findings?: string;
    detailed_results?: string;
    excel_output_file?: {
      url: string;
      imgix_url?: string;
    };
    data_quality?: {
      key: DataQuality;
      value: string;
    };
    issues_found?: string;
  };
}

// Visualization interface
export interface Visualization extends CosmicObject {
  type: 'visualizations';
  metadata: {
    visualization_title: string;
    chart_type?: {
      key: ChartType;
      value: string;
    };
    related_dataset?: string | Dataset;
    related_analysis?: DataAnalysis;
    chart_image?: {
      url: string;
      imgix_url: string;
    };
    parameters_used?: string;
    insights?: string;
    libraries_used?: string[];
  };
}

// Research Note interface
export interface ResearchNote extends CosmicObject {
  type: 'research-notes';
  metadata: {
    note_title: string;
    note_type?: {
      key: NoteType;
      value: string;
    };
    related_datasets?: Dataset[];
    related_analyses?: DataAnalysis[];
    content?: string;
    priority?: {
      key: Priority;
      value: string;
    };
    tags?: string;
  };
}

// Type literals for select-dropdown values
export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'error';
export type AnalysisType = 'meta' | 'prof' | 'rtraj' | 'combined';
export type DataQuality = 'excellent' | 'good' | 'fair' | 'poor';
export type ChartType = 'line_plot' | 'scatter_plot' | 'pie_chart' | 'bar_chart' | 'heatmap' | 'interactive';
export type NoteType = 'observation' | 'hypothesis' | 'question' | 'conclusion' | 'todo';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Chart data types for visualizations
export interface ChartDataPoint {
  x: number;
  y: number;
  label?: string;
}

export interface ChartConfig {
  type: 'line' | 'scatter' | 'pie' | 'bar';
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string;
      borderWidth?: number;
    }[];
  };
  options?: any;
}

// Utility types
export type AllContentTypes = Dataset | DataAnalysis | Visualization | ResearchNote;
export type ContentTypeString = 'datasets' | 'data-analyses' | 'visualizations' | 'research-notes';