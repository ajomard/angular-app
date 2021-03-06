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

  add(name: string): void{
    name = name.trim();
    if(!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void{
    this.heroService.del(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if(this.selectedHero === hero){
          this.selectedHero = null;
        }
      });
  }
}
