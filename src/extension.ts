import * as vscode from "vscode";
import { doTranslation } from "./translate";
import { checkCredentialFile } from "./utils";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "translate-it" is now active!');

  const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration(
    "trans",
  );

  let disposable = vscode.commands.registerCommand(
    "translate-it.translateIt",
    () => {
      const filePath: string | undefined = config.get(
        "googleCloudCredentialPath",
      );

      let targetLang: string | undefined = config.get("defaultTargetLanguage");

      if (filePath && checkCredentialFile(filePath)) {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = filePath;
        if (!targetLang) {
          console.log("not defined");
          targetLang = "fi";
        }
        doTranslation(targetLang);
      } else {
        vscode.window.showWarningMessage(
          "Please set the correct credential path in your Translate It Extension setting",
        );
      }
    },
  );

  const statusItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1000,
  );
  statusItem.command = "translate-it.translateIt";
  statusItem.text = "Translate It!";
  statusItem.show();

  context.subscriptions.push(disposable);
  context.subscriptions.push(statusItem);
}

// this method is called when your extension is deactivated
export function deactivate() {}
