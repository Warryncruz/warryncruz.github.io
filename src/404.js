import './style.css';
import { applyTheme, currentTheme, watchSystemTheme } from './modules/theme.js';

applyTheme(currentTheme());
watchSystemTheme();
