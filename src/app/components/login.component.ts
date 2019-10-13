import { Component} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import axios from "axios";

@Component({
    selector: 'app-login',
    templateUrl: './html/login.html',
    styleUrls: ['./styles/login.scss']
})

export class LoginComponent {
    title = 'Login page - Kaleniuk';
    checkoutForm;
    constructor(private formBuilder: FormBuilder){
      this.checkoutForm = this.formBuilder.group({
        login: new FormControl(''),
        password: new FormControl('')
      });
    }

    onSubmit(customerData) {
      console.log(customerData)
      axios({
        method: 'POST',
        url: 'http://localhost:80/set/auth',
        data: customerData
      })
      .then(function (response) {
          console.log(response);
          if(response.data.code === 200){
            window.location.href = '/'
          }
      })
      .catch(function (response) {
          console.log(response);
      });
    }
}
