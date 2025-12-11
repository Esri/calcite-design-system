import { html } from "../../support/formatting";

export const noticeTokens = {
  calciteNoticeBackgroundColor: "",
  calciteNoticeBorderColor: "",
  calciteNoticeCloseBackgroundColorFocus: "",
  calciteNoticeCloseBackgroundColorPress: "",
  calciteNoticeCloseTextColorHover: "",
  calciteNoticeCloseTextColor: "",
  calciteNoticeCloseIconColorHover: "",
  calciteNoticeCloseIconColor: "",
  calciteNoticeTitleTextColor: "",
  calciteNoticeContentTextColor: "",
};

const noticeHTML = (
  appearance: string,
): string => html`<calcite-notice appearance="${appearance}" kind="success" scale="s" open closable><div slot="title" > Something worked </div>
    < div slot = "message" > That thing you wanted to do worked as expected</ div >
      </calcite-notice>`;

export const notice = html` ${noticeHTML("outline-fill")} ${noticeHTML("transparent")} `;
