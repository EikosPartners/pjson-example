import { root, template } from 'scalejs.mvvm';
import { observable } from 'knockout';
import { ajax } from 'dataservice';
import { layout } from 'scalejs.navigation';

import { receive } from 'scalejs.messagebus';

export default function main() {
    const metadata = layout.content;
    const header = observable();


    receive('hot-render', () => {
        console.log("MainViewModel reloaded");
        metadata.valueHasMutated();
    });

    ajax('/ui/nav/header').then( data => {
       header(data);
   });


    // ajax('/ui/dashboard/dashboard').then((data) => {
    //     metadata(data);
    // });

    root(template('main_template', {
       metadata: metadata,
       header: header
   }));

}