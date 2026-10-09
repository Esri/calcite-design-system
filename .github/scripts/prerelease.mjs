// cspell:ignore cacheinfo
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { appendFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { pathToFileURL } from "node:url";

/**
 * @typedef {"next" | "rc"} Channel
 * @typedef {{ name: string, version: string, file: string, integrity: string }} PackedPackage
 * @typedef {{ name: string, object: string }} PackageTag
 * @typedef {{
 *   schema: 1,
 *   branch: "dev" | "rc",
 *   channel: Channel,
 *   source: string,
 *   commit: string,
 *   ledger: string | null,
 *   remoteTags: string,
 *   tags: PackageTag[],
 *   packages: PackedPackage[]
 * }} Candidate
 * @typedef {{ status: "pending" | "complete", candidate: Candidate, completedAt?: string }} ReleaseRecord
 * @typedef {{ sha: string | null, record: ReleaseRecord | null }} Ledger
 * @typedef {{ name: string, version: string, private?: boolean, location: string }} WorkspacePackage
 */

/**
 * @template T
 * @typedef {T | Promise<T>} Awaitable
 */

/**
 * @typedef {{
 *   ledger: () => Awaitable<Ledger>,
 *   head: (branch: string) => Awaitable<string>,
 *   tags: () => Awaitable<string>,
 *   retry: () => Promise<void>,
 *   restore: (sha: string, candidate: Candidate) => Promise<void>,
 *   validatePersisted: (candidate: Candidate) => Promise<void>,
 *   verify: (candidate: Candidate) => Awaitable<void>,
 *   persist: (candidate: Candidate, parent: string | null) => Promise<string>,
 *   exists: (pkg: PackedPackage) => Promise<boolean>,
 *   publish: (pkg: PackedPackage, channel: Channel) => Promise<void>,
 *   distTag: (pkg: PackedPackage, channel: Channel) => Promise<void>,
 *   complete: (candidate: Candidate, parent: string) => Promise<void>
 * }} ReleaseAdapter
 */

const directory = ".prerelease";
const ledgerRef = "refs/heads/prerelease-state";
const registry = "https://registry.npmjs.org";

/**
 * @param {string} program
 * @param {string[]} args
 * @param {Omit<import("node:child_process").ExecFileSyncOptionsWithStringEncoding, "encoding">} [options]
 */
function command(program, args, options = {}) {
  return execFileSync(program, args, { encoding: "utf8", stdio: ["pipe", "pipe", "inherit"], ...options }).trim();
}

/** @param {string[]} args */
function git(...args) {
  return command("git", args);
}

/**
 * @param {string} program
 * @param {string[]} args
 */
function run(program, ...args) {
  execFileSync(program, args, { stdio: "inherit" });
}

/** @param {Uint8Array} bytes */
export function integrity(bytes) {
  return `sha512-${createHash("sha512").update(bytes).digest("base64")}`;
}

/**
 * @param {string} name
 * @param {string} value
 */
function output(name, value) {
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
  }
}

function branch() {
  const value = process.env.BRANCH;
  if (value !== "dev" && value !== "rc") {
    throw new Error("Use the dev or rc branch for prerelease deployment.");
  }
  return value;
}

function remoteTags() {
  return git("ls-remote", "--tags", "origin").split("\n").filter(Boolean).sort().join("\n");
}

/**
 * @param {typeof git} [executeGit]
 * @returns {Ledger}
 */
export function readLedger(executeGit = git) {
  const ref = executeGit("ls-remote", "origin", ledgerRef).split(/\s/)[0];
  if (!ref) {
    return { sha: null, record: null };
  }
  executeGit("fetch", "--no-tags", "origin", ledgerRef);
  const sha = executeGit("rev-parse", "FETCH_HEAD");
  const record = JSON.parse(executeGit("show", `${sha}:record.json`));
  if (!["pending", "complete"].includes(record.status)) {
    throw new Error("The prerelease ledger has an invalid status. Stop and inspect it.");
  }
  validateCandidate(record.candidate);
  return { sha, record };
}

