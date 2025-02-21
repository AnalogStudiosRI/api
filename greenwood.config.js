import { greenwoodPluginTypeScript } from '@greenwood/plugin-typescript';
import { greenwoodPluginAdapterAws } from './aws-adapter.js';

export default {
  plugins: [
    greenwoodPluginTypeScript(),
    greenwoodPluginAdapterAws()
  ]
}