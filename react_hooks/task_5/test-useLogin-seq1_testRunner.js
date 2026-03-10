import { execSync } from 'child_process';
import { existsSync } from 'fs';

try {
  const testPaths = ['src/Login/Login.spec.js'];
  if (existsSync('test-useLogin-seq1.spec.js')) {
    testPaths.push('test-useLogin-seq1.spec.js');
  }
  execSync(`npx jest ${testPaths.join(' ')} --passWithNoTests`, {
    cwd: process.cwd(),
    stdio: 'pipe',
  });
  console.log('OK');
  process.exit(0);
} catch {
  console.log('NOK');
  process.exit(1);
}
