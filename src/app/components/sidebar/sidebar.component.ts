import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Tableau de bord ',  icon: 'fas fa-tachometer-alt text-primary', class: '' },
    { path: '/cars', title: 'Voitures',  icon:'fas fa-car text-info', class: '' },// gestion de voiture
    { path: '/drivers', title: 'Chauffeurs',  icon:'fas fa-users text-orange', class: '' }, //gestion de chauffeur
    { path: '/travel', title: 'Les voyages',  icon:'fas fa-suitcase-rolling text-blue', class: '' }, //gestion de voyages
    { path: '/statistiques', title: 'Statistiques',  icon:'fas fa-money-bill-alt text-danger', class: '' }, //statistiques
   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
