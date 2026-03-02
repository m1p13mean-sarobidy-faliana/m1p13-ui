import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Footer} from '../footer/footer';
import {Navbar} from '../navbar/navbar';
import {Sidebar} from '../sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [Sidebar, Navbar, Footer, RouterOutlet],
  templateUrl: './layout.html',
})
export class Layout {}
