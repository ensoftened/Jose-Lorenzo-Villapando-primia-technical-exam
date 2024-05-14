import { sentenceCase } from "text-case";

const getDefaultValidationMessage = (
  validationType: string,
  key: string,
  givenValue: string,
  inputValue: string
) => {
  const messagesObj : any = {
    required: sentenceCase(key) + " is required@@@",
    unique: "'" + inputValue + "' is already taken.",
    realNumber:
      "You may only provide a whole number (1), a fraction (1 1/2) or a decimal (2.5). Remove whitespaces.",
    max:
      sentenceCase(key) +
      " should only have a maximum of " +
      givenValue +
      " character(s)",
    min:
      sentenceCase(key) +
      " should have at least " +
      givenValue +
      " character(s)",
    allowedFileTypes: "Invalid file type",
    maxSize: sentenceCase(key) + " should not exceed " + givenValue + " MB(s).",

    maxTicked: "You can only tick " +  givenValue + " item(s)",
    minTicked: "Please tick at least" +  givenValue + " item(s)",
  };

  return messagesObj[validationType]
};


export default getDefaultValidationMessage