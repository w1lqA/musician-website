// src/pages/admin/releases/lib/getAudioDuration.ts
export const getAudioDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        const url = URL.createObjectURL(file);

        audio.addEventListener('loadedmetadata', () => {
            URL.revokeObjectURL(url);
            resolve(Math.round(audio.duration));
        });

        audio.addEventListener('error', () => {
            URL.revokeObjectURL(url);
            reject(new Error('Не удалось загрузить аудиофайл'));
        });

        audio.src = url;
    });
};