function configureGit() {
  git("config", "user.name", "github-actions[bot]");
  git("config", "user.email", "github-actions[bot]@users.noreply.github.com");
}

/**
 * @param {ReleaseRecord} record
 * @param {string | null} parent
 * @param {PackedPackage[]} packages
 * @param {typeof command} [execute]
 * @param {(path: string) => Buffer} [readArchive]
 */
export function writeLedger(record, parent, packages, execute = command, readArchive = readFileSync) {
  const index = resolve(directory, "ledger-index");
  const env = { ...process.env, GIT_INDEX_FILE: index };
  execute("git", ["read-tree", "--empty"], { env });
  /** @type {Array<[string, Buffer]>} */
  const files = [["record.json", Buffer.from(`${JSON.stringify(record, null, 2)}\n`)]];
  for (const pkg of packages) {
    files.push([pkg.file, readArchive(resolve(directory, pkg.file))]);
  }
  for (const [path, bytes] of files) {
    const blob = execute("git", ["hash-object", "-w", "--stdin"], { input: bytes });
    execute("git", ["update-index", "--add", "--cacheinfo", `100644,${blob},${path}`], { env });
  }
  const tree = execute("git", ["write-tree"], { env });
  return execute("git", [
    "commit-tree",
    tree,
    ...(parent ? ["-p", parent] : []),
    "-m",
    `chore: prerelease ${record.status} ${record.candidate.channel} ${record.candidate.commit}`,
  ]);
}

/** @param {Candidate} candidate */
export function validateCandidate(candidate) {
  if (
    candidate.schema !== 1 ||
    !["dev", "rc"].includes(candidate.branch) ||
    candidate.channel !== (candidate.branch === "dev" ? "next" : "rc") ||
    !/^[a-f0-9]{40}$/.test(candidate.source) ||
    !/^[a-f0-9]{40}$/.test(candidate.commit) ||
    !(candidate.ledger === null || /^[a-f0-9]{40}$/.test(candidate.ledger)) ||
    typeof candidate.remoteTags !== "string" ||
    !Array.isArray(candidate.tags) ||
    !candidate.tags.length ||
    !Array.isArray(candidate.packages) ||
    !candidate.packages.length
  ) {
    throw new Error("Invalid prerelease candidate.");
  }
  for (const tag of candidate.tags) {
    if (typeof tag.name !== "string" || !tag.name.startsWith("@esri/") || !/^[a-f0-9]{40}$/.test(tag.object)) {
      throw new Error("Invalid prerelease tag.");
    }
  }
  if (
    new Set(candidate.tags.map((tag) => tag.name)).size !== candidate.tags.length ||
    new Set(candidate.packages.map((pkg) => pkg.name)).size !== candidate.packages.length ||
    new Set(candidate.packages.map((pkg) => pkg.file)).size !== candidate.packages.length
  ) {
    throw new Error("Duplicate prerelease tags or packages.");
  }
  for (const pkg of candidate.packages) {
    if (
      typeof pkg.name !== "string" ||
      !pkg.name.startsWith("@esri/") ||
      typeof pkg.version !== "string" ||
      !pkg.version.includes(`-${candidate.channel}.`) ||
      !candidate.tags.some((tag) => tag.name === `${pkg.name}@${pkg.version}`) ||
      typeof pkg.file !== "string" ||
      basename(pkg.file) !== pkg.file ||
      !pkg.file.endsWith(".tgz") ||
      typeof pkg.integrity !== "string" ||
      !/^sha512-[A-Za-z0-9+/]{86}==$/.test(pkg.integrity)
    ) {
      throw new Error("Invalid prerelease package.");
    }
  }
}

/**
 * @param {Candidate} candidate
 * @param {(path: string) => Buffer} [readArchive]
 * @param {typeof command} [execute]
 */
