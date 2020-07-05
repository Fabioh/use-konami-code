/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export const konamiSequence = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];

export default function useKonamiCode(codeSequence = konamiSequence, callback = () => {}) {
    const [rightSequence, setRightSequence] = useState<boolean>(false);
    const [sequence, setSequence] = useState<string[]>([]);

    const onKeyDown = (event: KeyboardEvent) => setSequence(prev => [...prev, event.key]);

    useEffect(() =>{
        sequence.forEach((key, i) => {
            if (key !== codeSequence[i]) {
                setSequence([]);
            }
        })

        if (sequence.toString() === codeSequence.toString()) {
            setRightSequence(true);
            callback();
        }
    }, [sequence])

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    });

    return { sequence, rightSequence };
}