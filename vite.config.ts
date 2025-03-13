import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/@mui/base/') && !id.includes('/@mui/lab/')) {
              return 'mui-base';
            }

            if (id.includes('/@mui/material/')) {
              return 'mui-main';
            }

            if (id.includes('/@mui/system/')) {
              return 'mui-system';
            }

            if (id.includes('/@mui/utils/')) {
              return 'mui-utils';
            }

            if (id.includes('/@mui/lab/')) {
              return 'mui-lab';
            }

            if (id.includes('/@mui/x-data-grid/')) {
              return 'mui-grid';
            }

            if (id.includes('/@mui/icons-material/')) {
              return 'mui-icons';
            }

            if (id.includes('/@mui/private-theming/')) {
              return 'mui-theming';
            }

            if (id.includes('/@mui/styled-engine/')) {
              return 'mui-styled-engine';
            }

            if (id.includes('/axios/')) {
              return 'axios';
            }

            if (id.includes('/@popperjs/')) {
              return 'popperjs';
            }

            if (id.includes('/@floating-ui/')) {
              return 'floating-ui';
            }

            if (id.includes('/prop-types/')) {
              return 'prop-types';
            }

            if (id.includes('/scheduler/')) {
              return 'scheduler';
            }

            if (id.includes('/stylis/')) {
              return 'stylis';
            }

            if (id.includes('/@fontsource/')) {
              return 'fontsource';
            }

            if (id.includes('/@babel/')) {
              return 'babel';
            }

            if (id.includes('/hoist-non-react-statics/')) {
              return 'hoist-non-react-statics';
            }

            if (id.includes('/reselect/')) {
              return 'reselect';
            }

            if (id.includes('/immer/')) {
              return 'immer';
            }

            if (id.includes('/xlsx/')) {
              return 'xlsx';
            }

            if (id.includes('/clsx/')) {
              return 'clsx';
            }

            return 'vendor';
          }
        },
        entryFileNames: 'assets/app/static/[name].[hash].js',
        chunkFileNames: 'assets/app/static/[name].[hash].js',
        assetFileNames: 'assets/app/static/[name].[hash].[ext]'
      }
    },
  }
})
