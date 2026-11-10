import { useState } from 'react';

export default function ImageUpload({ id, label, buttonText, value, onChange, onLoading }) {
    const [error, setError] = useState('');

    function selectImage(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
            setError('Escolha uma imagem JPG, PNG ou WebP de até 5 MB.');
            event.target.value = '';
            return;
        }

        setError('');
        onLoading(true);
        const reader = new FileReader();

        function failed() {
            setError('Não foi possível abrir esta imagem.');
            onLoading(false);
        }

        reader.onerror = failed;
        reader.onload = () => {
            const image = new Image();
            image.onerror = failed;
            image.onload = () => {
                const scale = Math.min(1, 900 / Math.max(image.width, image.height));
                const canvas = document.createElement('canvas');
                canvas.width = Math.round(image.width * scale);
                canvas.height = Math.round(image.height * scale);
                canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
                onChange(canvas.toDataURL('image/jpeg', 0.75));
                onLoading(false);
            };
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="field">
            <label htmlFor={id}>{label}</label>
            <label className="button button-outline upload-button" htmlFor={id}>{buttonText}</label>
            <input className="upload-input" id={id} type="file" accept="image/png,image/jpeg,image/webp" onChange={selectImage} />
            {value && <img className="preview-image" src={value} alt="Imagem selecionada" />}
            {error && <p className="field-error" role="alert">{error}</p>}
        </div>
    );
}
