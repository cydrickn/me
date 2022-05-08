# Contributing

As a contributor, here are the guidelines we would like you to follow:

- [Submitting a Pull Request](#pr)
- [Code Rules](#rules)
- [Commit Message Guidelines](#commit)

## <a name="pr"></a> Submitting a Pull Request

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [Github](https://github.com/cydrickn/me/pulls) for an open or closed PR
   that relates to your submission. You don't want to duplicate effort.
1. Pull the https://github.com/cydrickn/me repo.
1. Create your patch, **including appropriate test cases, if possible**.
1. Follow our [Coding Rules](#rules).
1. Commit your changes using a descriptive commit message that follows our
   [commit message conventions](#commit). Adherence to these conventions
   is necessary because release notes are automatically generated from these messages.

     ```shell
     git commit -a
     ```
   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

1. Push your branch to GitHub:

    ```shell
    git push origin bug-1-fix-game
    ```

1. In GitHub, send a pull request to `main`.
* If we suggest changes then:
    * Make the required updates.
    * Rebase your branch and force push to your branch (this will update your Pull Request):

      ```shell
      git rebase main -i
      git push -f origin my-fix-branch
      ```

## <a name="rules"></a> Code Rules (TODO)

## <a name="commit"></a> Commit Message Guidelines

We want to make the commit message to have standard and this will also help some automation for
changelog to properly parse the correct data.

Commit messages should follow conventional commit.

This conventional should be followed in each commit and Including merge request / merge commit

### Commit Message Format

```
<type>(scope): <description>
<body>
<footer>
```

The **type** is a mandatory while the **scope** is optional

The **description** is also mandatory since here you will put the summary of the commit

The **body** and **footer** are optional

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub
as well as in various git tools.

Examples:

```
docs(contributing): create contributing rules
```

```
fix(page): fix signup page

Fix the the errors in signup page
```

```
fix(api): Fix the errors occurs in signup page

Fix the the api for signup page

BREAKING CHANGE: removing the id field
```

### Revert

If the commit reverts a previous commit, it should begin with `revert:` , followed by the header of the reverted commit.
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Types

- **build**: Changes that affect the build system like gulp, npm, etc
- **ci**: Changes made to the CI configuration like Travis, Circle, Actions
- **docs**: Documentation only changes
- **chore**: Changes that are not part of assets, components, layouts, middleware, pages, images and fonts. Most likely
  this changes will be on configurations and dependencies
- **feat**: A new feature
- **fix**: Fixed a bug
- **perf**: Code changes that improve performance
- **refactor**: A code change that's not particularly a bug or new feature
- **revert**: Revert a previous commit
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Add or fix tests
- **merge**: Use for merge commit, only use if you are merging multiple commit

### Scope

- **page**: Changes in any pages
- **assets**: Changes in scss, fonts and images
- **components**: Changes in any components
- **layouts**: Changes in any layouts
- **middleware**: Changes in any middleware
- **changelog**: used for updating the release notes in CHANGELOG.md
- **contribute**: used for updating CONTRIBUTING.md
- **readme**: used for updating README.md

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this document.

### Merge Commit Message

The merge commit follow same format with the commit message.
But for the subject we will add the merge request number.

And for type, we should put `merge` if the request has multiple commits, but if only one or most of the commit only persist
to one type, we should use the correct type.

The footer should contain a [closing reference to an issue](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#default-closing-pattern) if any.

Examples:

```
fix(page): fix signup page

Fix the the errors in signup page

Closes #1
```
