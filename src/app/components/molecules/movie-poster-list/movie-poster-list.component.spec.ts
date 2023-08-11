import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePosterListComponent } from './movie-poster-list.component';

describe('MoviePosterListComponent', () => {
  let component: MoviePosterListComponent;
  let fixture: ComponentFixture<MoviePosterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviePosterListComponent]
    });
    fixture = TestBed.createComponent(MoviePosterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
