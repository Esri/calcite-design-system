import { html } from "../../support/formatting";

export const notice = ({ kind, message, title }: { kind: string; message: string; title: string }): string =>
  html`<calcite-notice kind=${kind} scale="s" open closable>
    <div slot="title">${title}</div>
    <div slot="message">${message}</div>
    ${kind === "danger" ? html`<calcite-link slot="link" title="my action">Retry</calcite-link>` : null}
  </calcite-notice>`;

export const notices = html`${notice({
  kind: "danger",
  message: "There was an error while performing the task.",
  title: "Something failed",
})}
${notice({
  kind: "success",
  message: "That thing you wanted to do worked as expected",
  title: "Something worked",
})}`;
