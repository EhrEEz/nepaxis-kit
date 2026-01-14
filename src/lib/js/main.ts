import '../scss/styles.scss';
import { initNavBar } from './components/menu';
import { initHeroITLTimes } from './components/time';

import { initLoading } from './components/loader';
import { handleContact } from './components/contact';
import { handleNewsLetter } from './components/newsletter';
import { initFooterYear } from './components/legal';

export function loadIndex(): void {
	document.addEventListener('DOMContentLoaded', () => {
		initHeroITLTimes();
		initNavBar();
		// initCube();
		// initAnimations();
		initLoading();
		handleContact();
		handleNewsLetter();
		initFooterYear();
	});
}
