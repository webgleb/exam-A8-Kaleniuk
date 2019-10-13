import axios from "axios";
import { Component} from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl } from '@angular/forms';

interface Data {
    id: number;
    name: string;
    text: string;
}

class Item{
    name: string;
    text: string;
    id: number;

    constructor(name: string, text: string, id: number) {
        this.name = name;
        this.text = text;
        this.id = id;
    }
}

@Component({
    selector: 'app-home',
    templateUrl: './html/main.html',
    styleUrls: ['./styles/main.scss']
})

export class HomeComponent {
  faBars = faBars;
  title = 'Main page - Kaleniuk';
  dataTable = null;
  addForm;
  session;
  modal;
  public items: Item[];

  constructor(private formBuilder: FormBuilder) {
      this.items = [];
      this.session = false;
      this.modal = false;
      this.addForm = this.formBuilder.group({
        name: new FormControl(''),
        text: new FormControl('')
      });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    axios({
      method: 'GET',
      url: 'http://localhost:80/get/data'
    })
    .then((response) => {
      this.items = response.data.data.table;
      this.session = response.data.data.session;
    })
    .catch(function (response) {
        console.log(response);
    });
  }
  closeModal(){
    this.modal = (this.modal)?false:true;
  }

  onSubmit(customerData) {
    axios({
      method: 'POST',
      url: 'http://localhost:80/set/data',
      data: customerData
    })
    .then((response) => {
        if(response.data.code){
          this.items = response.data.table;
          this.closeModal();
        }else{

        }
    })
    .catch(function (response) {
        console.log(response);
    });
  }

  remove(id){
    axios({
      method: 'DELETE',
      url: 'http://localhost:80/remove/data?id='+id,
    })
    .then((response) => {
        console.log(response.data.data.table);
        this.items = response.data.data.table;
    })
    .catch(function (response) {
        console.log(response);
    });
  }

  addItem(name: string, text: string, id: number): void {
      if(text==null || text.trim()=="" || id==null)
          return;
      this.items.push(new Item(name, text, id));
  }
}
