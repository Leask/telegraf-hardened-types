import type {
  Chat,
  ChatFullInfo,
  RichMessageButton,
  RichMessageButtonText,
  RichText,
} from "../index";

declare const chat: Chat;
const personalChat: Extract<
  ChatFullInfo,
  { type: "private" }
>["personal_chat"] = chat;
void personalChat;

const emoji: RichText.CustomEmoji = {
  type: "custom_emoji",
  custom_emoji_id: "123",
  alternative_text: ":)",
};
const dateTime: RichMessageButtonText = {
  type: "date_time",
  text: ["Starts ", emoji, {
    type: "date_time",
    text: "tomorrow",
    unix_time: 1,
    date_time_format: "d",
  }],
  unix_time: 1,
  date_time_format: "d",
};
const button: RichMessageButton = {
  text: ["Event ", dateTime],
  callback_data: "event",
};
void button;

const bold: RichText.Bold = { type: "bold", text: "Not button text" };
// @ts-expect-error Only plain text, custom emoji and date-time are allowed.
const invalidText: RichMessageButtonText = bold;
// @ts-expect-error Arrays must preserve the same restrictions.
const invalidArray: RichMessageButtonText = ["prefix", bold];
// @ts-expect-error Nesting must not bypass the button text restrictions.
const invalidDateTime: RichMessageButtonText = {
  type: "date_time",
  text: ["prefix", {
    type: "date_time",
    text: bold,
    unix_time: 1,
    date_time_format: "d",
  }],
  unix_time: 1,
  date_time_format: "d",
};
void invalidText;
void invalidArray;
void invalidDateTime;
