import { registerTemplates } from 'scalejs.mvvm';
import { registerViewModels } from 'scalejs.metadataFactory';

import inventoryViewModel from './inventoryViewModel';
import inventoryTemplate from './inventory.html';

registerTemplates(inventoryTemplate);
registerViewModels({
    inventory: inventoryViewModel
});