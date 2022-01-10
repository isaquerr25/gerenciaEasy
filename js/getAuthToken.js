export default () => {
    const storage = window.localStorage;
    const authToken = storage.getItem('authorization');

    return authToken;
}