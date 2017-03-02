import { registerTemplates } from 'scalejs.mvvm';
import { registerViewModels } from 'scalejs.metadataFactory';

import addViewModel from './addViewModel';
import addTemplate from './add.html';

registerTemplates(addTemplate);
registerViewModels({
    add: addViewModel
});