import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [NavbarComponent, FooterComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule

  ],
  exports: [NavbarComponent, FooterComponent, SidebarComponent]
})
export class ComponentsModule { }
