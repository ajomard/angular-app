import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  styleUrls: ['./heroes.component.css'],
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit{
  selectedHero: Hero;
  heroes: Hero[];

  constructor(
    private router : Router,
    private heroService : HeroService){

  }

  onSelect(hero: Hero): void {
    if(this.selectedHero == null){
      this.selectedHero = hero;
    } else if(hero.id == this.selectedHero.id){
        this.selectedHero = null;
    } else {
        this.selectedHero = hero;
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit():void {
    this.getHeroes();
  }

  gotoDetail(){
    this.router.navigate(['/detail/', this.selectedHero.id]);
  }
}
