import nodeResolve from '@rollup/plugin-node-resolve';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const plugins = [
  nodeResolve({ preferBuiltins: true }),
  typescript({ useTsconfigDeclarationDir: true }),
];

const external = [
  'fs',
  'path',
  ...Object.keys(pkg.dependencies)
];

export default [
  {
    input: 'src/utils/index.ts',
    output: {
      dir: 'dist',
      format: 'es',
    },
    plugins,
    external,
  },
];
