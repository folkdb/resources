import { resolve } from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import {
  listDirectories,
  listFiles
} from '../lib/filesystem-api/index.js';


const entry = resolve(process.cwd(), 'test/fs-entry');

test('Always passes', () => {
  assert.ok(true);
});

test('listDirectories', async () => {
  assert.equal(
    await listDirectories(entry),
    ['fruit', 'veggies'],
  );
});

test('listFiles', async () => {
  assert.equal(
    await listFiles(entry),
    ['cake.txt', 'cookies.txt'],
  );
});

export default test;
