"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doTranslation = exports.checkCredentialFile = void 0;
const vscode = require("vscode");
const translate_1 = require("@google-cloud/translate/");
const fs = require("fs");
exports.checkCredentialFile = (path) => {
    try {
        return fs.existsSync(path);
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
const translator = new translate_1.v2.Translate();
exports.doTranslation = (targetLang = "fi") => __awaiter(void 0, void 0, void 0, function* () {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        const selections = editor.selections;
        const textSelection = selections
            .map((select) => document.getText(select))
            .join(", ");
        vscode.window.setStatusBarMessage("Translating...");
        const [translatedString] = yield translator.translate(textSelection, targetLang);
        vscode.window.showInformationMessage(translatedString);
        vscode.window.setStatusBarMessage("Translated successfully");
    }
});
//# sourceMappingURL=translate.js.map