export function verifyArchives(candidate, readArchive = readFileSync, execute = command) {
  validateCandidate(candidate);
  for (const pkg of candidate.packages) {
    if (basename(pkg.file) !== pkg.file || !pkg.file.endsWith(".tgz")) {
      throw new Error(`Invalid archive path: ${pkg.file}`);
    }
    const bytes = readArchive(resolve(directory, pkg.file));
    if (integrity(bytes) !== pkg.integrity) {
      throw new Error(`Archive integrity mismatch: ${pkg.name}@${pkg.version}`);
    }
    const packed = JSON.parse(execute("tar", ["-xOf", resolve(directory, pkg.file), "package/package.json"]));
    if (packed.name !== pkg.name || packed.version !== pkg.version || packed.private) {
      throw new Error(`Archive identity mismatch: ${pkg.name}@${pkg.version}`);
    }
  }
}

async function prepare() {
  const target = branch();
  mkdirSync(directory, { recursive: true });
  const ledger = readLedger();
  const mode = preparationMode(ledger, target, process.env.OPERATION, process.env.NEXT_RELEASE_ENABLED);
  if (mode !== "candidate") {
    console.log(`Preparation mode: ${mode}.`);
    output("mode", mode);
    return;
  }
  // Always prepare the current remote branch, including on a rerun of an old workflow.
  git("fetch", "--tags", "origin", target);
  git("checkout", "-B", target, `origin/${target}`);
  run("pnpm", "install", "--frozen-lockfile");
  if (target === "dev") {
    const previous = git("describe", "--tags", "--abbrev=0", "HEAD");
    if (!isDeployable(git("log", `${previous}..HEAD`, "--format=%s"), git("log", `${previous}..HEAD`, "--format=%b"))) {
      console.log("No deployable changes on dev.");
      output("mode", "skip");
      return;
    }
  }
  configureGit();
  // A previous release can become pending while dependencies are installed.
  // Check again before allocating local versions.
  const beforeVersion = readLedger();
  if (beforeVersion.record?.status === "pending") {
    output("mode", "resume");
    return;
  }
  const source = git("rev-parse", "HEAD");
  const tags = remoteTags();
  const localTags = new Set(git("tag", "--list").split("\n"));
  const channel = target === "dev" ? "next" : "rc";
  run("pnpm", `version:${channel}`);
  const commit = git("rev-parse", "HEAD");
  const newTags = git("tag", "--list")
    .split("\n")
    .filter((tag) => tag && !localTags.has(tag));
  if (git("rev-parse", `${commit}^`) !== source || !newTags.length) {
    throw new Error("Versioning must create one candidate commit and explicit package tags.");
  }
  /** @type {WorkspacePackage[]} */
  const packages = JSON.parse(command("pnpm", ["exec", "lerna", "ls", "--json", "--all"]));
  run("pnpm", "build");
  run("pnpm", "test");
  const packedPackages = [];
  for (const pkg of packages.filter((pkg) => !pkg.private && newTags.includes(`${pkg.name}@${pkg.version}`))) {
    run("pnpm", "--dir", pkg.location, "pack", "--pack-destination", resolve(directory));
    const file = `${pkg.name.replace(/^@/, "").replaceAll("/", "-")}-${pkg.version}.tgz`;
    const bytes = readFileSync(resolve(directory, file));
    // GitHub rejects individual Git blobs above 100 MiB. Fail before the release job.
    if (bytes.length >= 100 * 1024 * 1024) {
      throw new Error(`Archive exceeds the Git storage limit: ${file}`);
    }
    packedPackages.push({ name: pkg.name, version: pkg.version, file, integrity: integrity(bytes) });
  }
  if (!packedPackages.length) {
    throw new Error("The candidate contains no public packages.");
  }
  /** @type {Candidate} */
  const candidate = {
    schema: 1,
    branch: target,
    channel,
    source,
    commit,
    ledger: beforeVersion.sha,
    remoteTags: tags,
    tags: newTags.map((name) => ({ name, object: git("rev-parse", `refs/tags/${name}`) })),
    packages: packedPackages,
  };
  verifyArchives(candidate);
  git(
    "bundle",
    "create",
    resolve(directory, "candidate.bundle"),
    "HEAD",
    ...newTags.map((name) => `refs/tags/${name}`),
    `^${source}`,
  );
  writeFileSync(resolve(directory, "candidate.json"), `${JSON.stringify(candidate, null, 2)}\n`);
  output("mode", "candidate");
  output("artifact", process.env.CANDIDATE_ARTIFACT || "prerelease-candidate");
}

