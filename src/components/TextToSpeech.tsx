import React, {useEffect, useState} from "react";
interface TextToSpeechProps {
    text: string;
}
const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
    const [textToSpeak] = useState<string>(removeHtmlTags(text))
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speech] = useState<SpeechSynthesisUtterance>(new SpeechSynthesisUtterance(textToSpeak))
    const handleSpeak = () => {
        if('speechSynthesis' in window){
            window.speechSynthesis.speak(speech);
            setIsSpeaking(true)
        }else{
            alert('La synthèse vocale n\'est pas prise en charge sur ce navigateur.')
        }
    }

    const handleStopSpeak = () => {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
        setIsPaused(false)
    }
    const handlePauseSpeak = () => {
        window.speechSynthesis.pause()
        setIsSpeaking(false)
        setIsPaused(true)
    }

    const handleResumeSpeak = () => {
        window.speechSynthesis.resume()
        setIsPaused(false)
    }

    useEffect(() => {
        // Ajoutez un gestionnaire d'événement pour onend pour détecter la fin de la synthèse
        const handleEnd = () => {
            setIsSpeaking(false);
            setIsPaused(false);
        }

        speech.onend = handleEnd;

        // Nettoyez le gestionnaire d'événement lors du démontage du composant
        return () => {
            speech.onend = null;
        }
    }, [])

    function removeHtmlTags(text:string):string{
        const doc = new DOMParser().parseFromString(text, 'text/html');
        return doc.body.textContent || "";
    }

    return (
        <div>
            {isPaused && textToSpeak !== '' ? <button onClick={handleResumeSpeak}>Reprendre</button> : <button onClick={handleSpeak}>Lecture</button>}
            {isSpeaking && <button onClick={handleStopSpeak}>Stop</button>}
            {isSpeaking && <button onClick={handlePauseSpeak}>Pause</button>}
        </div>
    )
}

export default TextToSpeech;
