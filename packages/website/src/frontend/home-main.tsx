import { createRoot } from 'react-dom/client';
import { HomePage } from './HomePage.tsx';
import './style.css';

const root = createRoot(document.getElementById('root')!);
root.render(<HomePage />);
