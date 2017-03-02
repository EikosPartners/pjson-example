import { registerTemplates } from 'scalejs.mvvm';
import { registerViewModels } from 'scalejs.metadataFactory';

import editViewModel from './editViewModel';
import editTemplate from './edit.html';

registerTemplates(editTemplate);
registerViewModels({
    edit: editViewModel
});