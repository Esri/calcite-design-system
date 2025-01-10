const { execSync } = require("child_process");

// Environment variables from the GitHub Action
const owner = process.env.OWNER;
const repo = process.env.REPO;
const issueNumber = process.env.ISSUE_NUMBER;
const labelName = process.env.LABEL_NAME;

// Function to execute a GitHub GraphQL command
function runQuery(query) {
  const command = `gh api graphql -f query='${query}' -F owner="${owner}" -F repo="${repo}" -F issueNumber=${issueNumber}`;
  return execSync(command, { encoding: "utf-8" });
}

// Function to create a comment
async function createComment(body) {
  const command = `gh issue comment ${issueNumber} --body "${body}"`;
  return execSync(command, { encoding: "utf-8" });
}

// GraphQL query to find the project associated with the issue
const query = `
  query($owner: String!, $repo: String!, $issueNumber: Int!) {
    repository(owner: $owner, name: $repo) {
      id
      nameWithOwner
      description
      issue(number: $issueNumber) {
        id
        title
        projectItems(first: 1) {
          nodes {
            id
            project {
              id
              title
              url
            }
          }
        }
      }
    }
  }
`;

try {
  const result = runQuery(query);
  const parsedResult = JSON.parse(result);
  const projectItem = parsedResult.data.repository.issue.projectItems.nodes[0];
  console.log("Project Item:", projectItem);

  if (projectItem) {
    if (labelName === "ready for dev") {
      const archiveQuery = `mutation { archiveProjectV2Item(input: {projectId: "${projectItem.project.id}", itemId: "${projectItem.id}"}) { clientMutationId } }`;
      runQuery(archiveQuery);
      createComment(
        `This issue has been archived in the [${projectItem.project.title}](${projectItem.project.url}/archive) project.`,
      );
      console.log("Issue archived in project.");
    } else {
      console.log("No action taken, label added was not 'ready for dev'.");
    }
  } else {
    console.log("No associated project found for this issue.");
  }
} catch (error) {
  console.error("Error:", error.message);
}
