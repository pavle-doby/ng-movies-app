import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePosterComponent } from './movie-poster.component';

describe('MoviePosterComponent', () => {
  let component: MoviePosterComponent;
  let fixture: ComponentFixture<MoviePosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviePosterComponent]
    });
    fixture = TestBed.createComponent(MoviePosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
