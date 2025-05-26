import { generateMigration } from './migration/migration-generator.js';
import { runMigrations } from './migration/migration-runner.js';
import path from 'path';
import { pathToFileURL } from 'url';

const command = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  switch (command) {
    case 'generate':
      {
        const [modelPath, name] = args;
        if (!modelPath || !name) {
          console.error('Usage: generate <path-to-model> <migration-name>');
          process.exit(1);
        }

        const resolvedPath = path.resolve(modelPath);
        const modelUrl = pathToFileURL(resolvedPath).href;
        const { UserModel } = await import(modelUrl);
        await generateMigration([UserModel], name);
      }
      break;

    case 'migrate':
      await runMigrations();
      break;

    default:
      console.log(`Unknown command: ${command}`);
      console.log('Usage:');
      console.log('  generate <model-path> <migration-name>');
      console.log('  migrate');
  }
}

main().catch(console.error);
