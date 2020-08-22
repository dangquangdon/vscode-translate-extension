// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { checkCredentialFile, doTranslation } from "./translate";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "cyg-translate" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "cyg-translate.finnishIt",
    () => {
      const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration(
        "cyg"
      );

      const filePath: string | undefined = config.get(
        "googleCloudCredentialPath"
      );
      if (filePath && checkCredentialFile(filePath)) {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = filePath;
        doTranslation();
      } else {
        vscode.window.showWarningMessage(
          "Please set the correct credential path in your CYG-Translate Extension setting"
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
