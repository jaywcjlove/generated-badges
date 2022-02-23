Generated Badges
===

[![Build & Deploy](https://github.com/jaywcjlove/generated-badges/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/generated-badges/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/generated-badges.svg)](https://www.npmjs.com/package/generated-badges)

Create a badge using GitHub Actions and GitHub Workflow CPU time (no 3rd parties servers)

## Install

```shell
$ npm i generated-badges -g
```

## Command Help

```bash
Usage: generated-badges [options] [--help|h]

Options:

  --version, -v   Show version number.
  --help, -h      Displays help information.
  --output, -o    Output svg image path.
  --label, -l     The left label of the badge, usually static.
  --labelColor    <Color RGB> or <Color Name> (default: '555')
  --style         Badges style: flat, classic.
  --status, -s    Override default status text.
  --scale         Set badge scale (default: 1).
  --color, -c     <Color RGB> or <Color Name> (default: 'blue').'
  --gradient, -g  Adding a gradient to a badge.'

Example:

  generated-badges --output coverage/badges.svg
  generated-badges --style classic
  generated-badges --color red
  generated-badges --gradient c05cff --gradient fa5b37
```

## Github Actions

```yml
- run: mkdir -p build

- name: Generate Badges
  uses: jaywcjlove/generated-badges@main
  with:
    label: color
    status: cyan
    output: build/cyan.svg

- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: xxxxxxx
    publish_dir: ./build
```

Available color names:

![blue badges](https://jaywcjlove.github.io/generated-badges/blue.svg)
![cyan badges](https://jaywcjlove.github.io/generated-badges/cyan.svg)
![green badges](https://jaywcjlove.github.io/generated-badges/green.svg)
![yellow badges](https://jaywcjlove.github.io/generated-badges/yellow.svg)
![red badges](https://jaywcjlove.github.io/generated-badges/red.svg)
![pink badges](https://jaywcjlove.github.io/generated-badges/pink.svg)
![purple badges](https://jaywcjlove.github.io/generated-badges/purple.svg)
![grey badges](https://jaywcjlove.github.io/generated-badges/grey.svg)
![black badges](https://jaywcjlove.github.io/generated-badges/black.svg)
![gradient badges](https://jaywcjlove.github.io/generated-badges/gradient.svg)

### Input Parameters

- `label` - The left label of the badge, usually static. (default `:label`)
- `status` - The right status as the badge, usually based on results. (default `:status`)
- `style` - Badges style: `flat`, `classic`. (default `classic`)
- `color` - An array (comma separated) with hex or named colors of the badge value background. (default `blue`)
- `labelColor` - Hex or named color for the label. (default `555`)
- `output` - Output image path. (default `BADGES.svg`)
- `scale` - Set badge scale. (default `1`)
- `gradient` - Adding a gradient to a badge. (example `c05cff,fa5b37`)

### Output Parameters

- `svg` svg image string: `<svg xmlns....`.

## Related

- [Github Release Changelog](https://github.com/jaywcjlove/changelog-generator) Generator A GitHub Action that compares the commit differences between two branches
- [Create Tags From](https://github.com/jaywcjlove/create-tag-action) Auto create tags from commit or package.json.
- [Github Action Contributors](https://github.com/jaywcjlove/github-action-contributors) Github action generates dynamic image URL for contributor list to display it!
- [Create Coverage Badges](https://github.com/jaywcjlove/coverage-badges-cli) Create coverage badges from coverage reports. (no 3rd parties servers)
- [Generated Badges](https://github.com/jaywcjlove/generated-badges) Create a badge using GitHub Actions and GitHub Workflow CPU time (no 3rd parties servers)

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/generated-badges/graphs/contributors">
  <img src="https://jaywcjlove.github.io/generated-badges/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.

