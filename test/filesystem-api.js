import { resolve } from 'path';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import {
  listDirectories,
  listFiles
} from '../lib/filesystem-api/index.js';

const entry = resolve(process.cwd(), 'test/mock-files');

const filesystemApiTests = suite('Filesystem API Tests');

filesystemApiTests('Always passes', () => {
  assert.ok(true);
});

filesystemApiTests('listDirectories', async () => {
  assert.equal(
    await listDirectories(entry),
    ['fruit', 'veggies'],
  );
});

filesystemApiTests('listFiles', async () => {
  assert.equal(
    await listFiles(entry),
    ['cake.txt', 'cookies.txt'],
  );
});

export default filesystemApiTests;
