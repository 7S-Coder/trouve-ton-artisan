import '../../css/components/ContactBtn.css';
import { Contact } from 'lucide-react';

export default function ContactBtn() {
    return (
        <button id='contactBtn'>
            Contacter
            <Contact size={14}/>
        </button>
    );
}
