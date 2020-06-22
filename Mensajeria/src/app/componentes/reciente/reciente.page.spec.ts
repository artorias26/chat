import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecientePage } from './reciente.page';

describe('RecientePage', () => {
  let component: RecientePage;
  let fixture: ComponentFixture<RecientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
