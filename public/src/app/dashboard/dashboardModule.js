import { registerTemplates } from 'scalejs.mvvm';
import { registerViewModels } from 'scalejs.metadataFactory';

import dashboardViewModel from './dashboardViewModel';
import dashboardTemplate from './dashboard.html';

import './dashboard.scss';

registerTemplates(dashboardTemplate);
registerViewModels({
    dashboard: dashboardViewModel
});