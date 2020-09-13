import * as vscode from "vscode";
import * as fs from "fs";

export const checkCredentialFile = (path: string): boolean => {
  try {
    return fs.existsSync(path);
  } catch (err) {
    console.log(err);
    return false;
  }
};

enum ItemEnum {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  COPY = "Copy Text",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  REPLACE = "Replace all",
}

export const showMessageModal = (
  texts: string[],
  editor: vscode.TextEditor,
  selections: vscode.Selection[],
): void => {
  const textMessage = texts.length > 1 ? texts.join(", ") : texts[0];
  vscode.window
    .showInformationMessage(
      textMessage,
      { modal: true },
      ...["Copy text", "Replace all"],
    )
    .then((selection: string | undefined): void => {
      switch (selection) {
        case ItemEnum.COPY:
          return copyToClipboard(textMessage);
        case ItemEnum.REPLACE:
          return replaceText(editor, selections, texts);
        default:
          return;
      }
    });
};

const copyToClipboard = (text: string): void => {
  vscode.env.clipboard
    .writeText(text)
    .then(() => vscode.window.showInformationMessage("Copied to clipboard."));
};

const replaceText = (
  editor: vscode.TextEditor,
  selections: vscode.Selection[],
  translatedTexts: string[],
): void => {
  editor.edit((builder: vscode.TextEditorEdit) => {
    for (const selection of selections) {
      const index = selections.indexOf(selection);
      builder.replace(selection, translatedTexts[index]);
    }
  });
};
