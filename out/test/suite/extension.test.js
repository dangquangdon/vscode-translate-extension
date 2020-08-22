"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const mocha_1 = require("mocha");
const vscode = require("vscode");
const translate_1 = require("../../translate");
const mock = require("mock-fs");
suite("Cyg-Translation Test Suite", () => {
    vscode.window.showInformationMessage("Start all tests.");
    mocha_1.beforeEach(() => {
        mock({
            "path/to/fake/dir": {
                "credential.json": "Some very secret credentials",
                emptyDir: {},
            },
        });
    });
    mocha_1.afterEach(() => {
        mock.restore();
    });
    test("Check if Credential file exists", () => {
        assert.equal(translate_1.checkCredentialFile("path/to/fake/dir/emptyDir/credential.json"), false);
        assert.equal(translate_1.checkCredentialFile("path/to/fake/dir/credential.json"), true);
    });
});
//# sourceMappingURL=extension.test.js.map