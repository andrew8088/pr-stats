# Pull Request Stats

## Setup

Required environment variables:

* `GITHUB_TOKEN`

## Usage

I create a simple shell script that calls the `index.js` file. Like this:

    node index.js "where/to/store/pr/data" "my-org" "repo-1"
    node index.js "where/to/store/pr/data" "my-org" "repo-2"
    node index.js "where/to/store/pr/data" "my-org" "repo-3"