/**
 * @param {string} subjects
 * @param {string} bodies
 */
export function isDeployable(subjects, bodies) {
  return (
    /^(feat|fix)(\(.*\))?:.+$/im.test(subjects) ||
    /^(.+)(\(.*\))?!:.+$/im.test(subjects) ||
    /^BREAKING CHANGE:/im.test(bodies)
  );
}

/**
 * @param {Ledger} ledger
 * @param {"dev" | "rc"} target
 * @param {string | undefined} operation
 * @param {string | undefined} nextEnabled
 */
export function preparationMode(ledger, target, operation, nextEnabled) {
  if (ledger.record?.status === "pending" || operation === "resume") {
    return "resume";
  }
  return target === "dev" && nextEnabled !== "true" ? "skip" : "candidate";
}

/**
 * @param {Candidate} candidate
 * @param {string} pending
 */
export function atomicPushArguments(candidate, pending) {
  return [
    "push",
    "--atomic",
    "origin",
    `${candidate.commit}:refs/heads/${candidate.branch}`,
    `${pending}:${ledgerRef}`,
    ...candidate.tags.map((tag) => `refs/tags/${tag.name}:refs/tags/${tag.name}`),
  ];
}

/**
 * Run only inside the shared next/rc release lock. All side effects are injected
 * so tests cannot write to Git, npm, or GitHub.
 * @param {Candidate | null} candidate
 * @param {ReleaseAdapter} adapter
 * @param {{ retryIfIdle?: boolean, requestedBranch?: "dev" | "rc" }} [options]
 */
export async function release(candidate, adapter, { retryIfIdle = false, requestedBranch = candidate?.branch } = {}) {
  const ledger = await adapter.ledger();
  const recovering = ledger.record?.status === "pending";
  if (recovering) {
    if (!ledger.record || !ledger.sha) {
      throw new Error("A pending release must have a durable ledger commit.");
    }
    candidate = ledger.record.candidate;
    console.log(`Resuming ${candidate.channel} candidate ${candidate.commit} from ledger ${ledger.sha}.`);
    await adapter.restore(ledger.sha, candidate);
    await adapter.validatePersisted(candidate);
  } else if (!candidate) {
    if (retryIfIdle) {
      const completed = ledger.record?.candidate;
      if (
        completed &&
        requestedBranch === completed.branch &&
        (await adapter.head(requestedBranch)) === completed.commit
      ) {
        console.log("The pending prerelease has already completed, and the requested branch is current.");
        return "idle";
      }
      await adapter.retry();
      console.log("The pending prerelease has already completed. Latest preparation was requested.");
      return "retry";
    }
    console.log("No incomplete prerelease exists.");
    return "idle";
  } else if (
    candidate.ledger !== ledger.sha ||
    candidate.source !== (await adapter.head(candidate.branch)) ||
    candidate.remoteTags !== (await adapter.tags())
  ) {
    await adapter.retry();
    console.log("Rejected a stale prerelease candidate. No npm writes were made. Latest preparation was requested.");
    return "stale";
  }
  await adapter.verify(candidate);
  let pending = ledger.sha;
  if (!recovering) {
    // A branch or ledger race must fail the atomic push before any npm write.
    try {
      pending = await adapter.persist(candidate, ledger.sha);
    } catch (error) {
      const current = await adapter.ledger();
      const changed =
        current.sha !== ledger.sha ||
        candidate.source !== (await adapter.head(candidate.branch)) ||
        candidate.remoteTags !== (await adapter.tags());
      if (changed) {
        try {
          await adapter.retry();
        } catch (retryError) {
          throw new AggregateError(
            [error, retryError],
            "Atomic persistence or its response failed, and automatic preparation failed. No npm writes were made by this job. Retry the workflow manually.",
          );
        }
      }
      throw new Error(
        `Atomic candidate persistence failed. No npm writes were made by this job. ${
          changed ? "Preparation was requested." : "Check Git permissions and storage, then retry manually."
        }`,
        { cause: error },
      );
    }
  }
  if (!pending) {
    throw new Error("No durable pending ledger commit exists. Stop before npm writes.");
  }
  console.log(`Publishing ${candidate.channel} candidate ${candidate.commit}; pending ledger ${pending}.`);
  // Inspect all versions before writing any package. Only a definite 404 is missing.
  const missing = [];
  for (const pkg of candidate.packages) {
    if (!(await adapter.exists(pkg))) {
      missing.push(pkg);
    }
  }
  for (const pkg of missing) {
    await adapter.publish(pkg, candidate.channel);
    if (!(await adapter.exists(pkg))) {
      throw new Error(`Published package is not visible: ${pkg.name}@${pkg.version}. Resume this release.`);
    }
  }
  for (const pkg of candidate.packages) {
    await adapter.distTag(pkg, candidate.channel);
  }
  await adapter.complete(candidate, pending);
  // Recovery can consume a different channel's candidate. Prepare the requested
  // branch. Also cover merges received while this release held the lock.
  if (
    (requestedBranch && requestedBranch !== candidate.branch) ||
    (await adapter.head(candidate.branch)) !== candidate.commit
  ) {
    await adapter.retry();
  }
  return recovering ? "resumed" : "released";
}

