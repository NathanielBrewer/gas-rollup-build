const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const environment = process.env.NODE_ENV || 'dev';
    const claspConfigPath = path.join(process.cwd(), 'dist', environment, '.clasp.json');
    let claspConfig;
    
    // Check if the file exists and can be required
    try {
      claspConfig = JSON.parse(await fs.promises.readFile(claspConfigPath, 'utf8'));  // Use fs.promises to read the file asynchronously

    } catch (err) {
      console.error(`[adjustClasp] Error loading clasp config from ${claspConfigPath}:`, err);
      return;
    }
    
    claspConfig.rootDir = path.join(process.cwd(), 'dist', environment);
    
    const propertyName = `${environment}ScriptId`;
    if(claspConfig.hasOwnProperty(propertyName)) {
      claspConfig.scriptId = claspConfig[propertyName];
    } else {
      console.warn( `[adjustClasp.js] Setting scriptId for target failed. No ScriptId found for target: ${environment}. Using current scriptId instead: ${claspConfig.scriptId}`);
    }

    await fs.promises.writeFile(claspConfigPath, JSON.stringify(claspConfig, null, 2), 'utf8');

  } catch (error) {
    console.error('[adjustClasp] Caught an error:', error);
  }
})();