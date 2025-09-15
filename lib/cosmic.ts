import { createBucketClient } from '@cosmicjs/sdk'
import type { 
  Dataset, 
  DataAnalysis, 
  Visualization, 
  ResearchNote, 
  CosmicResponse 
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all datasets
export async function getDatasets(): Promise<Dataset[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'datasets' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as Dataset[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch datasets');
  }
}

// Get dataset by slug
export async function getDataset(slug: string): Promise<Dataset | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'datasets', slug })
      .depth(1);
    
    return response.object as Dataset;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Get all data analyses
export async function getDataAnalyses(): Promise<DataAnalysis[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'data-analyses' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as DataAnalysis[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch data analyses');
  }
}

// Get data analysis by slug
export async function getDataAnalysis(slug: string): Promise<DataAnalysis | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'data-analyses', slug })
      .depth(1);
    
    return response.object as DataAnalysis;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Get all visualizations
export async function getVisualizations(): Promise<Visualization[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'visualizations' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as Visualization[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch visualizations');
  }
}

// Get visualization by slug
export async function getVisualization(slug: string): Promise<Visualization | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'visualizations', slug })
      .depth(1);
    
    return response.object as Visualization;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Get all research notes
export async function getResearchNotes(): Promise<ResearchNote[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'research-notes' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as ResearchNote[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch research notes');
  }
}

// Get research note by slug
export async function getResearchNote(slug: string): Promise<ResearchNote | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'research-notes', slug })
      .depth(1);
    
    return response.object as ResearchNote;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Get analyses for a specific dataset
export async function getAnalysesForDataset(datasetId: string): Promise<DataAnalysis[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'data-analyses',
        'metadata.dataset': datasetId 
      })
      .depth(1);
    
    return response.objects as DataAnalysis[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch analyses for dataset');
  }
}

// Get visualizations for a specific dataset
export async function getVisualizationsForDataset(datasetId: string): Promise<Visualization[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'visualizations',
        'metadata.related_dataset': datasetId 
      })
      .depth(1);
    
    return response.objects as Visualization[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch visualizations for dataset');
  }
}