import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  json = {
    "rows": [
      {
        "nombre": "Andres",
        "Entidad": "Entidad",
        "Email": "andresg@gmail.com"
      },
      {
        "nombre": "Ricardo",
        "Entidad": "Entidad",
        "Email": "Ricardo@gmail.com"
      },
      {
        "nombre": "Javier",
        "Entidad": "Entidad",
        "Email": "Javierg@gmail.com"
      }
    ]
  };

  users: any[] = [];
  filteredUsers: any[] = [];
  filterText: string = '';

  name = '';
  entity = '';
  email = '';
  userId = 0;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.users = this.json.rows;
    this.filteredUsers = this.users;
  }

  performAction() {

    if (this.userId > 0) {
      this.update();
    } else {
      this.create();
    }

  }

  nameInput(event: any) {
    this.name = event.target.value;
  }

  entityInput(event: any) {
    this.entity = event.target.value;
  }

  emailInput(event: any) {
    this.email = event.target.value;
  }

  filterInput(event: any) {
    this.filterText = event.target.value;
  }

  create() {

    if (this.name != '' && this.entity != '' && this.email != '') {
      
      const newUser = {
        "nombre": this.name,
        "Entidad": this.entity,
        "Email": this.email
      };

      this.users.push(newUser);
      this.filteredUsers = this.users;
      this.clearData();
    }

  }

  findById(id: number) {
    const user = this.users[id - 1];
    this.userId = id;
    this.name = user.nombre;
    this.entity = user.Entidad;
    this.email = user.Email;
  }

  update() {
    const userIndex = this.userId - 1;
    if (userIndex >= 0 && userIndex < this.users.length) {
      this.users[userIndex] = {
        nombre: this.name,
        Entidad: this.entity,
        Email: this.email
      };
      this.filteredUsers = [...this.users];
      this.clearData();
    }
  }

  delete(id: number) {
    this.users.splice(id, 1);
    this.filteredUsers = this.users;
  }

  search() {
    this.filteredUsers = this.users.filter((user) => {
      return user.nombre.toLowerCase().includes(this.filterText.toLowerCase()) ||
        user.Entidad.toLowerCase().includes(this.filterText.toLowerCase()) ||
        user.Email.toLowerCase().includes(this.filterText.toLowerCase());
    });
  }

  highlightText(text: string): string {
    if (!this.filterText || this.filterText === '') {
      return text;
    }
    const regex = new RegExp(this.filterText, 'gi');
    return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
  }

  clearData() {
    this.name = '';
    this.entity = '';
    this.email = '';
    this.userId = 0;
  }

  title = "prueba_glogic";

}
