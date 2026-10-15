document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.copy-email').forEach(button => {
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(button.dataset.email);
                button.textContent = 'Copied!';
            } catch {
                button.textContent = 'Copy failed';
            }

            setTimeout(() => button.textContent = 'Copy', 1500);
        });
    });
});
