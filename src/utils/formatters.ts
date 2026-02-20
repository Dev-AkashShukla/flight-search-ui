export function formatPrice(price: number): string{
    return new Intl.NumberFormat('en-IN',{
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(price)
}


export function formatDuration(minutes: number): string{
      const hour=Math.floor(minutes/60);
      const mins =minutes%60;
      return `${hour}h ${mins}m`
}


export function formatTime(isoString: string): string{
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-IN',{
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
}