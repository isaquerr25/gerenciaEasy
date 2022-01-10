import { pathIP } from './registerDb.js';

(() => {
    const form = document.getElementById('forms');
    const storage = window.localStorage;
    const url = new URL(window.location.href);
    const nextURL = url.searchParams.get('next') || './dashboard.html';

    const authToken = storage.getItem('authorization');
    if (authToken) {
        window.open(nextURL, '_self');
    }

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const formData = {
            email: form['email'].value,
            password: form['senha'].value,
        }

        try {
            const response = await fetch(`${pathIP}/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                alert('Email or password invalid');
                return;
            }

            const authHeader = response.headers.get('Authorization');
            storage.setItem('authorization', authHeader);

            window.open(nextURL, '_self');
        } catch (err) {
            console.error(err);
        }
    });
})();
