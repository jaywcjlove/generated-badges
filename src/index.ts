import path from 'path';
import fs from 'fs';
import { badgen } from 'badgen';
import { BadgenOptions, StyleOption, addGradient, useColor } from './utils';
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

;(async () => {
  try {
    const options = getInputs();
    const gradientStr = getInput('gradient');
    const output = getInput('output') || 'BADGES.svg';
    const svgPath = path.resolve(process.cwd(), output);
    const gradient = gradientStr.split(',').filter(Boolean);
  
    if (gradient.length === 1) {
      options.color = gradient[0];
    }
  
    startGroup(`Inputs: `);
    info(`gradient: ${Array.isArray(gradient)}, ${gradient}`);
    info(`${JSON.stringify(options, null, 2)}`);
    endGroup();
  
    let svgString = badgen({ ...options });
    if (Array.isArray(gradient) && gradient.length > 0) {
      svgString = useColor(addGradient(svgString, gradient, 'x'), 'url(#x)');
    }
  
    startGroup(`Svg String: \x1b[34m(${svgPath})\x1b[0m`);
    info(`${svgString}`);
    endGroup();
  
    setOutput('svg', svgString);
  
    const data = new Uint8Array(Buffer.from(svgString));
    await fs.promises.writeFile(svgPath, data);
    info(`Generated: "${svgPath}"`);
  } catch (error) {
    setFailed(error.message);
  }
})();