const fs = require('fs');
const path = require('path');
const glob = require('glob');

const SCRIPT_TAG = '<script src="/dashboard-console-capture.js"></script>';
const COMMENT = '<!-- Console capture script for dashboard debugging -->';

function injectScript() {
  // Find all HTML files in the build output
  const htmlFiles = glob.sync('.next/static/**/*.html') 
    .concat(glob.sync('out/**/*.html'))
    .concat(glob.sync('build/**/*.html'))
    .concat(glob.sync('dist/**/*.html'));

  if (htmlFiles.length === 0) {
    console.log('No HTML files found to inject console capture script');
    return;
  }

  htmlFiles.forEach(filePath => {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Skip if script already injected
      if (content.includes('/dashboard-console-capture.js')) {
        return;
      }
      
      // Try to inject in head
      if (content.includes('</head>')) {
        content = content.replace('</head>', `  ${COMMENT}\n  ${SCRIPT_TAG}\n</head>`);
      } else if (content.includes('<head>')) {
        content = content.replace('<head>', `<head>\n  ${COMMENT}\n  ${SCRIPT_TAG}`);
      } else {
        // Fallback: inject at the beginning of body
        content = content.replace('<body>', `<body>\n  ${COMMENT}\n  ${SCRIPT_TAG}`);
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`Injected console capture script into: ${filePath}`);
    } catch (error) {
      console.error(`Failed to inject script into ${filePath}:`, error.message);
    }
  });
  
  console.log(`Console capture script injection completed for ${htmlFiles.length} files`);
}

// Run the injection
injectScript();