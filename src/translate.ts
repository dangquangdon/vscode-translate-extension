import * as vscode from "vscode";
import { v2 } from "@google-cloud/translate/";

import { showMessageModal } from "./utils";

const translator = new v2.Translate();

export const doTranslation = async (targetLang: string) => {
  const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
  if (editor) {
    vscode.window.setStatusBarMessage("Translating...");

    const document = editor.document;
    const selections: vscode.Selection[] = editor.selections;

    const textSelections = await Promise.all(
      selections.map(async (select) => {
        const text: string = document.getText(select);
        const [translatedText] = await translator.translate(text, targetLang);
        return translatedText;
      }),
    );
    showMessageModal(textSelections, editor, selections);
    vscode.window.setStatusBarMessage("Translated successfully");
  }
};
