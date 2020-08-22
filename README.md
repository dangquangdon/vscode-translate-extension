# cyg-translate README

A little extension for translating English text to Finnish text in VSCode without having to open a browser. Also the first VScode extension I've done so it served the learning purposes as well.

## Features

Translate selected text(s) into Finnish (for now)

## Requirements

- Go to your Google Cloud Console, create a new project or use an existing project, enable Google Cloud Translate API
- Download google [service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts) JSON file and store somewhere safe in your machine

## Extension Settings

- In the Settings(UI), open Extensions/CYG-Translate and paste in the absolute path of the account service JSON file that you've just downloaded.

- Or in the `settings.json` of vscode, paste the path in the setting:

```json
"cyg.googleCloudCredentialPath": "path/to/credential/file.json"
```

## How to install

- This extesnsion is not published in Extension Market.
- To install, download `cyg-translate-0.0.1.vsix` file from this repo.
- Run `code --install-extension cyg-translate-0.0.1.vsix`

## How to use

- Select/highlight the piece(s) of texts that you want to translate, then press `Cmd + F1` on MacOs or `Ctrl + F1` on Windows and Linux.
- You can also open the command palette and find command `Finnish It!`
- Translated texts will appear in the message box, copy and paste the translated text whereever you want it to be.

**Enjoy!**
