#!/bin/bash
# from https://riptutorial.com/git/example/16164/pre-push

protected_branch='master'
current_branch=$(git rev-parse --abbrev-ref HEAD)

if [ $protected_branch = $current_branch ] && [ exec < /dev/tty ]
then
    read -p "You're about to push master, is that what you intended? [y|n] " -n 1 -r < /dev/tty
    echo
    if echo $REPLY | grep -E '^[Yy]$' > /dev/null
    then
        exit 0
    fi
    exit 1
else
    conventional_commit_regex='^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([\w-\.\,\s]+\))?(!)?(: ([\w ])+([\s\S]*))'
    commit_messages=$(git log --format=%B $current_branch --not $protected_branch | tr '\n' ',')

    while [ "$commit_messages" != "$current_message" ]; do
        # extract the substring from start of string up to delimiter
        current_message=${commit_messages%%;;*}
        # delete the current substring and the delimiter
        commit_messages=${commit_messages#$current_message,,}
        # match substring for conventional commit regex
        [[ "$current_message" =~ $conventional_commit_regex ]] && exit 0
    done
    printf "Error: please make a conventional commit\nhttps://github.com/Esri/calcite-components/blob/master/CONTRIBUTING.md#commit-message-format\n"
    exit 1
fi