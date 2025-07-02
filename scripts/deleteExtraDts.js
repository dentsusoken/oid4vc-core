import { promises as fs } from 'fs';
import path from 'path';

async function deleteExtraDts(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      await deleteExtraDts(fullPath);
    } else if (file.name.endsWith('.d.ts') && file.name !== 'index.d.ts') {
      await fs.unlink(fullPath);
    }
  }
}

deleteExtraDts('./dist');
