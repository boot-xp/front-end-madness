import { TestBed, async } from '@angular/core/testing';

import { RootComponent } from './root.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('RootComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        RootComponent
      ],
    }).compileComponents();
  }));

  it('should have router outlet', async(() => {
    const root = TestBed.createComponent(RootComponent);

    expect(root.nativeElement.querySelectorAll('router-outlet').length).toBe(1);
  }))
});
