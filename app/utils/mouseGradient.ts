export function trackMouseGradient() {
    if (typeof window === 'undefined') return;

    const gradientEl = document.querySelector('.gradient-background') as HTMLElement;
    if (!gradientEl) return;

    document.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        const xPercent = (clientX / innerWidth) * 100;
        const yPercent = (clientY / innerHeight) * 100;

        gradientEl.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, #ff7eb3, #ff758c, #ff6a5e)`;
    });
}
