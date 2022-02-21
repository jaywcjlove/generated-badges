#!/usr/bin/env node
import { ParsedArgs } from 'minimist';
import { BadgenOptions } from './utils';
export interface RunArgvs extends ParsedArgs, Partial<BadgenOptions> {
    source?: string;
    version?: string;
    output?: string;
}
export declare function cliHelp(): void;
