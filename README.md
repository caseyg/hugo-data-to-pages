1. generate content from slack archive
2. build hugo
3. build pagesearch index
4. setup auth with stytch
5. run netlify

## Todo

- Parse Slack formatting
    - @channel/@here
    - <links|links>
    - <@usernames>
    - #channels
    - [x] emoji
    - weird characters
    - skip avatar for many posts in a row
- Show threads in context
- [x] Fix ts dates
- [x] Sort messages in order of appearance
- [x] Setup real slack auth
- Setup analytics w/ user attribution
- Shareable single pages
- Subdomain on reops community
- Redirect slack permalink format to archive
- Slack unfurls
- Cache avatars?
- Top lists/metrics
- Filter by reactions
- Sort search results by date or relevance
- logged out page
- about page
- donate link
- hide login button

<!-- # Hugo Data to Pages

Allows for generating pages (or any archetypes) from data (json/yaml) on [Hugo](https://github.com/gohugoio/hugo).
Related to issues [#140](https://github.com/gohugoio/hugo/issues/140) and [5074](https://github.com/gohugoio/hugo/issues/5074).

## Getting Started

This script is a simple wrapper that:
- Generates the pages under your content folder
- Runs Hugo
- And finally, removes the generated pages

The entire script is in `hugo.js`, the `example/` is just an example hugo site.

### Prerequisites

- hugo
- node & npm

### Installing & Running

- Run `npm install` to install dependencies
- Run `node hugo.js` to build
- (optional) Run `chmod +x hugo.js` to allow for direct execution, i.e. `./hugo.js`
- Go to `localhost:1313` to see links to the generated pages

#### Commands

There are 3 available commands:

- `./hugo.js` (basically hugo build to public directory)
- `./hugo.js generate` (only generate folders/files from data, same as above but without executing hugo build)
- `./hugo.js server` (basically hugo server, with cleanup on exit)
- `./hugo.js clean` (trigger cleanup in case the script didn't remove the generated folders)

Flags:
- `-c FILE.json` or `--configFile FILE.json` flag to override default config (check hugoConfig-example.json)
- `-f` or `--force` flag to skip folder removal prompts (be careful with this one!)

## Author

[kidsil](https://github.com/kidsil)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details -->