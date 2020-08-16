
import { resolve } from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import {
  listDirectories,
  listFiles
} from '../lib/filesystem-api/index.js';


const fixtures = resolve(process.cwd(), 'test/fixtures');

test('Always passes', () => {
  assert.ok(true);
});

test('listDirectories', async () => {
  assert.equal(
    await listDirectories(fixtures),
    ['fruit', 'veggies'],
  );
});

test('listFiles', async () => {
  assert.equal(
    await listFiles(fixtures),
    ['cake.txt', 'cookies.txt'],
  );
});

test.run();
