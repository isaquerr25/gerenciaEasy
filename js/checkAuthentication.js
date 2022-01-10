(() => {
    const storage = window.localStorage;
    const authToken = storage.getItem('authorization');

    if (!authToken) {
        window.open(`./login.html?next=${window.location.href}`, '_self');
    }
 
})();