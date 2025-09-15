# Oceanographic Data Analytics Platform

![App Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=300&fit=crop&auto=format)

A comprehensive Next.js web application for managing and analyzing oceanographic data from NetCDF files. Built with your existing Cosmic content structure to provide researchers with tools for dataset management, analysis documentation, visualization tracking, and research note organization.

## ✨ Features

- **Dataset Management**: Track NetCDF files with processing status, location data, and file validation
- **Analysis Documentation**: Record detailed findings, processing dates, and data quality assessments  
- **Visualization Gallery**: Display charts with insights, parameters, and multiple chart types
- **Research Notes System**: Organize observations, hypotheses, and to-do items with priority levels
- **Cross-Referenced Content**: Link datasets, analyses, visualizations, and notes together
- **Responsive Design**: Mobile-friendly interface for accessing research data anywhere
- **Search & Filter**: Find specific datasets, analyses, or notes quickly
- **Status Tracking**: Monitor processing progress across all datasets

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68c8113bfe0840663f64f5dd&clone_repository=68c8159ffe0840663f64f611)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I am working on a project that involves processing and visualizing oceanographic data stored in .nc (NetCDF) files. These files are organized in a directory structure like dataset/data1/, dataset/data2/, and so on, where each subfolder contains three .nc files with filenames in the format [some_id]_meta.nc, [some_id]_prof.nc, and [some_id]_Rtraj.nc. The some_id part (e.g., 1900121) differs across folders, but the three file types—meta, prof, and Rtraj—are consistent. For the initial phase, I want to work with the data located in my Downloads folder, and I would like you to build this project step by step, starting from loading and converting all these .nc files into Excel format. After the conversion, I want the data from each group of three files (within each data folder) to be combined and displayed similarly to how it's shown on a webpage like https://argo.whoi.edu/wmo/2902282/index.html. I also want to visualize the data in an interactive and clean way, with clear separation and labeling of the different file types (prof, Rtraj, meta), including their contents displayed as tables, pie charts, line plots, etc., using libraries like Seaborn, Matplotlib, and Pandas for rich visual analytics. The design and UI should be kept simple and minimalistic but functional, allowing me to later ask specific questions about the contents of any individual file. Please ensure the project is modular and well-organized so I can build upon it later or integrate it with other tools."

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Content Management**: Cosmic CMS
- **Charts & Visualization**: Chart.js, React Chart.js 2
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Datasets with Processing Status
```typescript
const datasets = await cosmic.objects
  .find({ type: 'datasets' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Getting Analyses for a Specific Dataset
```typescript
const analyses = await cosmic.objects
  .find({ 
    type: 'data-analyses',
    'metadata.dataset': datasetId 
  })
  .depth(1);
```

### Creating New Research Notes
```typescript
await cosmic.objects.insertOne({
  type: 'research-notes',
  title: 'New Research Finding',
  metadata: {
    note_title: 'New Research Finding',
    note_type: { key: 'observation', value: 'Observation' },
    content: '# Important Discovery\n\nDetailed findings...',
    priority: { key: 'high', value: 'High' }
  }
});
```

## 🎯 Cosmic CMS Integration

This application leverages your existing Cosmic content structure:

- **Datasets**: NetCDF file tracking with processing status, location, and file validation
- **Data Analyses**: Documentation of analysis results, findings, and data quality
- **Visualizations**: Chart management with insights, parameters, and related data
- **Research Notes**: Note-taking system with priorities, types, and cross-references

All content types are interconnected through object relationships, allowing for comprehensive data tracking and analysis workflow management.

## 🚀 Deployment

### Deploy to Vercel

1. Connect your repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy automatically on every push to main

### Environment Variables

Set these variables in your deployment platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

The application is optimized for deployment on Vercel with automatic TypeScript checking and error prevention.
<!-- README_END -->