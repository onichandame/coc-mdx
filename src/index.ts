import { Thenable, TransportKind, ServerOptions, LanguageClientOptions, LanguageClient, ExtensionContext, workspace } from 'coc.nvim';
import { join } from 'path'

const extensionId = 'coc-mdx'
let client: LanguageClient | undefined

export async function activate(context: ExtensionContext): Promise<void> {
  // server module
  const serverModule = context.asAbsolutePath(join('lib', 'server.js'))
  // debug server
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009']}
  // server options
  const serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc,
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    }
  }
  // client options
  const clientOptions: LanguageClientOptions = {
    documentSelector: [{
      scheme: 'file',
      language: 'mdx'
    }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher('**/.remarkrc?(.js)')
    },
  }

  client = new LanguageClient(
    extensionId,
    'Markdown React',
    serverOptions,
    clientOptions
  )
  client.start()
//  workspace.showMessage(`coc-mdx works!`);
//
//  context.subscriptions.push(
//    commands.registerCommand('coc-mdx.Command', async () => {
//      workspace.showMessage(`coc-mdx Commands works!`);
//    }),
//
//    listManager.registerList(new DemoList(workspace.nvim)),
//
//    sources.createSource({
//      name: 'coc-mdx completion source', // unique id
//      shortcut: '[CS]', // [CS] is custom source
//      priority: 1,
//      triggerPatterns: [], // RegExp pattern
//      doComplete: async () => {
//        const items = await getCompletionItems();
//        return items;
//      }
//    }),
//
//    workspace.registerKeymap(
//      ['n'],
//      'coc-mdx-keymap',
//      async () => {
//        workspace.showMessage(`registerKeymap`);
//      },
//      { sync: false }
//    ),
//
//    workspace.registerAutocmd({
//      event: 'InsertLeave',
//      request: true,
//      callback: () => {
//        workspace.showMessage(`registerAutocmd on InsertLeave`);
//      }
//    })
//  );
}

export function deactivate(): Thenable<void> | void {
  if(!client)
    return
  return client.stop()
}

//async function getCompletionItems(): Promise<CompleteResult> {
//  return {
//    items: [
//      {
//        word: 'TestCompletionItem 1'
//      },
//      {
//        word: 'TestCompletionItem 2'
//      }
//    ]
//  };
//}
