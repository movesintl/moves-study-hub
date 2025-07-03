import { visualBuilderBlocks } from './blocks';

export const createGrapesConfig = (container: HTMLElement) => ({
  container,
  height: '800px',
  width: 'auto',
  plugins: ['gjs-blocks-basic', 'gjs-preset-webpage'],
  pluginsOpts: {
    'gjs-blocks-basic': {},
    'gjs-preset-webpage': {
      modalImportTitle: 'Import',
      modalImportButton: 'Import',
      modalImportLabel: '',
      modalImportContent: function(editor: any) {
        return editor.getHtml();
      },
      filestackOpts: {},
      aviaryOpts: false,
      customStyleManager: []
    }
  },
  blockManager: {
    appendTo: '#blocks-container',
    blocks: visualBuilderBlocks
  },
  layerManager: {
    appendTo: '#layers-container'
  },
  styleManager: {
    appendTo: '#styles-container',
    sectors: [
      {
        name: 'Dimension',
        open: false,
        buildProps: ['width', 'min-height', 'padding'],
        properties: [
          {
            type: 'integer',
            name: 'The width',
            property: 'width',
            units: ['px', '%'],
            defaults: 'auto',
            min: 0,
          }
        ]
      },
      {
        name: 'Typography',
        open: false,
        buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height'],
      },
      {
        name: 'Decorations',
        open: false,
        buildProps: ['background-color', 'border-radius', 'border', 'box-shadow'],
      },
      {
        name: 'Extra',
        open: false,
        buildProps: ['opacity', 'transition', 'perspective', 'transform'],
      }
    ]
  },
  traitManager: {
    appendTo: '#traits-container'
  },
  selectorManager: {
    appendTo: '#selectors-container'
  },
  panels: {
    defaults: [
      {
        id: 'layers',
        el: '.panel__right',
        resizable: {
          maxDim: 350,
          minDim: 200,
          tc: false,
          cl: true,
          cr: false,
          bc: false,
        },
      },
      {
        id: 'panel-switcher',
        el: '.panel__switcher',
        buttons: [
          {
            id: 'show-layers',
            active: true,
            label: 'Layers',
            command: 'show-layers',
            togglable: false,
          },
          {
            id: 'show-style',
            active: true,
            label: 'Styles',
            command: 'show-styles',
            togglable: false,
          },
          {
            id: 'show-traits',
            active: true,
            label: 'Traits',
            command: 'show-traits',
            togglable: false,
          }
        ],
      }
    ]
  },
  canvas: {
    styles: [
      'https://cdn.tailwindcss.com/3.4.0',
      'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
    ],
    scripts: []
  },
  storageManager: false,
  deviceManager: {
    devices: [
      {
        name: 'Desktop',
        width: '',
      },
      {
        name: 'Mobile',
        width: '320px',
        widthMedia: '480px',
      }
    ]
  }
});

export const addCustomCommands = (editor: any) => {
  editor.Commands.add('show-layers', {
    getRowEl(editor: any) { return editor.getContainer().closest('.editor-row'); },
    getLayersEl(row: any) { return row.querySelector('.layers-container') }
  });

  editor.Commands.add('show-styles', {
    getRowEl(editor: any) { return editor.getContainer().closest('.editor-row'); },
    getStyleEl(row: any) { return row.querySelector('.styles-container') }
  });

  editor.Commands.add('show-traits', {
    getRowEl(editor: any) { return editor.getContainer().closest('.editor-row'); },
    getTraitsEl(row: any) { return row.querySelector('.traits-container') }
  });
};

export const getDefaultContent = () => `
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-4">Welcome to the Page Builder</h1>
    <p class="text-gray-600 mb-6">Start building your page by dragging components from the left panel.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-gray-100 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-2">Column 1</h3>
        <p>Add your content here</p>
      </div>
      <div class="bg-gray-100 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-2">Column 2</h3>
        <p>Add your content here</p>
      </div>
    </div>
  </div>
`;