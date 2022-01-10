import { pathIP } from './registerDb.js';

(() => {
    const form = document.getElementById('forms');
    const storage = window.localStorage;

    const authToken = storage.getItem('authorization');
    if (authToken) {
        window.open('./dashboard.html', '_self');
    }

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const password = form['password'].value;
        const rePassword = form['re_password'].value;


        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password)) {
            alert('Your password is not strong enough');
            return;
        }

        if (password != rePassword) {
            alert('Both passwords need to be the same');
            return;
        }

        const formData = {
            name: form['user'].value,
            email: form['email'].value,
            password: form['password'].value,
        };

        try {
            const response = await fetch(`${pathIP}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                alert(await response.text());
                return;
            }

            const authHeader = response.headers.get('Authorization');
            storage.setItem('authorization', authHeader);

            window.open('./dashboard.html', '_self');
        } catch (err) {
            console.error(err);
        }
    });
})();
