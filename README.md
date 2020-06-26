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


## SQL Tables

    CREATE TABLE pull_requests (
        id serial PRIMARY KEY,
        url text,
        number integer,
        creator text,
        state text,
        title text,
        body text,
        created_at timestamp with time zone,
        updated_at timestamp with time zone,
        closed_at timestamp with time zone,
        merged_at timestamp with time zone,
        comment_count integer,
        review_comment_count integer,
        commits integer,
        addition integer,
        deletions integer,
        changed_files integer,
        repo text,
        assignees text,
        requested_reviewers text,
        merged_by text,
        milestone text,
        head_label text,
        head_ref text,
        base_label text,
        base_ref text
    );

    CREATE TABLE reviews (
        id serial PRIMARY KEY,
        pull_request_id INTEGER,
        reviewer TEXT,
        body TEXT,
        state TEXT,
        submitted_at TIMESTAMP WITH TIME ZONE
    );


    CREATE TABLE comments (
        id serial PRIMARY KEY,
        pull_request_id INTEGER,
        pull_request_review_id INTEGER,
        commentor TEXT,
        body TEXT,
        diff_hunk TEXT,
        path TEXT,
        position INTEGER,
        original_position INTEGER,
        created_at TIMESTAMP WITH TIME ZONE,
        updated_at TIMESTAMP WITH TIME ZONE
    );
