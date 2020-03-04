import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  private currentLang = this.translateService.currentLang;
  constructor(private translateService: TranslateService) { }
  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(() => {
      this.currentLang = this.translateService.currentLang;
    });
  }

  updateLang(lang: string) {
    this.translateService.use(lang);
  }

}
