const fs = require('fs');

try {
  let opencvPath = 'node_modules/@techstark/opencv-js/dist/opencv.js';
  if (fs.existsSync(opencvPath)) {
    let code = fs.readFileSync(opencvPath, 'utf8');
    code = code.replace(/require\(['"]fs['"]\)/g, '{}')
               .replace(/require\(['"]path['"]\)/g, '{}')
               .replace(/require\(['"]crypto['"]\)/g, '{}');
    fs.writeFileSync(opencvPath, code);
    console.log('Patched opencv.js successfully');
  } else {
    console.log('opencv.js not found');
  }

  let workerPath = 'node_modules/@paddleocr/paddleocr-js/dist/assets/worker-entry-By2JMEH5.js';
  if (fs.existsSync(workerPath)) {
    let workerCode = fs.readFileSync(workerPath, 'utf8');
    // Replace import of ort.bundle.min.mjs which causes Turbopack to fail if missing
    workerCode = workerCode.replace(/import\s*['"]ort\.bundle\.min\.mjs['"]/g, '/* ignored ort import */');
    fs.writeFileSync(workerPath, workerCode);
    console.log('Patched worker-entry successfully');
  } else {
    console.log('worker-entry not found, trying other worker entries...');
    // If hash is different
    const assetsDir = 'node_modules/@paddleocr/paddleocr-js/dist/assets/';
    if (fs.existsSync(assetsDir)) {
      const files = fs.readdirSync(assetsDir);
      for (const file of files) {
        if (file.startsWith('worker-entry') && file.endsWith('.js')) {
          let workerCode = fs.readFileSync(assetsDir + file, 'utf8');
          workerCode = workerCode.replace(/import\s*['"]ort\.bundle\.min\.mjs['"]/g, '/* ignored ort import */');
          fs.writeFileSync(assetsDir + file, workerCode);
          console.log('Patched ' + file + ' successfully');
        }
      }
    }
  }
} catch (e) {
  console.error(e);
}
