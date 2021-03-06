import { Component, OnInit, HostBinding, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, interval, merge, Observable, noop } from 'rxjs';
import { filter, map, tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-bullseye',
  templateUrl: './bullseye.component.html',
  styleUrls: ['./bullseye.component.scss']
})
export class BullseyeComponent implements OnInit, AfterViewInit {
  @HostBinding('attr.class') cssClass = 'bulls-eye';
  @ViewChild('container') container: ElementRef;
  @ViewChild('shootingTarget') shootingTarget: ElementRef;

  elementCx: number;
  elementCy: number;

  mouseCoords$: Observable<any>;

  radius = 50;
  blinkInterval = 600;
  totalPoints = 0;

  constructor(private element: ElementRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    const size = 2 * this.radius;
    const dim = { width: window.innerWidth, height: window.innerHeight };
    const container = <HTMLElement>this.container.nativeElement;

    const randomizer$ = interval(this.blinkInterval).pipe(
      take(20),
      map((i) => ({
        x: (Math.random() * (dim.width - size)).toFixed(),
        y: (Math.random() * (dim.height - size)).toFixed()
      }))
    );

    randomizer$.subscribe((loc) => {
      container.style.cssText = `top:${loc.y}px;left:${loc.x}px;`;
      this.elementCx = container.offsetLeft + container.offsetWidth / 2;
      this.elementCy = container.offsetTop + container.offsetHeight / 2;
    },
      noop,
      () => console.log(`TOTAL POINTS: `, this.totalPoints)
    );

    this.mouseCoords$ = fromEvent(this.shootingTarget.nativeElement, 'click').pipe(
      map((loc: MouseEvent) => ({ x: loc.x + this.radius, y: loc.y + this.radius }))
    );

    this.mouseCoords$.subscribe((loc) => {
      if (clickInsideCircle(loc.x, loc.y, this.elementCx, this.elementCy, 5)) {
        this.totalPoints += 200;
      } else if (clickInsideCircle(loc.x, loc.y, this.elementCx, this.elementCy, 30)) {
        this.totalPoints += 100;
      } else if (clickInsideCircle(loc.x, loc.y, this.elementCx, this.elementCy, 50)) {
        this.totalPoints += 10;
      }
    });
  }
}

function clickInsideCircle(x, y, cx, cy, radius) {
  const distSquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  return distSquared <= radius * radius;
}
