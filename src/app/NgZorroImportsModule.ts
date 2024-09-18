import { NgModule } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {NzTableModule} from 'ng-zorro-antd/table'

@NgModule({
    exports:[
        NzSpinModule,
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        NzLayoutModule,
        NzDatePickerModule,
        NzTableModule,
    ]
})

export class NgZorroImportsModule {}