/** @param {string} url */
async function fetchRegistry(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(120_000) });
  if (!response.ok && response.status !== 404) {
    throw new Error(`Registry request failed (${response.status}): ${url}`);
  }
  return response;
}

/**
 * @param {PackedPackage} pkg
 * @param {(url: string) => Promise<Response>} [request]
 */
export async function existingPackage(pkg, request = fetchRegistry) {
  const response = await request(`${registry}/${encodeURIComponent(pkg.name)}/${encodeURIComponent(pkg.version)}`);
  if (response.status === 404) {
    return false;
  }
  if (!response.ok) {
    throw new Error(`Registry lookup failed (${response.status}): ${pkg.name}@${pkg.version}`);
  }
  const metadata = await response.json();
  if (metadata.name !== pkg.name || metadata.version !== pkg.version || metadata.dist?.integrity !== pkg.integrity) {
    throw new Error(
      `Registry integrity or identity conflict: ${pkg.name}@${pkg.version}. Do not allocate a new version.`,
    );
  }
  // Do not trust metadata alone. Verify the bytes npm serves against the archive
  // committed before publication. This also handles a lost publish response.
  const url = new URL(metadata.dist.tarball);
  if (url.protocol !== "https:" || url.hostname !== "registry.npmjs.org") {
    throw new Error(`Unexpected registry tarball URL: ${url}`);
  }
  const tarball = await request(url.href);
  if (!tarball.ok || integrity(Buffer.from(await tarball.arrayBuffer())) !== pkg.integrity) {
    throw new Error(`Registry tarball mismatch: ${pkg.name}@${pkg.version}`);
  }
  return true;
}

