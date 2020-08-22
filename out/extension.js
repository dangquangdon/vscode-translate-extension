"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const translate_1 = require("./translate");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "cyg-translate" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("cyg-translate.finnishIt", () => {
        const config = vscode.workspace.getConfiguration("cyg");
        const filePath = config.get("googleCloudCredentialPath");
        if (filePath && translate_1.checkCredentialFile(filePath)) {
            process.env.GOOGLE_APPLICATION_CREDENTIALS = filePath;
            translate_1.doTranslation();
        }
        else {
            vscode.window.showWarningMessage("Please set the correct credential path in your CYG-Translate Extension setting");
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map