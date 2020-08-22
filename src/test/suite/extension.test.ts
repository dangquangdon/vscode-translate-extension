import * as assert from "assert";
import { beforeEach, afterEach } from "mocha";

import * as vscode from "vscode";
import { checkCredentialFile, doTranslation } from "../../translate";
import * as mock from "mock-fs";

suite("Cyg-Translation Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  beforeEach(() => {
    mock({
      "path/to/fake/dir": {
        "credential.json": "Some very secret credentials",
        emptyDir: {},
      },
    });
  });

  afterEach(() => {
    mock.restore();
  });

  test("Check if Credential file exists", () => {
    assert.equal(
      checkCredentialFile("path/to/fake/dir/emptyDir/credential.json"),
      false
    );
    assert.equal(checkCredentialFile("path/to/fake/dir/credential.json"), true);
  });
});