async function publish() {
  branch();
  configureGit();
  mkdirSync(directory, { recursive: true });
  const candidatePath = resolve(directory, "candidate.json");
  /** @type {Candidate | null} */
  const candidate = readdirSync(directory).includes("candidate.json")
    ? JSON.parse(readFileSync(candidatePath, "utf8"))
    : null;
  /** @type {ReleaseAdapter} */
  const adapter = {
    ledger: () => readLedger(),
    head: async (target) => git("ls-remote", "origin", `refs/heads/${target}`).split(/\s/)[0],
    tags: remoteTags,
    retry: async () => {
      run("gh", "workflow", "run", "deploy-prerelease.yaml", "--ref", branch(), "-f", "operation=release");
      console.log(`Requested preparation of the latest ${branch()} branch.`);
    },
    restore: async (sha, record) => {
      for (const pkg of record.packages) {
        // The ledger contains only trusted paths made by preparation.
        if (basename(pkg.file) !== pkg.file) {
          throw new Error("Invalid ledger archive path.");
        }
        const bytes = execFileSync("git", ["show", `${sha}:${pkg.file}`], { maxBuffer: 100 * 1024 * 1024 });
        writeFileSync(resolve(directory, pkg.file), bytes);
      }
    },
    validatePersisted: async (record) => {
      const tags = new Map(
        remoteTags()
          .split("\n")
          .map((line) => {
            const [object, ref] = line.split(/\s+/);
            return [ref, object];
          }),
      );
      for (const tag of record.tags) {
        if (tags.get(`refs/tags/${tag.name}`) !== tag.object) {
          throw new Error(
            `Persisted release tag is missing or changed: ${tag.name}. Restore the original ref before resuming.`,
          );
        }
      }
      git("fetch", "--no-tags", "origin", record.branch);
      try {
        git("merge-base", "--is-ancestor", record.commit, "FETCH_HEAD");
      } catch (error) {
        throw new Error(
          `Persisted candidate ${record.commit} is not an ancestor of ${record.branch}. Restore the original branch history before resuming.`,
          { cause: error },
        );
      }
    },
    verify: (record) => verifyArchives(record),
    persist: async (record, parent) => {
      const advertised = git("bundle", "list-heads", resolve(directory, "candidate.bundle"), "HEAD").split(/\s+/);
      if (advertised[0] !== record.commit || advertised[1] !== "HEAD") {
        throw new Error("The prepared bundle does not advertise the candidate commit.");
      }
      git(
        "fetch",
        resolve(directory, "candidate.bundle"),
        "HEAD",
        ...record.tags.map((tag) => `refs/tags/${tag.name}:refs/tags/${tag.name}`),
      );
      if (git("rev-parse", `${record.commit}^`) !== record.source) {
        throw new Error("Candidate commit does not match the prepared bundle.");
      }
      for (const tag of record.tags) {
        if (
          git("rev-parse", `refs/tags/${tag.name}`) !== tag.object ||
          git("cat-file", "-t", tag.object) !== "tag" ||
          git("rev-parse", `refs/tags/${tag.name}^{commit}`) !== record.commit
        ) {
          throw new Error(`Candidate tag does not match the prepared bundle: ${tag.name}`);
        }
      }
      const pending = writeLedger({ status: "pending", candidate: record }, parent, record.packages);
      git(...atomicPushArguments(record, pending));
      return pending;
    },
    exists: existingPackage,
    publish: async (pkg, channel) => {
      run(
        "npm",
        "publish",
        resolve(directory, pkg.file),
        "--registry",
        registry,
        "--tag",
        channel,
        "--access",
        "public",
        "--provenance",
        "--ignore-scripts",
      );
    },
    distTag: async (pkg, channel) => {
      run("npm", "dist-tag", "add", `${pkg.name}@${pkg.version}`, channel, "--registry", registry);
    },
    complete: async (record, parent) => {
      const completed = writeLedger(
        {
          status: "complete",
          candidate: record,
          completedAt: new Date().toISOString(),
        },
        parent,
        [],
      );
      git("push", "origin", `${completed}:${ledgerRef}`);
      output("commit", record.commit);
      output("channel", record.channel);
    },
  };
  const result = await release(candidate, adapter, {
    retryIfIdle: process.env.OPERATION !== "resume",
    requestedBranch: branch(),
  });
  output("result", result);
  console.log(`Prerelease result: ${result}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    if (process.argv[2] === "prepare") {
      await prepare();
    } else if (process.argv[2] === "release") {
      await publish();
    } else {
      throw new Error("Use prepare or release.");
    }
  } catch (error) {
    console.error(error);
    console.error(
      "Prerelease failed. Use workflow_dispatch with operation=resume to finish a persisted release. Do not delete the ledger or package tags.",
    );
    process.exitCode = 1;
  }
}
