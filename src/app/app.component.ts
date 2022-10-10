import { Component } from '@angular/core';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cra-generator';

  public save(): void {
    const node = document.getElementById('print-zone') as HTMLElement;

    const doc = new jsPDF();
    doc.html(node.outerHTML).then(() => {
      doc.save();
    });
  }
}
