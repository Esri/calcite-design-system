module.exports = async ({ context, core }) => {
  const REGEX = new RegExp("^[^…]+$"); // Title must match this regex
  const MIN_LENGTH = 1; // Min length of the title
  const MAX_LENGTH = -1; // Max length of the title (-1 is no max)
  const ALLOWED_PREFIXES = []; // Title must start with one of these prefixes
  const DISALLOWED_PREFIXES = []; // Title cannot start with one of these prefixes
  const PREFIX_CASE_SENSITIVE = false; // Whether the prefix is case sensitive

  const validateTitlePrefix = (title, prefix) =>
    PREFIX_CASE_SENSITIVE ? title.startsWith(prefix) : title.toLowerCase().startsWith(prefix.toLowerCase());

  const { title } = context.payload.pull_request;
  if (!REGEX.test(title)) {
    core.setFailed(`Pull Request title "${title}" failed to match regex - ${REGEX}`);
    return;
  }

  if (title.length < MIN_LENGTH) {
    core.setFailed(`Pull Request title "${title}" is smaller than the minimum length - ${MIN_LENGTH}`);
    return;
  }

  if (MAX_LENGTH > 0 && title.length > MAX_LENGTH) {
    core.setFailed(`Pull Request title "${title}" is greater than the maximum length - ${MAX_LENGTH}`);
    return;
  }

  core.info(`Allowed Prefixes: ${ALLOWED_PREFIXES}`);
  if (ALLOWED_PREFIXES.length && !ALLOWED_PREFIXES.some((prefix) => validateTitlePrefix(title, prefix))) {
    core.setFailed(
      `Pull Request title "${title}" did not start with any of the required prefixes - ${ALLOWED_PREFIXES}`,
    );
    return;
  }

  core.info(`Disallowed Prefixes: ${DISALLOWED_PREFIXES}`);
  if (DISALLOWED_PREFIXES.length && DISALLOWED_PREFIXES.some((prefix) => validateTitlePrefix(title, prefix))) {
    core.setFailed(
      `Pull Request title "${title}" started with one of the disallowed prefixes - ${DISALLOWED_PREFIXES}`,
    );
    return;
  }
};
