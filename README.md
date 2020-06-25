# Pull Request Stats

## Setup

Required environment variables:

* `GITHUB_TOKEN`

## Usage

I create a simple shell script that calls the `index.js` file. Like this:

    node index.js "where/to/store/pr/data" "my-org" "repo-1"
    node index.js "where/to/store/pr/data" "my-org" "repo-2"
    node index.js "where/to/store/pr/data" "my-org" "repo-3"


## Output

In the `where/to/store/pr/data` path, you'll see the following:

    repo-1
    |- 0001.json
    |- 0002.json
    |- summary.json
    |- summary.csv
    repo-2
    |- 0001.json
    |- 0002.json
    |- summary.json
    |- summary.csv

