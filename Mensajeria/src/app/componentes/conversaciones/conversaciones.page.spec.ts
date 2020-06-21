import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConversacionesPage } from './conversaciones.page';

describe('ConversacionesPage', () => {
  let component: ConversacionesPage;
  let fixture: ComponentFixture<ConversacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConversacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
