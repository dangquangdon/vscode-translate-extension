import * as assert from "assert";
import { beforeEach, afterEach } from "mocha";

import * as vscode from "vscode";
import { checkCredentialFile } from "../../utils";
import * as mock from "mock-fs";

suite("Translation Test Suite", () => {
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
    assert.strictEqual(
      checkCredentialFile("path/to/fake/dir/emptyDir/credential.json"),
      false,
    );
    assert.strictEqual(
      checkCredentialFile("path/to/fake/dir/credential.json"),
      true,
    );
  });
});
