const toAvatarFallback = (strA, strB) => {
    return strA?.charAt(0).toUpperCase() + strB?.charAt(0).toUpperCase();
};

const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);

    if (diffInSeconds < 60) {
        return "Hace unos segundos";
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else if (diffInSeconds < 2592000) { // 30 days
        const days = Math.floor(diffInSeconds / 86400);
        return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
    } else if (diffInSeconds < 31536000) { // 365 days
        const months = Math.floor(diffInSeconds / 2592000); // Approximate month length
        return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
    } else {
        const years = Math.floor(diffInSeconds / 31536000); // Approximate year length
        return `Hace ${years} ${years === 1 ? 'año' : 'años'}`;
    }
};

const trimString = (str, maxLength) => {
    if (!str) {
        return "";
    }
    if (str.length <= maxLength) {
        return str;
    }
    return str.substring(0, maxLength) + '...';
}

export { toAvatarFallback, formatTimeAgo, trimString };
