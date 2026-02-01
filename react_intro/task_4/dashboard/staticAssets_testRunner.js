import fs from 'fs';

// Test standard pour vérifier les assets statiques
function testStaticAssets() {
  try {
    // Vérifier dist/
    if (!fs.existsSync('dist')) {
      return false;
    }
    
    // Vérifier dist/index.html
    if (!fs.existsSync('dist/index.html')) {
      return false;
    }
    
    // Vérifier dist/assets/
    if (!fs.existsSync('dist/assets')) {
      return false;
    }
    
    // Vérifier qu'il y a des fichiers dans dist/assets/
    const files = fs.readdirSync('dist/assets');
    if (files.length === 0) {
      return false;
    }
    
    // Vérifier qu'il y a au moins un fichier JS et un CSS
    const hasJS = files.some(f => f.endsWith('.js'));
    const hasCSS = files.some(f => f.endsWith('.css'));
    
    if (!hasJS || !hasCSS) {
      return false;
    }
    
    // Vérifier le contenu de dist/index.html
    const indexContent = fs.readFileSync('dist/index.html', 'utf-8');
    if (!indexContent.includes('assets/')) {
      return false;
    }
    
    // Vérifier holberton-dashboard.txt
    if (!fs.existsSync('holberton-dashboard.txt')) {
      return false;
    }
    
    const dashboardContent = fs.readFileSync('holberton-dashboard.txt', 'utf-8').trim();
    if (!dashboardContent.startsWith('http')) {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}

if (testStaticAssets()) {
  console.log('OK');
  process.exit(0);
} else {
  console.log('NOK');
  process.exit(1);
}
