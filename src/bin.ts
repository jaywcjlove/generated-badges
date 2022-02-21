#!/usr/bin/env node

import path from 'path';
import minimist, { ParsedArgs } from 'minimist';
import { BadgenOptions } from './utils';
import { badgen } from 'badgen';
import FS from 'fs-extra';


export interface RunArgvs extends ParsedArgs, Partial<BadgenOptions> {
  source?: string;
  version?: string;
  output?: string;
}

function run() {
  const argvs: RunArgvs = minimist(process.argv.slice(2), {
    alias: {
      label: 'l',
      status: 's',
      color: 'c',
      output: 'o',
    },
    default: {
      label: ':label',
      labelColor: '555',
      status: ':status',
      color: 'blue',
      style: 'classic',
      scale: 1,
      output: 'BADGES.svg',
    },
  });
  if (argvs.h || argvs.help) {
    cliHelp()
    return;
  }
  const { version } = require('../package.json');
  if (argvs.v || argvs.version) {
    console.log(`\n generated-badges v${version}\n`);
    return;
  }
  const svgPath = path.resolve(argvs.output);
  const sourcePath = path.dirname(svgPath);
  FS.ensureDirSync(path.dirname(svgPath));

  if (!FS.existsSync(sourcePath)) {
    console.log(
      `\x1b[31mErr Source Path:\x1b[0m ${path.relative(process.cwd(), sourcePath)}\n`,
      `> please specify the file directory\n`,
      `> \x1b[35mnpm\x1b[0m generated-badges \x1b[33m--output\x1b[0m build/badges.svg`
    );
    return;
  }

  const svgString = badgen({
    label: argvs.label,
    labelColor: argvs.labelColor,
    status: argvs.status,
    color: argvs.color,
    style: argvs.style,
    scale: argvs.scale,
    // label: 'npm',      // <Text>
    // labelColor: 'ADF', // <Color RGB> or <Color Name> (default: '555')
    // status: 'v1.2.3',  // <Text>, required
    // color: 'blue',     // <Color RGB> or <Color Name> (default: 'blue')
    // style: 'flat',     // 'flat' or 'classic' (default: 'classic')
    // icon: 'data:image/svg+xml;base64,...', // Use icon (default: undefined)
    // iconWidth: 13,     // Set this if icon is not square (default: 13)
    // scale: 1           // Set badge scale (default: 1)
  });

  FS.writeFileSync(svgPath, svgString);
  console.log(`\nCoverage Badges: \x1b[32;1m${path.relative(process.cwd(), svgPath)}\x1b[0m\n`);
}

run();

export function cliHelp() {
  console.log('\n  Usage: generated-badges [options] [--help|h]');
  console.log('\n  Options:\n');
  console.log('    --version, -v  ', 'Show version number.');
  console.log('    --help, -h     ', 'Displays help information.');
  console.log('    --output, -o   ', 'Output svg image path.');
  console.log('    --label, -l    ', 'The left label of the badge, usually static.');
  console.log('    --labelColor   ', `<Color RGB> or <Color Name> (default: '555')`);
  console.log('    --style        ', 'Badges style: flat, classic.');
  console.log('    --status, -s   ', 'Override default status text.');
  console.log('    --scale        ', 'Set badge scale (default: 1).');
  console.log('    --color, -c    ', `<Color RGB> or <Color Name> (default: 'blue').'`);
  console.log('\n  Example:\n');
  console.log('    \x1b[35mgenerated-badges\x1b[0m \x1b[33m--output\x1b[0m coverage/badges.svg');
  console.log('    \x1b[35mgenerated-badges\x1b[0m \x1b[33m--style\x1b[0m classic');
  console.log('    \x1b[35mgenerated-badges\x1b[0m \x1b[33m--color\x1b[0m red');
  console.log('\n');
}
