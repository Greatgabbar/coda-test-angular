import { Component, OnInit } from '@angular/core';
import { BaseColumnComponent, MiaColumn ,MiaTableConfig } from '@agencycoda/mia-table'
import { MiaPagination, MiaQuery } from '@agencycoda/mia-core';
import {ClientService} from './services/client.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coda-test-angular';
  tableConfig: MiaTableConfig = new MiaTableConfig();
  mockData?: MiaPagination<any>;
  constructor(private clientservice : ClientService) {
    
   }

  ngOnInit(): void {
    console.log(this.mockData)
    this.clientservice.getListofClients().subscribe(data=>{
      console.log(data);
      this.mockData=data.response;
    })
    this.loadConfig()
  }


  ngOnChanges(changes : any) {
    console.log("Changes --> ", changes);
  }

  getlatestData():void{
    this.clientservice.getListofClients().subscribe(data=>{
      console.log(data);
      this.mockData=data.response;
      console.log(this.mockData)
    })
  }

  loadConfig() {
    this.tableConfig.service = this.clientservice;
    this.tableConfig.id = 'table-test';
    this.tableConfig.columns = [
      { key: 'firstname', type: 'string', title: 'First Name', field_key: 'firstname'},
      { key: 'lastname', type: 'string', title: 'Last Name', field_key: 'lastname'},
      { key: 'email', type: 'string', title: 'Email', field_key: 'email'},
      { key: 'more', type: 'more', title: '', 
      extra: {
        actions: [
          { icon: 'create', title: 'Edit', key: 'edit' },
          { icon: 'delete', title: 'Erase', key: 'remove' },
        ]
      } 
    },
    ];

    this.tableConfig.loadingColor = 'red';
    this.tableConfig.hasEmptyScreen = true;
    this.tableConfig.emptyScreenTitle = 'No tenes cargado ningun elemento todavia';

    this.tableConfig.onClick.subscribe(result => {
      console.log('--ACTION--');
      switch(result.key){
        case 'remove':
          {
            // remove code here
            console.log(result);
            this.clientservice.deleteClient(result.item).subscribe((data)=>{
              // const updatedarr=this.mockData?.data?.filter((gg)=>gg.id!==result.item.id)
              // console.log(updatedarr);
              // const newObj:MiaPagination<any>={
              //   ...this.mockData!,
              //   data:updatedarr!
              // }
              // console.log(newObj);
              // this.mockData=newObj
              this.getlatestData();
              console.log(this.mockData)
            })
          }
          break;
        case 'edit':{
          //Edit Code their 
          console.log("Edit ezz")
        }
        break;
        default:
          console.log("ez");
      }
    });

    this.mockData = {
      current_page: 1,
      first_page_url: '',
      from: '',
      last_page: 1,
      last_page_url: '',
      next_page_url: '',
      path: '',
      per_page: 50,
      prev_page_url: '',
      to: '',
      total: 1,
      data: [
        {
          id: 1, role_id: 1, title: 'asdasdasd', firstname: 'Matias', lastname: 'Camiletti', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png', subtitle: 'Administrador', is_online: 0, status: 1, created_at: '1989-08-25 18:00:00'
        },
        {
          id: 2, role_id: 3, title: 'asdasdasd', firstname: 'Matias', lastname: 'Camiletti', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png', subtitle: 'Administrador', is_online: 0, status: 1, created_at: '1989-08-25 18:00:00', categories: [ { title: 'category One'}, { title: 'category Two'} ]
        },
        {
          id: 3, role_id: 1, title: 'asdasdasd', firstname: 'Matias', lastname: 'Camiletti', photo: '', subtitle: 'Administrador', is_online: 0, created_at: '1989-08-25 18:00:00'
        },
        {
          id: 4, role_id: 4, title: 'asdasdasd', firstname: 'Matias', lastname: 'Camiletti', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png', subtitle: 'Administrador', is_online: 0, status: 1, created_at: '1989-08-25 18:00:00'
        }
      ]
    };
}
}
