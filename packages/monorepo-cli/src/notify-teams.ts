import { Command } from "@commander-js/extra-typings";
import { assertRequiredOption, errorAndExit, getSummary } from "./utils/commands.ts";
import dedent from "dedent";

type NotifyTeamsOptions = {
  /** The Microsoft Teams incoming webhook URI to notify. */
  webhook: string;
  /** The title. */
  title: string;
  /** The message. Supports simple Markdown formatting. */
  message?: string;
  /** The text for a clickable link action on the message card. Requires `action_url` to also be provided. */
  actionText?: string;
  /** The URL for the clickable link action on the message card. Requires `action_text` to also be provided. */
  actionUrl?: string;
};

type CardContent = {
  type: "AdaptiveCard";
  $schema: string;
  version: string;
  body: {
    type: string;
    text?: string;
    size?: "Large";
    weight?: "Bolder";
    color?: "Accent";
    wrap?: boolean;
  }[];
  actions?: {
    type: "Action.OpenUrl";
    title: string;
    url: string;
  }[];
};

const description = dedent`
  Notify Teams via webhook.

  Sends a notification to a Microsoft Teams channel using an Adaptive Card.
`;
const webhookUsage = "-w, --webhook <WEBHOOK_URI>";
const titleUsage = "-t, --title <TITLE>";

export const registerCommand = (command: Command): void =>
  void command
    .command("notify-teams")
    .summary(getSummary(description))
    .description(description)
    .option(webhookUsage, "The Microsoft Teams incoming webhook URI to notify. (env: TEAMS_WEBHOOK)")
    .option(titleUsage, "The title. (env: TEAMS_TITLE)")
    .option("-m, --message <MESSAGE>", "The message. Supports basic Markdown formatting. (env: TEAMS_MESSAGE)")
    .option(
      "--at, --action-text <TEXT>",
      "The text for a clickable link action on the message card. Requires `action-url` to also be provided. (env: TEAMS_ACTION_TEXT)",
    )
    .option(
      "--au, --action-url <URL>",
      "The URL for the clickable link action on the message card. Requires `action-text` to also be provided. (env: TEAMS_ACTION_URL)",
    )
    .action(run);

/**
 * Runs the `notify-teams` command using the provided options or environment variables.
 */
async function run({ webhook, title, message, actionText, actionUrl }: Partial<NotifyTeamsOptions>) {
  const { TEAMS_WEBHOOK, TEAMS_TITLE, TEAMS_MESSAGE, TEAMS_ACTION_TEXT, TEAMS_ACTION_URL } = process.env;

  const validatedWebhook = assertRequiredOption(webhook || TEAMS_WEBHOOK, webhookUsage);
  const validatedTitle = assertRequiredOption(title || TEAMS_TITLE, titleUsage);

  try {
    await notifyTeams({
      webhook: validatedWebhook,
      title: validatedTitle,
      message: message || TEAMS_MESSAGE,
      actionText: actionText || TEAMS_ACTION_TEXT,
      actionUrl: actionUrl || TEAMS_ACTION_URL,
    });
  } catch (error) {
    errorAndExit(`Failed to send Teams notification. ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Sends an `AdaptiveCard` message to a specified Microsoft Teams channel via webhook.
 */
export async function notifyTeams({
  webhook,
  title,
  message,
  actionText,
  actionUrl,
}: NotifyTeamsOptions): Promise<void> {
  const cardContent: CardContent = {
    type: "AdaptiveCard",
    $schema: "https://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.2",
    body: [
      {
        type: "TextBlock",
        text: title,
        size: "Large",
        weight: "Bolder",
        color: "Accent",
        wrap: true,
      },
    ],
  };

  if (message) {
    cardContent.body.push({
      type: "TextBlock",
      text: message,
      wrap: true,
    });
  }

  if (actionText && actionUrl) {
    cardContent.actions = [
      {
        type: "Action.OpenUrl",
        title: actionText,
        url: actionUrl,
      },
    ];
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "message",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          content: cardContent,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`${response.status}: ${await response.text()}`);
  }
}
