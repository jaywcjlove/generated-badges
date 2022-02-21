import path from 'path';
import fs from 'fs';
import { badgen } from 'badgen';
import { BadgenOptions, StyleOption } from './utils';
import { setFailed, setOutput, getInput, info, startGroup, endGroup } from '@actions/core';

export function getInputs(): BadgenOptions {
  const label = getInput('label') || ':label';
  const labelColor = getInput('labelColor');
  const status = getInput('status') || ':status';
  const color = getInput('color') || 'blue';
  const style = (getInput('style') || 'classic') as StyleOption;
  const scale = parseInt(getInput('scale'), 10);
  return {
    label, labelColor, status, color, style, scale: Number.isNaN(scale) ? 1 : scale,
  }
}

try {
  ;(async () => {
    const options = getInputs();
    const output = getInput('output') || 'BADGES.svg';
    const svgPath = path.resolve(process.cwd(), output);
    startGroup(`Inputs: `);
    info(`${JSON.stringify(options, null, 2)}`);
    endGroup();
    const svgString = badgen({ ...options });
    startGroup(`Svg String: \x1b[34m(${svgPath})\x1b[0m`);
    info(`${svgString}`);
    endGroup();
    setOutput('svg', svgString)
    const data = new Uint8Array(Buffer.from(svgString));
    await fs.promises.writeFile(svgPath, data);
    info(`Generated: "${svgPath}"`)
  })();
} catch (error) {
  setFailed(error.message);
}