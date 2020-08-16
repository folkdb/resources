
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

test('listDirectories', () => {
  assert.equal(
    listDirectories(fixtures),
    ['fruit', 'veggies'],
  );
});

test('listFiles', () => {
  assert.equal(
    listFiles(fixtures),
    ['cake.txt', 'cookies.txt'],
  );
});

test.run();
