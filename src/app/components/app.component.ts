import axios from "axios";
import { Component} from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-root',
    templateUrl: './html/app.html',
    styleUrls: ['./styles/app.scss']
})

export class AppComponent {
  faHome = faHome;
  session;
  constructor() {
      this.session = false;
  }

  ngOnInit() {
    this.getSession();
  }

  getSession() {
    axios({
      method: 'GET',
      url: 'http://localhost:80/get/session'
    })
    .then((response) => {
      this.session = response.data.session;
    })
    .catch(function (response) {
        console.log(response);
    });
  }
}
