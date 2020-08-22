import * as vscode from "vscode";
import { v2 } from "@google-cloud/translate/";
import * as fs from "fs";

export const checkCredentialFile = (path: string): boolean => {
  try {
    return fs.existsSync(path);
  } catch (err) {
    console.log(err);
    return false;
  }
};

const translator = new v2.Translate();

export const doTranslation = async (targetLang = "fi") => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const selections = editor.selections;

    const textSelection = selections
      .map((select) => document.getText(select))
      .join(", ");

    vscode.window.setStatusBarMessage("Translating...");
    const [translatedString] = await translator.translate(
      textSelection,
      targetLang
    );
    vscode.window.showInformationMessage(translatedString);
    vscode.window.setStatusBarMessage("Translated successfully");
  }
};
